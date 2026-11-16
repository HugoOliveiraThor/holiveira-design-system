import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

import { createProgram } from './api';
import { buildComponentExports, buildExports, resolveOptionalStory } from './inventory';
import type { ExportRecord } from './types';

const PACKAGES = ['@ho-dev/demo'];

function write(root: string, relative: string, content: string): void {
  const file = join(root, relative);
  mkdirSync(join(file, '..'), { recursive: true });
  writeFileSync(file, content);
}

function fixture(barrel: string): string {
  const root = mkdtempSync(join(tmpdir(), 'docs-inventory-'));
  write(
    root,
    'packages/demo/src/widget.tsx',
    `export interface WidgetProps {
  label?: string;
}

export const Widget = (props: WidgetProps) => null;
export const Plain = (props: WidgetProps) => null;
`,
  );
  write(
    root,
    'packages/demo/src/use-thing.ts',
    'export function useThing() {\n  return null;\n}\n',
  );
  write(root, 'packages/demo/src/do-thing.ts', 'export function doThing() {\n  return 1;\n}\n');
  write(root, 'packages/demo/src/theme.ts', "export const THEME = { dark: 'dark' };\n");
  write(root, 'packages/demo/src/index.ts', barrel);
  write(root, 'packages/demo/src/widget.stories.tsx', "export default { title: 'Demo/Widget' };\n");
  return root;
}

describe('export inventory', { timeout: 30_000 }, () => {
  let root: string;
  let program: ReturnType<typeof createProgram>;
  let exports: ExportRecord[];

  const BARREL = [
    "export { Widget, Plain } from './widget';",
    "export { useThing } from './use-thing';",
    "export { doThing } from './do-thing';",
    "export { THEME } from './theme';",
    "export type { WidgetProps } from './widget';",
    '',
  ].join('\n');

  beforeAll(() => {
    root = fixture(BARREL);
    program = createProgram(root, PACKAGES);
    exports = buildExports(program, root, '@ho-dev/demo');
  });

  it('records every export with its kind', () => {
    expect(exports).toEqual([
      { name: 'doThing', kind: 'function' },
      { name: 'Plain', kind: 'component' },
      { name: 'THEME', kind: 'constant' },
      { name: 'useThing', kind: 'hook' },
      { name: 'Widget', kind: 'component' },
      { name: 'WidgetProps', kind: 'type' },
    ]);
  });

  it('records component exports with slug, source file and story', () => {
    const components = buildComponentExports(program, root, '@ho-dev/demo', exports);
    expect(components).toEqual([
      {
        id: 'plain',
        exportName: 'Plain',
        sourceFile: 'packages/demo/src/widget.tsx',
      },
      {
        id: 'widget',
        exportName: 'Widget',
        sourceFile: 'packages/demo/src/widget.tsx',
        story: { title: 'Demo/Widget', id: 'demo-widget' },
      },
    ]);
  });

  it('returns no story for a component that ships none', () => {
    expect(resolveOptionalStory(root, '@ho-dev/demo', 'Plain')).toBeUndefined();
    expect(resolveOptionalStory(root, '@ho-dev/demo', 'Widget')).toEqual({
      title: 'Demo/Widget',
      id: 'demo-widget',
    });
  });

  it('still fails on a malformed story file', () => {
    const malformed = fixture(BARREL);
    write(malformed, 'packages/demo/src/widget.stories.tsx', 'export default {};\n');
    expect(() => resolveOptionalStory(malformed, '@ho-dev/demo', 'Widget')).toThrow(
      /has no story title/,
    );
  });

  it('fails when two component exports derive the same inventory slug', () => {
    const collision = fixture(
      "export { Widget } from './widget';\nexport { Foo, FOO } from './foo';\n",
    );
    write(collision, 'packages/demo/src/widget.tsx', 'export const Widget = () => null;\n');
    write(
      collision,
      'packages/demo/src/foo.tsx',
      'export const Foo = () => null;\nexport const FOO = () => null;\n',
    );
    const collisionProgram = createProgram(collision, PACKAGES);
    const collisionExports = buildExports(collisionProgram, collision, '@ho-dev/demo');
    expect(() =>
      buildComponentExports(collisionProgram, collision, '@ho-dev/demo', collisionExports),
    ).toThrow(/exports Foo and FOO, which share the inventory slug "foo"/);
  });

  it('is stable when the barrel order changes', () => {
    const reversed = fixture(
      [
        "export type { WidgetProps } from './widget';",
        "export { THEME } from './theme';",
        "export { doThing } from './do-thing';",
        "export { useThing } from './use-thing';",
        "export { Widget, Plain } from './widget';",
        '',
      ].join('\n'),
    );
    const reversedProgram = createProgram(reversed, PACKAGES);
    expect(buildExports(reversedProgram, reversed, '@ho-dev/demo')).toEqual(exports);
  });
});

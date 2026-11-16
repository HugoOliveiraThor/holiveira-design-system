import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { assertExampleImports, buildExamples, examplesRoot } from './examples';

function write(root: string, relative: string, content: string): void {
  const file = join(root, relative);
  mkdirSync(join(file, '..'), { recursive: true });
  writeFileSync(file, content);
}

function fixture(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), 'docs-examples-'));
  for (const [relative, content] of Object.entries(files)) {
    write(root, relative, content);
  }
  return root;
}

const MINIMAL = `import { Button } from '@ho-dev/primitives';

export function ButtonMinimal() {
  return <Button>Save</Button>;
}
`;

describe('example extraction', () => {
  it('reads every example file into examples.json', () => {
    const root = fixture({
      'apps/docs/src/examples/button/minimal.tsx': MINIMAL,
      'apps/docs/src/examples/button/realistic.tsx': MINIMAL,
      'apps/docs/src/examples/card/minimal.tsx': MINIMAL,
    });
    const examples = buildExamples(root);
    expect(examples.map((example) => `${example.id}/${example.kind}`)).toEqual([
      'button/minimal',
      'button/realistic',
      'card/minimal',
    ]);
    expect(examples[0]).toEqual({
      id: 'button',
      kind: 'minimal',
      path: 'apps/docs/src/examples/button/minimal.tsx',
      source: MINIMAL,
    });
  });

  it('records the source verbatim', () => {
    const root = fixture({ 'apps/docs/src/examples/button/minimal.tsx': MINIMAL });
    const [example] = buildExamples(root);
    expect(example.source).toBe(MINIMAL);
  });

  it('reads the files from the examples directory only', () => {
    const root = fixture({
      'apps/docs/src/examples/button/minimal.tsx': MINIMAL,
      'apps/docs/src/examples/button/notes.md': 'not an example',
    });
    expect(examplesRoot(root).endsWith(join('apps', 'docs', 'src', 'examples'))).toBe(true);
    expect(buildExamples(root)).toHaveLength(1);
  });

  it('fails when an example imports a private package', () => {
    const root = fixture({
      'apps/docs/src/examples/button/minimal.tsx': "import { db } from '@ho-dev/db';\n",
    });
    expect(() => assertExampleImports(buildExamples(root), new Set(['@ho-dev/db']))).toThrow(
      /example button\/minimal imports @ho-dev\/db, which is a private package/,
    );
  });

  it('rejects bare and subpath imports of a private package', () => {
    const bare = fixture({
      'apps/docs/src/examples/button/minimal.tsx': "import '@ho-dev/db';\n",
    });
    expect(() => assertExampleImports(buildExamples(bare), new Set(['@ho-dev/db']))).toThrow(
      /imports @ho-dev\/db, which is a private package/,
    );

    const subpath = fixture({
      'apps/docs/src/examples/button/minimal.tsx': "import { client } from '@ho-dev/db/client';\n",
    });
    expect(() => assertExampleImports(buildExamples(subpath), new Set(['@ho-dev/db']))).toThrow(
      /imports @ho-dev\/db\/client, which is a private package/,
    );
  });

  it('fails when an example imports a package source path', () => {
    const root = fixture({
      'apps/docs/src/examples/button/minimal.tsx':
        "import { Button } from '../../../packages/primitives/src/button';\n",
    });
    expect(() => assertExampleImports(buildExamples(root), new Set())).toThrow(
      /which is a package source path/,
    );
  });

  it('accepts the public barrels and third-party packages', () => {
    const root = fixture({
      'apps/docs/src/examples/form/realistic.tsx': `import { useForm } from 'react-hook-form';
import { Form } from '@ho-dev/forms';

export function FormRealistic() {
  return <Form />;
}
`,
    });
    expect(() => assertExampleImports(buildExamples(root), new Set(['@ho-dev/db']))).not.toThrow();
  });
});

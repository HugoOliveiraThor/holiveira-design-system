import { mkdirSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

import { buildApi, createProgram, exportNames, extractProps, extractVariants } from './api';
import type { Catalog } from './types';

function write(root: string, relative: string, content: string): void {
  const file = join(root, relative);
  mkdirSync(join(file, '..'), { recursive: true });
  writeFileSync(file, content);
}

function fixtureRoot(): string {
  const root = mkdtempSync(join(tmpdir(), 'docs-api-'));
  write(
    root,
    'packages/types/src/index.ts',
    'export interface NativeProps {\n  onClick?: () => void;\n  className?: string;\n  title?: string;\n  dataFoo?: string;\n}\n',
  );
  write(
    root,
    'packages/primitives/src/button.ts',
    `import type { NativeProps } from '@ho-dev/types';

const buttonVariants = cva('base', {
  variants: {
    variant: { primary: 'a', outline: 'b' },
    size: { sm: 'c', md: 'd' },
  },
  defaultVariants: { variant: 'primary' },
});

export interface ButtonProps extends NativeProps {
  variant?: string;
  size?: string;
  disabled?: boolean;
  title: string;
  children: string;
}

export const Button = (props: ButtonProps) => null;

export const Broken = () => null;

export const MissingProps = (props: DoesNotExistAnywhere) => null;

export const AnyProps = (props: any) => null;
`,
  );
  write(
    root,
    'packages/primitives/src/avatar.ts',
    `const avatarVariants = cva('base', {
  variants: { size: { sm: 'a', md: 'b' } },
  defaultVariants: { size: 'sm' },
});

const avatarStatusVariants = cva('dot', { variants: { status: { online: 'x' } } });

export interface AvatarProps {
  size?: string;
}

export const Avatar = (props: AvatarProps) => null;
`,
  );
  write(
    root,
    'packages/primitives/src/plain.ts',
    `const optionlessVariants = cva('base');

export interface PlainProps {
  label?: string;
}

export const Plain = (props: PlainProps) => null;

export const Optionless = (props: PlainProps) => null;
`,
  );
  write(
    root,
    'packages/primitives/src/index.ts',
    "export { Button, Broken, MissingProps, AnyProps } from './button';\nexport { Avatar } from './avatar';\nexport { Plain, Optionless } from './plain';\n",
  );
  write(
    root,
    'packages/primitives/src/button.stories.tsx',
    "export default { title: 'Primitives/Button' };\n",
  );
  write(
    root,
    'packages/primitives/src/avatar.stories.tsx',
    "export default { title: 'Primitives/Avatar' };\n",
  );
  return root;
}

const PACKAGES = ['@ho-dev/primitives'];
const DEFAULTS = { variant: 'primary' };

describe('component api extraction', { timeout: 30_000 }, () => {
  let root: string;
  let program: ReturnType<typeof createProgram>;

  beforeAll(() => {
    root = fixtureRoot();
    program = createProgram(root, PACKAGES);
  });

  it('records name, type, required, default and origin', () => {
    const props = extractProps(program, root, '@ho-dev/primitives', 'Button', DEFAULTS);
    const variant = props.find((prop) => prop.name === 'variant');
    expect(variant).toEqual({
      name: 'variant',
      type: 'string | undefined',
      required: false,
      default: 'primary',
      origin: 'component',
    });
    const children = props.find((prop) => prop.name === 'children');
    expect(children?.required).toBe(true);
    expect(children?.default).toBeNull();
  });

  it('marks react-inherited props as inherited', () => {
    const props = extractProps(program, root, '@ho-dev/primitives', 'Button');
    const onClick = props.find((prop) => prop.name === 'onClick');
    expect(onClick?.origin).toBe('inherited');
    expect(props.find((prop) => prop.name === 'disabled')?.origin).toBe('component');
    expect(props.find((prop) => prop.name === 'title')?.origin).toBe('component');
    expect(props.map((prop) => prop.name)).not.toContain('dataFoo');
  });

  it('fails when the props type cannot be resolved', () => {
    expect(() => extractProps(program, root, '@ho-dev/primitives', 'Broken')).toThrow(
      /cannot resolve props type for Broken/,
    );
    expect(() => extractProps(program, root, '@ho-dev/primitives', 'MissingProps')).toThrow(
      /cannot resolve props type for MissingProps/,
    );
    expect(() => extractProps(program, root, '@ho-dev/primitives', 'AnyProps')).toThrow(
      /cannot resolve props type for AnyProps/,
    );
  });

  it('reads export names from the barrel', () => {
    expect(exportNames(program, root, '@ho-dev/primitives')).toEqual([
      'AnyProps',
      'Avatar',
      'Broken',
      'Button',
      'MissingProps',
      'Optionless',
      'Plain',
    ]);
  });

  it('keeps private packages out of the generator source', () => {
    const directory = join(process.cwd(), 'apps', 'docs', 'src', 'lib', 'docs-metadata');
    const sources = readdirSync(directory)
      .filter((file) => file.endsWith('.ts') && !file.endsWith('.test.ts'))
      .map((file) => readFileSync(join(directory, file), 'utf8'))
      .join('\n');
    expect(sources).not.toMatch(/@ho-dev\/(auth|api|db|testing)/);
    expect(sources).not.toMatch(/from\s+['"][^'"]*packages\/[^'"]*\/src\//);
  });

  it('extracts variant names, values and defaults from cva', () => {
    const { variants } = extractVariants(program, root, '@ho-dev/primitives', 'Button');
    expect(variants.variant).toEqual({
      name: 'variant',
      values: ['primary', 'outline'],
      default: 'primary',
    });
    expect(variants.size).toEqual({ name: 'size', values: ['sm', 'md'], default: null });
  });

  it('sets a variant default to null when defaultVariants omits it', () => {
    const { variants, defaults } = extractVariants(program, root, '@ho-dev/primitives', 'Button');
    expect(defaults).toEqual({ variant: 'primary' });
    expect(variants.size.default).toBeNull();
  });

  it('returns no variants when there is nothing to extract', () => {
    expect(extractVariants(program, root, '@ho-dev/primitives', 'Plain')).toEqual({
      variants: {},
      defaults: {},
    });
    expect(extractVariants(program, root, '@ho-dev/primitives', 'Optionless')).toEqual({
      variants: {},
      defaults: {},
    });
  });

  it('associates the component-specific variants variable', () => {
    const { variants } = extractVariants(program, root, '@ho-dev/primitives', 'Avatar');
    expect(Object.keys(variants)).toEqual(['size']);
    expect(variants.size.default).toBe('sm');
  });

  it('builds a component record with props and variants', () => {
    const catalog: Catalog = {
      packages: [
        {
          name: '@ho-dev/primitives',
          category: 'Components',
          components: [
            { exportName: 'Button', id: 'button', core: true },
            { exportName: 'Avatar', id: 'avatar' },
          ],
        },
      ],
    };
    const api = buildApi(program, root, catalog);
    expect(api.map((record) => record.id)).toEqual(['avatar', 'button']);
    const button = api[1];
    expect(button).toMatchObject({
      id: 'button',
      package: '@ho-dev/primitives',
      exportName: 'Button',
    });
    expect(button.variants.variant.default).toBe('primary');
    expect(button.props.find((prop) => prop.name === 'variant')?.default).toBe('primary');
  });

  it('records the story title and id from the colocated story', () => {
    const catalog: Catalog = {
      packages: [
        {
          name: '@ho-dev/primitives',
          category: 'Components',
          components: [{ exportName: 'Button', id: 'button' }],
        },
      ],
    };
    const [button] = buildApi(program, root, catalog);
    expect(button.story).toEqual({ title: 'Primitives/Button', id: 'primitives-button' });
  });

  it('records the declaration source file', () => {
    const catalog: Catalog = {
      packages: [
        {
          name: '@ho-dev/primitives',
          category: 'Components',
          components: [{ exportName: 'Button', id: 'button' }],
        },
      ],
    };
    const [button] = buildApi(program, root, catalog);
    expect(button.sourceFile).toBe('packages/primitives/src/button.ts');
  });

  it('fails when a component has no story file', () => {
    const catalog: Catalog = {
      packages: [
        {
          name: '@ho-dev/primitives',
          category: 'Components',
          components: [{ exportName: 'Plain', id: 'plain' }],
        },
      ],
    };
    expect(() => buildApi(program, root, catalog)).toThrow(
      /@ho-dev\/primitives has no story for Plain \(expected .*plain\.stories\.tsx\)/,
    );
  });

  it('fails when two components share a story title', () => {
    const duplicateRoot = fixtureRoot();
    write(
      duplicateRoot,
      'packages/primitives/src/avatar.stories.tsx',
      "export default { title: 'Primitives/Button' };\n",
    );
    const duplicateProgram = createProgram(duplicateRoot, PACKAGES);
    const catalog: Catalog = {
      packages: [
        {
          name: '@ho-dev/primitives',
          category: 'Components',
          components: [
            { exportName: 'Button', id: 'button' },
            { exportName: 'Avatar', id: 'avatar' },
          ],
        },
      ],
    };
    expect(() => buildApi(duplicateProgram, duplicateRoot, catalog)).toThrow(
      /share the story title "Primitives\/Button"/,
    );
  });

  it('is stable when the catalogue order changes', () => {
    const catalog: Catalog = {
      packages: [
        {
          name: '@ho-dev/primitives',
          category: 'Components',
          components: [
            { exportName: 'Button', id: 'button', core: true },
            { exportName: 'Avatar', id: 'avatar' },
          ],
        },
      ],
    };
    const reversed: Catalog = {
      packages: [
        { ...catalog.packages[0], components: [...catalog.packages[0].components!].reverse() },
      ],
    };
    expect(buildApi(program, root, reversed)).toEqual(buildApi(program, root, catalog));
  });
});

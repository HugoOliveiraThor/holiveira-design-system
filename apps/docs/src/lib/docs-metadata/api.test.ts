import { mkdirSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { createProgram, exportNames, extractProps, extractVariants } from './api';

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
    'export interface NativeProps {\n  onClick?: () => void;\n  className?: string;\n}\n',
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
  children: string;
}

export const Button = (props: ButtonProps) => null;

export const Broken = () => null;
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
    `export interface PlainProps {
  label?: string;
}

export const Plain = (props: PlainProps) => null;
`,
  );
  write(
    root,
    'packages/primitives/src/index.ts',
    "export { Button, Broken } from './button';\nexport { Avatar } from './avatar';\nexport { Plain } from './plain';\n",
  );
  return root;
}

const PACKAGES = ['@ho-dev/primitives'];
const DEFAULTS = { variant: 'primary' };

describe('component api extraction', () => {
  it('records name, type, required, default and origin', () => {
    const root = fixtureRoot();
    const program = createProgram(root, PACKAGES);
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
    const root = fixtureRoot();
    const program = createProgram(root, PACKAGES);
    const props = extractProps(program, root, '@ho-dev/primitives', 'Button');
    const onClick = props.find((prop) => prop.name === 'onClick');
    expect(onClick?.origin).toBe('inherited');
    expect(props.find((prop) => prop.name === 'disabled')?.origin).toBe('component');
  });

  it('fails when the props type cannot be resolved', () => {
    const root = fixtureRoot();
    const program = createProgram(root, PACKAGES);
    expect(() => extractProps(program, root, '@ho-dev/primitives', 'Broken')).toThrow(
      /cannot resolve props type for Broken/,
    );
  });

  it('reads export names from the barrel', () => {
    const root = fixtureRoot();
    const program = createProgram(root, PACKAGES);
    expect(exportNames(program, root, '@ho-dev/primitives')).toEqual([
      'Avatar',
      'Broken',
      'Button',
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
    const root = fixtureRoot();
    const program = createProgram(root, PACKAGES);
    const { variants } = extractVariants(program, root, '@ho-dev/primitives', 'Button');
    expect(variants.variant).toEqual({
      name: 'variant',
      values: ['primary', 'outline'],
      default: 'primary',
    });
    expect(variants.size).toEqual({ name: 'size', values: ['sm', 'md'], default: null });
  });

  it('sets a variant default to null when defaultVariants omits it', () => {
    const root = fixtureRoot();
    const program = createProgram(root, PACKAGES);
    const { variants, defaults } = extractVariants(program, root, '@ho-dev/primitives', 'Button');
    expect(defaults).toEqual({ variant: 'primary' });
    expect(variants.size.default).toBeNull();
  });

  it('returns no variants when the component has no cva call', () => {
    const root = fixtureRoot();
    const program = createProgram(root, PACKAGES);
    expect(extractVariants(program, root, '@ho-dev/primitives', 'Plain')).toEqual({
      variants: {},
      defaults: {},
    });
  });

  it('associates the component-specific variants variable', () => {
    const root = fixtureRoot();
    const program = createProgram(root, PACKAGES);
    const { variants } = extractVariants(program, root, '@ho-dev/primitives', 'Avatar');
    expect(Object.keys(variants)).toEqual(['size']);
    expect(variants.size.default).toBe('sm');
  });
});

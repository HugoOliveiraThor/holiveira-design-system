import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const CLI = join(process.cwd(), 'apps', 'docs', 'scripts', 'generate-docs-metadata.ts');

function write(root: string, relative: string, content: string): void {
  const file = join(root, relative);
  mkdirSync(join(file, '..'), { recursive: true });
  writeFileSync(file, content);
}

function manifest(name: string, version = '0.2.1'): string {
  return `${JSON.stringify({ name, version, description: `${name} package`, private: false }, null, 2)}\n`;
}

function componentsFile(names: string[], withVariants = false): string {
  const declarations = names
    .map(
      (name) => `export interface ${name}Props {
  variant?: string;
}

export const ${name} = (props: ${name}Props) => null;
`,
    )
    .join('\n');
  const variants = withVariants
    ? `const buttonVariants = cva('base', {
  variants: { variant: { primary: 'a', outline: 'b' } },
  defaultVariants: { variant: 'primary' },
});

`
    : '';
  return `${variants}${declarations}`;
}

function createFixture(): string {
  const root = mkdtempSync(join(tmpdir(), 'docs-metadata-cli-'));
  const packages: Array<[string, string, string[], boolean]> = [
    [
      'primitives',
      '@ho-dev/primitives',
      ['Button', 'Alert', 'Badge', 'InputGroup', 'Table', 'Dropdown'],
      true,
    ],
    ['ui', '@ho-dev/ui', ['Card', 'PageHeader'], false],
    ['forms', '@ho-dev/forms', ['Field', 'Form'], false],
    ['charts', '@ho-dev/charts', ['AreaChart'], false],
    ['layouts', '@ho-dev/layouts', ['Sidebar', 'Header'], false],
    ['types', '@ho-dev/types', [], false],
  ];
  for (const [dir, name, components, withVariants] of packages) {
    write(root, `packages/${dir}/package.json`, manifest(name));
    if (components.length > 0) {
      write(root, `packages/${dir}/src/components.ts`, componentsFile(components, withVariants));
      write(
        root,
        `packages/${dir}/src/index.ts`,
        components.map((component) => `export { ${component} } from './components';`).join('\n') +
          '\n',
      );
    } else {
      write(
        root,
        `packages/${dir}/src/index.ts`,
        'export interface NativeProps { onClick?: () => void; }\n',
      );
    }
  }
  write(
    root,
    'apps/docs/src/content/catalog.ts',
    `export const catalog = {
  packages: [
    { name: '@ho-dev/primitives', category: 'Components', components: [
      { exportName: 'Button', id: 'button', core: true },
      { exportName: 'Alert', id: 'alert', core: true },
      { exportName: 'Badge', id: 'badge', core: true },
      { exportName: 'InputGroup', id: 'input-group', core: true },
      { exportName: 'Table', id: 'table', core: true },
      { exportName: 'Dropdown', id: 'dropdown', core: true },
    ] },
    { name: '@ho-dev/ui', category: 'Components', components: [
      { exportName: 'Card', id: 'card', core: true },
      { exportName: 'PageHeader', id: 'page-header', core: true },
    ] },
    { name: '@ho-dev/forms', category: 'Components', components: [
      { exportName: 'Field', id: 'field', core: true },
      { exportName: 'Form', id: 'form' },
    ] },
    { name: '@ho-dev/charts', category: 'Components', components: [
      { exportName: 'AreaChart', id: 'area-chart', core: true },
    ] },
    { name: '@ho-dev/layouts', category: 'Components', components: [
      { exportName: 'Sidebar', id: 'sidebar', core: true },
      { exportName: 'Header', id: 'header', core: true },
    ] },
    { name: '@ho-dev/types', category: 'Utilities' },
  ],
};
`,
  );
  return root;
}

function run(
  root: string,
  args: string[] = [],
  env: NodeJS.ProcessEnv = {},
): { status: number; output: string } {
  try {
    const stdout = execFileSync('pnpm', ['exec', 'tsx', CLI, '--root', root, ...args], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, ...env },
    });
    return { status: 0, output: stdout };
  } catch (error) {
    const failure = error as { status?: number; stdout?: string; stderr?: string };
    return {
      status: failure.status ?? 1,
      output: `${failure.stdout ?? ''}${failure.stderr ?? ''}`,
    };
  }
}

const GENERATED = ['api.json', 'registry.json', 'search-index.json'];

describe('generate-docs-metadata CLI', { timeout: 60_000 }, () => {
  it('writes only the generated directory', () => {
    const root = createFixture();
    const result = run(root);
    expect(result.status).toBe(0);
    const generated = readdirSync(join(root, 'apps', 'docs', 'src', 'generated')).sort();
    expect(generated).toEqual(GENERATED);
  });

  it('regenerates in memory and compares committed files', () => {
    const root = createFixture();
    expect(run(root).status).toBe(0);
    const result = run(root, ['--check']);
    expect(result.status).toBe(0);
    expect(result.output).toContain('docs metadata current');
  });

  it('reports package and component counts', () => {
    const root = createFixture();
    expect(run(root).status).toBe(0);
    expect(run(root, ['--check']).output).toContain('6 packages, 13 components');
  });

  it('lists each differing file', () => {
    const root = createFixture();
    expect(run(root).status).toBe(0);
    writeFileSync(join(root, 'apps', 'docs', 'src', 'generated', 'registry.json'), '{}\n');
    const result = run(root, ['--check']);
    expect(result.status).toBe(1);
    expect(result.output).toContain('registry.json: out of date');
  });

  it('never writes in check mode', () => {
    const root = createFixture();
    expect(run(root).status).toBe(0);
    const path = join(root, 'apps', 'docs', 'src', 'generated', 'registry.json');
    writeFileSync(path, '{}\n');
    run(root, ['--check']);
    expect(readFileSync(path, 'utf8')).toBe('{}\n');
  });

  it('fails when an artifact is missing', () => {
    const root = createFixture();
    expect(run(root).status).toBe(0);
    rmSync(join(root, 'apps', 'docs', 'src', 'generated', 'api.json'));
    const result = run(root, ['--check']);
    expect(result.status).not.toBe(0);
    expect(result.output).toContain('api.json: missing');
    expect(existsSync(join(root, 'apps', 'docs', 'src', 'generated', 'api.json'))).toBe(false);
  });

  it('honours --root for fixtures', () => {
    const root = createFixture();
    expect(run(root).status).toBe(0);
    expect(existsSync(join(root, 'apps', 'docs', 'src', 'generated', 'registry.json'))).toBe(true);
  });

  it('does not write gate reports for fixture roots', () => {
    const root = createFixture();
    const gates = mkdtempSync(join(tmpdir(), 'docs-gates-'));
    const result = run(root, [], { HO_GATES_DIR: gates });
    expect(result.status).toBe(0);
    expect(readdirSync(gates)).toEqual([]);
  });

  it('fails when the catalog is missing', () => {
    const root = createFixture();
    rmSync(join(root, 'apps', 'docs', 'src', 'content', 'catalog.ts'));
    const result = run(root);
    expect(result.status).toBe(2);
    expect(result.output).toContain('catalog missing');
  });
});

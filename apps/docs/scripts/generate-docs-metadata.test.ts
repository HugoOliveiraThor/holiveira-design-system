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

function slugOf(exportName: string): string {
  return exportName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

const EXAMPLE_SOURCE = 'export function Example() {\n  return null;\n}\n';

function contentRecord(id: string): string {
  return `export const doc = {
  id: '${id}',
  summary: 'Example summary.',
  whenToUse: 'Use it for the example.',
  whenNotToUse: 'Do not use it for the example.',
  accessibility: { keyboard: 'Keyboard behavior.', aria: 'ARIA behavior.', focus: 'Focus behavior.' },
  related: [],
};
`;
}

function contentIndex(ids: string[]): string {
  const imports = ids
    .map((id, index) => `import { doc as doc${index} } from './${id}';`)
    .join('\n');
  const values = ids.map((_, index) => `doc${index}`).join(', ');
  return `${imports}\n\nexport const componentDocs = [${values}];\n`;
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
  const storyTitles: Record<string, string> = {
    primitives: 'Primitives',
    ui: 'UI',
    forms: 'Forms',
    charts: 'Charts',
    layouts: 'Layouts',
  };
  const componentIds: string[] = [];
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
      for (const component of components) {
        const slug = slugOf(component);
        componentIds.push(slug);
        write(
          root,
          `packages/${dir}/src/${slug}.stories.tsx`,
          `export default { title: '${storyTitles[dir]}/${component}' };\n`,
        );
        write(root, `apps/docs/src/content/components/${slug}.ts`, contentRecord(slug));
        write(root, `apps/docs/src/examples/${slug}/minimal.tsx`, EXAMPLE_SOURCE);
        write(root, `apps/docs/src/examples/${slug}/realistic.tsx`, EXAMPLE_SOURCE);
      }
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
    'packages/db/package.json',
    `${JSON.stringify({ name: '@ho-dev/db', version: '0.1.0', private: true }, null, 2)}\n`,
  );
  write(root, 'apps/docs/src/content/components/index.ts', contentIndex(componentIds));
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
      { exportName: 'Form', id: 'form', core: true },
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

function runReal(args: string[], env: NodeJS.ProcessEnv = {}): { status: number; output: string } {
  try {
    const stdout = execFileSync('pnpm', ['exec', 'tsx', CLI, ...args], {
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

function walk(directory: string, prefix = ''): string[] {
  const entries = readdirSync(join(directory, prefix), { withFileTypes: true });
  return entries.flatMap((entry) =>
    entry.isDirectory() ? walk(directory, join(prefix, entry.name)) : [join(prefix, entry.name)],
  );
}

const GENERATED = ['api.json', 'examples.json', 'registry.json', 'search-index.json'];

describe('generate-docs-metadata CLI', { timeout: 60_000 }, () => {
  it('writes only the generated directory', () => {
    const root = createFixture();
    const before = walk(root);
    const result = run(root);
    expect(result.status).toBe(0);
    const generated = readdirSync(join(root, 'apps', 'docs', 'src', 'generated')).sort();
    expect(generated).toEqual(GENERATED);
    const added = walk(root)
      .filter((file) => !before.includes(file))
      .sort();
    expect(added).toEqual(
      GENERATED.map((file) => join('apps', 'docs', 'src', 'generated', file)).sort(),
    );
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

  it('fails when a committed artifact is out of date', () => {
    const root = createFixture();
    expect(run(root).status).toBe(0);
    writeFileSync(join(root, 'apps', 'docs', 'src', 'generated', 'registry.json'), '{}\n');
    writeFileSync(join(root, 'apps', 'docs', 'src', 'generated', 'api.json'), '[]\n');
    const result = run(root, ['--check']);
    expect(result.status).toBe(1);
    expect(result.output).toContain('registry.json: out of date');
    expect(result.output).toContain('api.json: out of date');
  });

  it('never writes in check mode', () => {
    const root = createFixture();
    expect(run(root).status).toBe(0);
    const paths = GENERATED.map((file) => join(root, 'apps', 'docs', 'src', 'generated', file));
    for (const path of paths) writeFileSync(path, 'sentinel\n');
    run(root, ['--check']);
    for (const path of paths) expect(readFileSync(path, 'utf8')).toBe('sentinel\n');
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

  it('writes gate reports only for the real repository', () => {
    const gates = mkdtempSync(join(tmpdir(), 'docs-gates-'));
    const real = runReal(['--check'], { HO_GATES_DIR: gates });
    expect(real.status).toBe(0);
    const report = JSON.parse(readFileSync(join(gates, 'docs-metadata.json'), 'utf8')) as {
      gate: string;
      status: string;
      executed: boolean;
    };
    expect(report).toMatchObject({ gate: 'docs-metadata', status: 'pass', executed: true });

    const root = createFixture();
    expect(run(root).status).toBe(0);
    const fixtureGates = mkdtempSync(join(tmpdir(), 'docs-gates-'));
    expect(run(root, ['--check'], { HO_GATES_DIR: fixtureGates }).status).toBe(0);
    expect(readdirSync(fixtureGates)).toEqual([]);
  });

  it('fails when a core component has no record', () => {
    const root = createFixture();
    write(root, 'apps/docs/src/content/components/index.ts', 'export const componentDocs = [];\n');
    const result = run(root);
    expect(result.status).not.toBe(0);
    expect(result.output).toContain('core component button has no content record');
  });

  it('fails when a core component is missing an example', () => {
    const root = createFixture();
    rmSync(join(root, 'apps', 'docs', 'src', 'examples', 'button', 'minimal.tsx'));
    const result = run(root);
    expect(result.status).not.toBe(0);
    expect(result.output).toContain(
      'core component button is missing the minimal example (expected apps/docs/src/examples/button/minimal.tsx)',
    );
  });

  it('fails when an example imports a private package or a package source path', () => {
    const sourcePath = createFixture();
    write(
      sourcePath,
      'apps/docs/src/examples/button/minimal.tsx',
      "import { Button } from '../../../packages/primitives/src/components';\n\nexport const Example = Button;\n",
    );
    const sourceResult = run(sourcePath);
    expect(sourceResult.status).not.toBe(0);
    expect(sourceResult.output).toContain('which is a package source path');

    const named = createFixture();
    write(
      named,
      'apps/docs/src/examples/button/minimal.tsx',
      "import { db } from '@ho-dev/db';\n\nexport const Example = db;\n",
    );
    const namedResult = run(named);
    expect(namedResult.status).not.toBe(0);
    expect(namedResult.output).toContain('imports @ho-dev/db, which is a private package');

    const bare = createFixture();
    write(
      bare,
      'apps/docs/src/examples/button/minimal.tsx',
      "import '@ho-dev/db';\n\nexport const Example = null;\n",
    );
    const bareResult = run(bare);
    expect(bareResult.status).not.toBe(0);
    expect(bareResult.output).toContain('imports @ho-dev/db, which is a private package');
  });

  it('fails when two components share a story title', () => {
    const root = createFixture();
    write(
      root,
      'packages/primitives/src/badge.stories.tsx',
      "export default { title: 'Primitives/Button' };\n",
    );
    const result = run(root);
    expect(result.status).not.toBe(0);
    expect(result.output).toContain('Badge and Button share the story title "Primitives/Button"');
  });

  it('fails when the catalog is missing', () => {
    const root = createFixture();
    rmSync(join(root, 'apps', 'docs', 'src', 'content', 'catalog.ts'));
    const result = run(root);
    expect(result.status).toBe(2);
    expect(result.output).toContain('catalog missing');
  });
});

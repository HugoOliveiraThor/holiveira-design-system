import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const ROOT = process.cwd();
const TSX = join(ROOT, 'node_modules', '.bin', 'tsx');
const GATE_SCRIPT = 'scripts/check-readme-docs.ts';

interface RunResult {
  code: number | null;
  stdout: string;
  stderr: string;
}

function runGate(root: string, args: string[] = []): RunResult {
  const gates = join(root, 'reports', 'gates');
  const result = spawnSync(TSX, [GATE_SCRIPT, ...args], {
    cwd: ROOT,
    env: { ...process.env, HO_README_ROOT: root, HO_GATES_DIR: gates },
    encoding: 'utf8',
    timeout: 120_000,
  });
  return { code: result.status, stdout: result.stdout ?? '', stderr: result.stderr ?? '' };
}

interface PackageFixture {
  dir: string;
  name: string;
  barrel: string;
  readme: string;
  contract?: string;
}

function writeFixture(root: string, fixtures: PackageFixture[]): void {
  for (const fixture of fixtures) {
    const dir = join(root, 'packages', fixture.dir);
    mkdirSync(join(dir, 'src'), { recursive: true });
    writeFileSync(join(dir, 'package.json'), `${JSON.stringify({ name: fixture.name })}\n`);
    writeFileSync(join(dir, 'src', 'index.ts'), fixture.barrel);
    writeFileSync(join(dir, 'README.md'), fixture.readme);
    if (fixture.contract !== undefined) {
      const contracts = join(root, 'docs', 'architecture', 'contracts');
      mkdirSync(contracts, { recursive: true });
      writeFileSync(join(contracts, `${fixture.dir}.md`), fixture.contract);
    }
  }
}

const CLEAN: PackageFixture = {
  dir: 'alpha',
  name: '@ho-dev/alpha',
  barrel: 'export const widget = 42;\nexport type Widget = number;\n',
  readme: [
    '# @ho-dev/alpha',
    '',
    '## Usage',
    '',
    '```ts',
    "import { widget } from '@ho-dev/alpha';",
    '',
    'export const value: number = widget;',
    '```',
    '',
    '## Public API',
    '',
    '| Export   | Kind  |',
    '| -------- | ----- |',
    '| `widget` | value |',
    '| `Widget` | type  |',
    '',
  ].join('\n'),
  contract: [
    '# Package Contract: @ho-dev/alpha',
    '',
    '## Public API',
    '',
    '- `widget` — the widget value',
    '- `Widget` — the widget type',
    '',
  ].join('\n'),
};

const BROKEN: PackageFixture = {
  dir: 'beta',
  name: '@ho-dev/beta',
  barrel: 'export const beta = 1;\n',
  readme: [
    '# @ho-dev/beta',
    '',
    '## Public API',
    '',
    '| Export | Kind  |',
    '| ------ | ----- |',
    '| `beta` | value |',
    '',
    '```ts',
    "export const broken: number = 'text';",
    '```',
    '',
  ].join('\n'),
  contract: ['# Package Contract: @ho-dev/beta', '', '## Public API', '', '- `beta`', ''].join(
    '\n',
  ),
};

let cleanRoot: string;
let mixedRoot: string;
let brokenRoot: string;

beforeAll(() => {
  cleanRoot = mkdtempSync(join(tmpdir(), 'readme-gate-clean-'));
  writeFixture(cleanRoot, [CLEAN]);

  mixedRoot = mkdtempSync(join(tmpdir(), 'readme-gate-mixed-'));
  writeFixture(mixedRoot, [CLEAN, BROKEN]);

  brokenRoot = mkdtempSync(join(tmpdir(), 'readme-gate-broken-'));
  mkdirSync(join(brokenRoot, 'packages', 'gamma'), { recursive: true });
  writeFileSync(
    join(brokenRoot, 'packages', 'gamma', 'package.json'),
    `${JSON.stringify({ name: '@ho-dev/gamma' })}\n`,
  );
  writeFileSync(join(brokenRoot, 'packages', 'gamma', 'README.md'), '# @ho-dev/gamma\n');
});

afterAll(() => {
  for (const root of [cleanRoot, mixedRoot, brokenRoot]) {
    rmSync(root, { recursive: true, force: true });
  }
});

function readReport(root: string): Record<string, unknown> {
  const file = join(root, 'reports', 'gates', 'docs-readme.json');
  expect(existsSync(file)).toBe(true);
  return JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
}

describe('readme gate CLI', () => {
  it('exits 0 on a clean fixture', () => {
    const result = runGate(cleanRoot);
    expect(result.code).toBe(0);
    expect(result.stderr).toBe('');
    expect(result.stdout).toContain('✓ docs readme current: 1 packages, 1 contracts, 0 findings');
  });

  it('prints the summary line for the checked packages', () => {
    const result = runGate(cleanRoot);
    const summary = result.stdout.trim().split('\n').at(-1);
    expect(summary).toBe('✓ docs readme current: 1 packages, 1 contracts, 0 findings');
  });

  it('exits 1 on findings', () => {
    const result = runGate(mixedRoot);
    expect(result.code).toBe(1);
    expect(result.stderr).toContain('FAIL compile: packages/beta/README.md:10');
    expect(result.stderr).toContain('TS2322');
    expect(result.stderr).toContain('check:docs:readme — 1 finding(s)');
  });

  it('limits the run to the filtered packages', () => {
    const full = runGate(mixedRoot);
    const clean = runGate(mixedRoot, ['--filter', 'alpha']);
    const broken = runGate(mixedRoot, ['--filter', 'beta']);
    expect(full.code).toBe(1);
    expect(clean.code).toBe(0);
    expect(clean.stdout).toContain('✓ docs readme current: 1 packages, 1 contracts, 0 findings');
    expect(clean.stderr).toBe('');
    expect(broken.code).toBe(1);
    expect(broken.stderr).toContain('packages/beta/README.md');
  });

  it('accepts a package filter by manifest name', () => {
    const result = runGate(mixedRoot, ['--filter', '@ho-dev/alpha']);
    expect(result.code).toBe(0);
  });

  it('writes the gate report on pass and on findings', () => {
    runGate(cleanRoot);
    const pass = readReport(cleanRoot);
    expect(pass.gate).toBe('docs-readme');
    expect(pass.status).toBe('pass');
    expect(pass.executed).toBe(true);
    expect(pass.tool).toBe('typescript');
    expect(typeof pass.toolVersion).toBe('string');
    expect(pass.items).toEqual([expect.objectContaining({ name: 'docs-readme', status: 'pass' })]);

    runGate(mixedRoot);
    const fail = readReport(mixedRoot);
    expect(fail.status).toBe('fail');
    expect(fail.executed).toBe(true);
    expect(fail.items).toEqual([expect.objectContaining({ name: 'compile', status: 'fail' })]);
  });

  it('exits 2 on a structural error', () => {
    const result = runGate(brokenRoot);
    expect(result.code).toBe(2);
    expect(result.stderr).toContain('FAIL structural');
    expect(result.stderr).toContain('@ho-dev/gamma has no src/index.ts');
    const report = readReport(brokenRoot);
    expect(report.status).toBe('error');
    expect(report.executed).toBe(false);
  });

  it('runs in all-checks after the metadata gate', () => {
    const manifest = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as {
      scripts: Record<string, string>;
    };
    expect(manifest.scripts['check:docs:readme']).toBe(
      'pnpm exec tsx scripts/check-readme-docs.ts',
    );
    const steps = manifest.scripts['all-checks'].split(' && ');
    const metadata = steps.indexOf('pnpm run check:docs:metadata');
    const readme = steps.indexOf('pnpm run check:docs:readme');
    const gates = steps.indexOf('pnpm run check:gates');
    expect(metadata).toBeGreaterThan(-1);
    expect(readme).toBe(metadata + 1);
    expect(gates).toBeGreaterThan(readme);
  });

  it('lists the gate as expected by check:gates', () => {
    const source = readFileSync(join(ROOT, 'scripts', 'check-gates.ts'), 'utf8');
    expect(source).toContain("'docs-readme'");
  });
});

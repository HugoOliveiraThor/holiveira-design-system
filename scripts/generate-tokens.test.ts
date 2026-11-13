import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const CLI = join(process.cwd(), 'scripts', 'generate-tokens.ts');

const CSS = `@theme {
  --color-primary: #5750f1;
  --container-2_5: 0.625rem;
  --container-10_5: 2.625rem;
  --min-width-22_5: 5.625rem;
  --aspect-4\\/3: 4 / 3;
  --animate-spin-1_5: spin 1.5s linear infinite;
  --text-heading-1: 60px;
  --text-heading-1--line-height: 72px;
  --shadow-1: 0 1px 2px rgba(0, 0, 0, 0.05);
  --breakpoint-xsm: 425px;
  --font-sans: Satoshi, sans-serif;
}
`;

function createFixture(css = CSS): string {
  const root = mkdtempSync(join(tmpdir(), 'generate-tokens-'));
  mkdirSync(join(root, 'packages', 'tokens', 'src'), { recursive: true });
  writeFileSync(join(root, 'packages', 'tokens', 'src', 'tokens.css'), css);
  return root;
}

function writeCss(root: string, css: string): void {
  writeFileSync(join(root, 'packages', 'tokens', 'src', 'tokens.css'), css);
}

function run(args: string[]): { status: number; output: string } {
  try {
    const stdout = execFileSync('pnpm', ['exec', 'tsx', CLI, ...args], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
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

function generated(root: string, file: string): string {
  return readFileSync(join(root, 'packages', 'tokens', 'src', file), 'utf8');
}

describe('generate-tokens CLI', () => {
  it('emits names with underscores and escapes', () => {
    const root = createFixture();
    const result = run(['--root', root]);
    expect(result.status).toBe(0);
    expect(generated(root, 'spacing.ts')).toMatch(/["']2_5["']:\s*["']0\.625rem["']/);
    expect(generated(root, 'spacing.ts')).toMatch(/["']10_5["']:\s*["']2\.625rem["']/);
    expect(generated(root, 'dimensions.ts')).toMatch(/["']4\/3["']:\s*["']4 \/ 3["']/);
    expect(generated(root, 'animations.ts')).toMatch(
      /["']spin-1_5["']:\s*["']spin 1\.5s linear infinite["']/,
    );
  });

  it('fails on a declaration it cannot parse', () => {
    const root = createFixture('@theme {\n  --color-ok: #000;\n  -- broken !!!\n}\n');
    const result = run(['--root', root]);
    expect(result.status).toBe(1);
    expect(result.output).toContain('unrecognized declaration');
    expect(result.output).toContain('-- broken !!!');
  });

  it('detects drift in check mode', () => {
    const root = createFixture();
    expect(run(['--root', root]).status).toBe(0);
    const before = generated(root, 'colors.ts');
    writeCss(
      root,
      CSS.replace('#5750f1', '#111111').replace(
        'spin 1.5s linear infinite',
        'spin 2s linear infinite',
      ),
    );
    const result = run(['--root', root, '--check']);
    expect(result.status).toBe(1);
    expect(result.output).toContain('colors.ts');
    expect(result.output).toContain('animations.ts');
    expect(generated(root, 'colors.ts')).toBe(before);
  });

  it('keeps the generated header and writes only generated files', () => {
    const root = createFixture();
    expect(run(['--root', root]).status).toBe(0);
    for (const file of [
      'colors.ts',
      'shadows.ts',
      'spacing.ts',
      'typography.ts',
      'dimensions.ts',
      'animations.ts',
    ]) {
      expect(generated(root, file).startsWith('// AUTO-GENERATED')).toBe(true);
    }
    expect(readdirSync(join(root, 'packages', 'tokens', 'src')).sort()).toEqual([
      'animations.ts',
      'colors.ts',
      'dimensions.ts',
      'shadows.ts',
      'spacing.ts',
      'tokens.css',
      'typography.ts',
    ]);
  });

  it('fails when the theme block is missing', () => {
    const root = createFixture('body { color: red; }\n');
    const result = run(['--root', root]);
    expect(result.status).toBe(1);
    expect(result.output).toContain('no @theme block');
    expect(readdirSync(join(root, 'packages', 'tokens', 'src'))).toEqual(['tokens.css']);
  });

  it('fails on a duplicate declaration', () => {
    const root = createFixture('@theme {\n  --color-a: #000;\n  --color-a: #fff;\n}\n');
    const result = run(['--root', root]);
    expect(result.status).toBe(1);
    expect(result.output).toContain('duplicate token');
    expect(result.output).toContain('--color-a');
  });

  it('keeps semicolons inside quoted values', () => {
    const root = createFixture('@theme {\n  --shadow-semi: "a;b";\n}\n');
    expect(run(['--root', root]).status).toBe(0);
    expect(generated(root, 'shadows.ts')).toContain('a;b');
  });

  it('fails on an orphan line-height declaration', () => {
    const root = createFixture('@theme {\n  --text-x--line-height: 20px;\n}\n');
    const result = run(['--root', root]);
    expect(result.status).toBe(1);
    expect(result.output).toContain('--text-x--line-height');
    expect(result.output).toContain('no matching');
  });

  it('fails on duplicate generated keys', () => {
    const root = createFixture(
      '@theme {\n  --animate-x-y: spin 1s linear infinite;\n  --animate-x\\-y: spin 2s linear infinite;\n}\n',
    );
    const result = run(['--root', root]);
    expect(result.status).toBe(1);
    expect(result.output).toContain('duplicate generated key "x-y"');
  });
});

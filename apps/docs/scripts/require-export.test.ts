import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const ROOT = process.cwd();
const SCRIPT = join(ROOT, 'apps', 'docs', 'scripts', 'require-export.mjs');
const created: string[] = [];

function tempDir(): string {
  const directory = mkdtempSync(join(tmpdir(), 'ho-docs-built-'));
  created.push(directory);
  return directory;
}

function run(root: string) {
  const result = spawnSync(process.execPath, [SCRIPT], { cwd: root, encoding: 'utf8' });
  return { code: result.status, stdout: result.stdout ?? '', stderr: result.stderr ?? '' };
}

afterEach(() => {
  for (const directory of created.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe('require-export', () => {
  it('fails clearly without a built export', () => {
    const root = tempDir();

    const result = run(root);

    expect(result.code).toBe(1);
    expect(result.stderr).toContain('out/index.html');
    expect(result.stderr).toContain('pnpm --filter @ho-dev/docs run build');
  });

  it('accepts an existing export', () => {
    const root = tempDir();
    mkdirSync(join(root, 'out'), { recursive: true });
    writeFileSync(join(root, 'out', 'index.html'), '<html></html>');

    const result = run(root);

    expect(result.code).toBe(0);
    expect(result.stderr).toBe('');
  });
});

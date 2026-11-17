import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const ROOT = process.cwd();
const created: string[] = [];

function tempDir(prefix: string): string {
  const directory = mkdtempSync(join(tmpdir(), prefix));
  created.push(directory);
  return directory;
}

afterEach(() => {
  for (const directory of created.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe('check-export CLI', () => {
  it('lists the failed checks and exits non-zero', () => {
    const root = tempDir('check-export-');
    for (const file of ['package.json', 'next.config.ts', 'site.config.ts']) {
      cpSync(join(ROOT, 'apps', 'docs', file), join(root, file));
    }
    mkdirSync(join(root, 'src', 'app'), { recursive: true });
    cpSync(
      join(ROOT, 'apps', 'docs', 'src', 'app', 'globals.css'),
      join(root, 'src', 'app', 'globals.css'),
    );
    cpSync(
      join(ROOT, 'apps', 'docs', 'src', 'app', 'page.tsx'),
      join(root, 'src', 'app', 'page.tsx'),
    );
    mkdirSync(join(root, 'out'), { recursive: true });
    writeFileSync(
      join(root, 'out', 'index.html'),
      '<html lang="en"><body><main><h1>No title here</h1></main></body></html>',
    );

    const result = spawnSync(
      join(ROOT, 'node_modules', '.bin', 'tsx'),
      [join(ROOT, 'apps', 'docs', 'scripts', 'check-export.ts')],
      { cwd: root, encoding: 'utf8', timeout: 120_000 },
    );
    const output = `${result.stdout ?? ''}${result.stderr ?? ''}`;

    expect(result.status).toBe(1);
    expect(output).toContain('DOCS-07');
  });
});

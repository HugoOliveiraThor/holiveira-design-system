import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  GATES,
  exportHead,
  linkModules,
  removeExport,
  runCleanCheck,
  runGates,
} from './check-clean';

const ROOT = process.cwd();
const created: string[] = [];

function tempDir(prefix: string): string {
  const directory = mkdtempSync(join(tmpdir(), prefix));
  created.push(directory);
  return directory;
}

function git(cwd: string, args: string[]): void {
  execFileSync('git', args, {
    cwd,
    encoding: 'utf8',
    env: {
      ...process.env,
      GIT_AUTHOR_NAME: 'Fixture',
      GIT_AUTHOR_EMAIL: 'fixture@example.com',
      GIT_COMMITTER_NAME: 'Fixture',
      GIT_COMMITTER_EMAIL: 'fixture@example.com',
    },
  });
}

afterEach(() => {
  vi.restoreAllMocks();
  for (const directory of created.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe('check-clean', () => {
  it('exports only what the commit contains', { timeout: 120_000 }, () => {
    const repository = tempDir('ho-clean-repo-');
    writeFileSync(join(repository, 'README.md'), '# fixture\n');
    git(repository, ['init', '-q']);
    git(repository, ['add', 'README.md']);
    git(repository, ['commit', '-q', '-m', 'fixture']);
    writeFileSync(join(repository, 'untracked.txt'), 'worktree only\n');

    const exportRoot = exportHead(repository);
    try {
      expect(readFileSync(join(exportRoot, 'README.md'), 'utf8')).toBe('# fixture\n');
      expect(existsSync(join(exportRoot, 'untracked.txt'))).toBe(false);
      expect(existsSync(join(exportRoot, '.git'))).toBe(false);
    } finally {
      removeExport(exportRoot);
    }
  });

  it('runs the file-reading gates the pipeline runs', () => {
    expect(GATES.map((gate) => gate.name)).toEqual([
      'check:docs:metadata',
      'check:docs:readme',
      'check:exports',
    ]);
    for (const gate of GATES) {
      expect(existsSync(join(ROOT, gate.script)), gate.script).toBe(true);
    }
  });

  it('names a cited file the commit does not contain', { timeout: 300_000 }, () => {
    const exportRoot = exportHead(ROOT);
    try {
      linkModules(ROOT, exportRoot);
      const readme = join(exportRoot, 'packages', 'utils', 'README.md');
      writeFileSync(
        readme,
        `${readFileSync(readme, 'utf8')}\nSee \`docs/architecture/contracts/cited-file-does-not-exist.md\`.\n`,
      );

      let captured = '';
      vi.spyOn(process.stdout, 'write').mockImplementation((chunk) => {
        captured += String(chunk);
        return true;
      });
      vi.spyOn(process.stderr, 'write').mockImplementation((chunk) => {
        captured += String(chunk);
        return true;
      });

      const code = runGates(ROOT, exportRoot);

      expect(code).toBe(1);
      expect(captured).toContain('cited-file-does-not-exist.md');
      expect(
        existsSync(join(ROOT, 'docs', 'architecture', 'contracts', 'cited-file-does-not-exist.md')),
      ).toBe(false);
    } finally {
      removeExport(exportRoot);
    }
  });

  it('exits without running the gates when the archive fails', { timeout: 120_000 }, async () => {
    const runGates = vi.fn(() => 0);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const code = await runCleanCheck({
      root: ROOT,
      ref: 'refs/heads/does-not-exist',
      runGates,
    });

    expect(code).toBe(2);
    expect(runGates).not.toHaveBeenCalled();
  });

  it('removes the temporary export after a failure', { timeout: 120_000 }, async () => {
    let captured = '';
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const code = await runCleanCheck({
      root: ROOT,
      runGates: (_root, exportRoot) => {
        captured = exportRoot;
        return 1;
      },
    });

    expect(code).toBe(1);
    expect(captured).not.toBe('');
    expect(existsSync(captured)).toBe(false);
    expect(existsSync(join(captured, 'node_modules'))).toBe(false);
    expect(existsSync(join(captured, 'packages', 'utils', 'node_modules'))).toBe(false);
  });
});

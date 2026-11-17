import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GATE_SCRIPT, isValidated, markValidated, markerPath, runPrepush } from './prepush';

const ROOT = process.cwd();
const SHA = 'a'.repeat(40);
const NEW_SHA = 'b'.repeat(40);

const created: string[] = [];

function tempDir(prefix: string): string {
  const directory = mkdtempSync(join(tmpdir(), prefix));
  created.push(directory);
  return directory;
}

afterEach(() => {
  vi.restoreAllMocks();
  for (const directory of created.splice(0)) {
    rmSync(directory, { recursive: true, force: true });
  }
});

describe('pre-push', () => {
  it('skips a head that already passed', async () => {
    const gitDir = tempDir('ho-prepush-git-');
    const reportsDir = tempDir('ho-prepush-reports-');
    markValidated(gitDir, SHA);
    const runGate = vi.fn(() => ({ code: 0, output: '' }));
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    const code = await runPrepush({ gitDir, sha: SHA, reportsDir, runGate });

    expect(code).toBe(0);
    expect(runGate).not.toHaveBeenCalled();
    expect(log.mock.calls.flat().join('\n')).toContain(SHA.slice(0, 12));
    expect(existsSync(join(reportsDir, `prepush-${SHA}.log`))).toBe(false);
  });

  it('reruns after a new commit', async () => {
    const gitDir = tempDir('ho-prepush-git-');
    const reportsDir = tempDir('ho-prepush-reports-');
    markValidated(gitDir, SHA);
    const runGate = vi.fn(() => ({ code: 0, output: 'all good\n' }));
    vi.spyOn(console, 'log').mockImplementation(() => undefined);

    const code = await runPrepush({ gitDir, sha: NEW_SHA, reportsDir, runGate });

    expect(code).toBe(0);
    expect(runGate).toHaveBeenCalledTimes(1);
    expect(isValidated(gitDir, NEW_SHA)).toBe(true);
    expect(isValidated(gitDir, SHA)).toBe(true);
    expect(readFileSync(join(reportsDir, `prepush-${NEW_SHA}.log`), 'utf8')).toBe('all good\n');
  });

  it('reruns when the marker records another sha', async () => {
    const gitDir = tempDir('ho-prepush-git-');
    const reportsDir = tempDir('ho-prepush-reports-');
    writeFileSync(markerPath(gitDir, SHA), `${NEW_SHA}\n`);
    const runGate = vi.fn(() => ({ code: 0, output: '' }));
    vi.spyOn(console, 'log').mockImplementation(() => undefined);

    const code = await runPrepush({ gitDir, sha: SHA, reportsDir, runGate });

    expect(code).toBe(0);
    expect(runGate).toHaveBeenCalledTimes(1);
    expect(isValidated(gitDir, SHA)).toBe(true);
  });

  it('writes the log and names the failing step', async () => {
    const gitDir = tempDir('ho-prepush-git-');
    const reportsDir = tempDir('ho-prepush-reports-');
    const output = [
      '> vitest run',
      ' ✓ assembles the artifact from the three builds',
      ' × serves the three public paths from one artifact',
      'FAIL scripts/check-artifact.test.ts > serves the three public paths from one artifact',
      'Error: expected 200',
    ].join('\n');
    const runGate = vi.fn(() => ({ code: 1, output }));
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const code = await runPrepush({ gitDir, sha: SHA, reportsDir, runGate });

    const logPath = join(reportsDir, `prepush-${SHA}.log`);
    expect(code).toBe(1);
    expect(readFileSync(logPath, 'utf8')).toBe(`${output}\n`);
    const printed = error.mock.calls.flat().join('\n');
    expect(printed).toContain(
      'FAIL scripts/check-artifact.test.ts > serves the three public paths from one artifact',
    );
    expect(printed).toContain(logPath);
    expect(isValidated(gitDir, SHA)).toBe(false);
  });

  it('runs check:ci before a push', () => {
    const hook = readFileSync(join(ROOT, '.husky', 'pre-push'), 'utf8').trim();

    expect(GATE_SCRIPT).toBe('check:ci');
    expect(hook).toBe('pnpm exec tsx scripts/prepush.ts');
    expect(hook).not.toContain('all-checks');
  });
});

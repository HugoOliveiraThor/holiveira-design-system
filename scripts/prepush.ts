import { execFileSync, spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * Pre-push gate.
 *
 * Requires `check:ci` for the exact commit leaving the machine. A marker at
 * `.git/dsh-validated-<sha>` skips a SHA that already passed, so re-pushing the
 * same commit costs nothing; any new commit invalidates the skip because the
 * marker is keyed by SHA. A failure writes the full output to
 * `reports/prepush-<sha>.log` and prints the failing block, so a red run can be
 * diagnosed without repeating ten minutes of gates.
 */

export const GATE_SCRIPT = 'check:ci';

export interface GateRun {
  code: number;
  output: string;
}

export function gitDirectory(root: string): string {
  return execFileSync('git', ['rev-parse', '--absolute-git-dir'], {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

export function headSha(root: string): string {
  return execFileSync('git', ['rev-parse', 'HEAD'], {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

/** Path of the marker that records a validated SHA; never inside the worktree. */
export function markerPath(gitDir: string, sha: string): string {
  return join(gitDir, `dsh-validated-${sha}`);
}

/** Fail closed: an unreadable or mismatched marker means the gate runs again. */
export function isValidated(gitDir: string, sha: string): boolean {
  const path = markerPath(gitDir, sha);
  if (!existsSync(path)) return false;
  try {
    return readFileSync(path, 'utf8').trim() === sha;
  } catch {
    return false;
  }
}

export function markValidated(gitDir: string, sha: string): void {
  writeFileSync(markerPath(gitDir, sha), `${sha}\n`);
}

/**
 * The last failing block of a gate run: the failing test or step name plus the
 * lines around it. Falls back to the tail when nothing matches.
 */
export function failingBlock(output: string): string {
  const lines = output.split('\n');
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    if (/(?:^|\s)(?:FAIL|✗|Error:|ELIFECYCLE)/.test(lines[index])) {
      return lines.slice(Math.max(0, index - 8), index + 1).join('\n');
    }
  }
  return lines.slice(-20).join('\n');
}

/** Runs `check:ci` from the repository root, streaming its output as it arrives. */
export function runCheckCi(root: string): Promise<GateRun> {
  return new Promise((resolveRun) => {
    const child = spawn('pnpm', ['run', GATE_SCRIPT], {
      cwd: root,
      env: process.env,
      stdio: ['inherit', 'pipe', 'pipe'],
    });
    let output = '';
    child.stdout.on('data', (chunk: Buffer) => {
      output += chunk.toString();
      process.stdout.write(chunk);
    });
    child.stderr.on('data', (chunk: Buffer) => {
      output += chunk.toString();
      process.stderr.write(chunk);
    });
    child.on('close', (code) => resolveRun({ code: code ?? 1, output }));
  });
}

export interface PrepushOptions {
  root?: string;
  gitDir?: string;
  sha?: string;
  reportsDir?: string;
  runGate?: () => GateRun | Promise<GateRun>;
}

export async function runPrepush(options: PrepushOptions = {}): Promise<number> {
  const root = options.root ?? process.cwd();
  const sha = options.sha ?? headSha(root);
  const gitDir = options.gitDir ?? gitDirectory(root);
  const reportsDir = options.reportsDir ?? join(root, 'reports');
  const short = sha.slice(0, 12);

  if (isValidated(gitDir, sha)) {
    console.log(`pre-push — HEAD ${short} already validated; skipping ${GATE_SCRIPT}`);
    return 0;
  }

  console.log(`pre-push — running ${GATE_SCRIPT} for ${short}`);
  const run = options.runGate ?? (() => runCheckCi(root));
  const { code, output } = await run();

  const logPath = join(reportsDir, `prepush-${sha}.log`);
  mkdirSync(reportsDir, { recursive: true });
  writeFileSync(logPath, output.endsWith('\n') ? output : `${output}\n`);

  if (code !== 0) {
    console.error(`\npre-push — ${GATE_SCRIPT} failed for ${short}`);
    console.error(failingBlock(output));
    console.error(`pre-push — full output: ${logPath}`);
    return code;
  }

  markValidated(gitDir, sha);
  console.log(`pre-push — ${GATE_SCRIPT} passed; ${short} validated`);
  return 0;
}

const invokedDirectly =
  process.argv[1] !== undefined && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (invokedDirectly) {
  void runPrepush().then((code) => process.exit(code));
}

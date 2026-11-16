#!/usr/bin/env node
/**
 * Single-flight guard for the heavy gates.
 *
 * The machine is shared: other sessions and the editor compete for RAM. This
 * wrapper refuses to start `all-checks` or `check:ci` while another heavy run
 * holds the lock, checks free memory before a run, and clears a lock whose PID
 * is gone. CI skips the lock (each runner is isolated) and only forwards.
 */
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const LOCK = join(ROOT, '.git', 'dsh-heavy.lock');
const HELD_ENV = 'DSH_HEAVY_LOCK';
const MIN_FREE_BYTES = 1024 ** 3;

const script = process.argv[2];
if (!script) {
  console.error('usage: node scripts/heavy-guard.mjs <pnpm-script>');
  process.exit(2);
}

const isCi = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';
const nested = process.env[HELD_ENV] === '1';

function isAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function lockHolder() {
  if (!existsSync(LOCK)) return undefined;
  const pid = Number(readFileSync(LOCK, 'utf8').trim().split(':')[0]);
  return Number.isInteger(pid) ? pid : undefined;
}

function acquire() {
  const holder = lockHolder();
  if (holder !== undefined) {
    if (isAlive(holder)) {
      console.error(
        `heavy-guard: ${script} blocked — PID ${holder} is already running a heavy gate.`,
      );
      console.error('Wait for it, or run `pnpm run check:stop` if it is stuck.');
      process.exit(3);
    }
    console.error(`heavy-guard: clearing a stale lock left by PID ${holder}.`);
    rmSync(LOCK, { force: true });
  }
  writeFileSync(LOCK, `${process.pid}:${script}\n`);
}

function release() {
  const holder = lockHolder();
  if (holder !== process.pid) return;
  rmSync(LOCK, { force: true });
}

function freeBytes() {
  if (process.platform !== 'darwin') return undefined;
  try {
    const report = execFileSync('vm_stat', { encoding: 'utf8' });
    const page = /page size of (\d+)/.exec(report);
    const free = /Pages free:\s+(\d+)/.exec(report);
    if (page === null || free === null) return undefined;
    return Number(free[1]) * Number(page[1]);
  } catch {
    return undefined;
  }
}

function describe(bytes) {
  return bytes === undefined ? 'unknown' : `${(bytes / 1024 ** 3).toFixed(1)} GB free`;
}

if (!isCi && !nested) {
  acquire();
  const free = freeBytes();
  if (free !== undefined && free < MIN_FREE_BYTES) {
    release();
    console.error(`heavy-guard: only ${describe(free)}; free memory before running ${script}.`);
    process.exit(4);
  }
  console.log(`heavy-guard: ${script} starting (${describe(free)})`);
}

let status = 1;
try {
  const result = spawnSync('pnpm', ['run', script], {
    stdio: 'inherit',
    env: { ...process.env, [HELD_ENV]: '1' },
  });
  status = result.status ?? 1;
} finally {
  if (!isCi && !nested) {
    const free = freeBytes();
    console.log(`heavy-guard: ${script} finished with ${status} (${describe(free)})`);
    release();
  }
}

process.exit(status);

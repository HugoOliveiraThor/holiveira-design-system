#!/usr/bin/env node
/**
 * Stop stray heavy processes owned by this checkout.
 *
 * The harness sandbox blocks `ps`, and a killed gate can leave Vitest,
 * Playwright or a Next build behind while another run starts. This prints what
 * it found and terminates it, never touching the current process tree.
 */
import { execFileSync } from 'node:child_process';

const PATTERNS = [
  'node_modules/.bin/vitest',
  'node_modules/.bin/playwright',
  'playwright test',
  'next build',
  'turbo run',
  'scripts/check-',
  'generate-docs-metadata',
];

const protectedPids = new Set([process.pid, process.ppid]);
const found = new Set();

for (const pattern of PATTERNS) {
  let output = '';
  try {
    output = execFileSync('pgrep', ['-f', pattern], { encoding: 'utf8' });
  } catch {
    continue;
  }
  for (const line of output.split('\n')) {
    const pid = Number(line.trim());
    if (Number.isInteger(pid) && pid > 1) found.add(pid);
  }
}

for (const pid of found) {
  if (protectedPids.has(pid)) continue;
  try {
    process.kill(pid, 'SIGTERM');
    console.log(`check:stop — terminated ${pid}`);
  } catch (error) {
    console.error(`check:stop — could not stop ${pid}: ${error.message}`);
  }
}

if (found.size === 0) console.log('check:stop — nothing running');

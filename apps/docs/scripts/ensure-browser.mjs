#!/usr/bin/env node
/**
 * Ensure the Playwright Chromium build exists before the parity gate runs.
 *
 * The e2e suite and the visual suite both need it. Installing unconditionally
 * fails on a machine whose browser cache is outside the writable area, so the
 * check is presence first: only a missing build triggers the install.
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

import { chromium } from '@playwright/test';

const executable = chromium.executablePath();

if (existsSync(executable)) {
  process.exit(0);
}

console.error(`Chromium not found at ${executable}; installing it now.`);
const result = spawnSync('pnpm', ['exec', 'playwright', 'install', 'chromium'], {
  stdio: 'inherit',
  cwd: process.cwd(),
});

if (result.status !== 0) {
  console.error('Chromium install failed. Run it manually: pnpm exec playwright install chromium');
  process.exit(result.status ?? 1);
}

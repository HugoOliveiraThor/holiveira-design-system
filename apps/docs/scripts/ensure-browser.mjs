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
import { pathToFileURL } from 'node:url';

import { chromium } from '@playwright/test';

/**
 * Run the presence check and, only when the browser is missing, the installer.
 * Injected `exists`/`install` keep both branches testable.
 */
export function ensureBrowser({ executable, exists = existsSync, install, log = console }) {
  if (exists(executable)) return 0;

  log.error(`Chromium not found at ${executable}; installing it now.`);
  const status = install();
  if (status !== 0) {
    log.error('Chromium install failed. Run it manually: pnpm exec playwright install chromium');
  }
  return status;
}

export function installChromium() {
  const result = spawnSync('pnpm', ['exec', 'playwright', 'install', 'chromium'], {
    stdio: 'inherit',
    cwd: process.cwd(),
  });
  return result.status ?? 1;
}

const invokedDirectly =
  process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href;

if (invokedDirectly) {
  process.exit(ensureBrowser({ executable: chromium.executablePath(), install: installChromium }));
}

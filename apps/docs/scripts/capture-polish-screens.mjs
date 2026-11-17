#!/usr/bin/env node
/**
 * The redesign evidence: six screenshots at 1440, 768 and 390 in both themes,
 * plus the computed style probe for the landing and one component page.
 *
 * Run it after `pnpm --filter @ho-dev/docs build`:
 *   node apps/docs/scripts/capture-polish-screens.mjs
 *
 * It starts the same static server the e2e suite uses on a private port, so it
 * never competes with a running Playwright run.
 */
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = resolve(fileURLToPath(new URL('.', import.meta.url)));
const APP_ROOT = resolve(SCRIPT_DIR, '..');
const REPO_ROOT = resolve(APP_ROOT, '..', '..');
const OUT_ROOT = join(APP_ROOT, 'out');
const REPORT_DIR = join(REPO_ROOT, 'docs', 'reports', 'docs-ui-polish');
const SCREEN_DIR = join(REPORT_DIR, 'screens');
const PROBE_PATH = join(REPORT_DIR, 'probe.json');

const PORT = Number(process.env.POLISH_PORT ?? 3311);
const ORIGIN = `http://127.0.0.1:${PORT}`;
const BASE_PATH = '/holiveira-design-system/docs';

const LANDING = `${BASE_PATH}/`;
const COMPONENT = `${BASE_PATH}/components/button/`;

const WIDTHS = [1440, 768, 390];
const THEMES = ['light', 'dark'];

/** The roles the visual layer declares; the probe reads every one of them. */
const ROLES = [
  '--portal-canvas',
  '--portal-surface',
  '--portal-surface-2',
  '--portal-border',
  '--portal-ink',
  '--portal-body',
  '--portal-muted',
  '--portal-primary',
  '--portal-primary-strong',
  '--portal-primary-soft',
  '--portal-accent',
  '--portal-success',
  '--portal-warning',
  '--portal-danger',
  '--portal-code-bg',
  '--portal-ring',
];

if (!existsSync(join(OUT_ROOT, 'index.html'))) {
  console.error(`capture-polish-screens: no static export at ${OUT_ROOT}`);
  console.error('capture-polish-screens: run `pnpm --filter @ho-dev/docs build` first.');
  process.exit(1);
}

async function waitForServer(url, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // the server is still starting
    }
    await new Promise((done) => setTimeout(done, 200));
  }
  throw new Error(`the static server did not answer at ${url}`);
}

async function probe(page, url) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  return page.evaluate((roles) => {
    const styles = getComputedStyle(document.documentElement);
    const palette = {};
    for (const role of roles) palette[role] = styles.getPropertyValue(role).trim();
    return {
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      fontFamily: getComputedStyle(document.body).fontFamily,
      palette,
    };
  }, ROLES);
}

async function overflow(page, url, width) {
  await page.setViewportSize({ width, height: 844 });
  await page.goto(url, { waitUntil: 'networkidle' });
  return page.evaluate(() => {
    const root = document.documentElement;
    return {
      viewport: root.clientWidth,
      scrollWidth: root.scrollWidth,
      overflows: root.scrollWidth > root.clientWidth,
    };
  });
}

function startServer() {
  const child = spawn(process.execPath, [join(SCRIPT_DIR, 'serve-export.mjs')], {
    env: { ...process.env, PORT: String(PORT), HOST: '127.0.0.1' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  child.stderr.on('data', (chunk) => process.stderr.write(chunk));
  return child;
}

async function main() {
  mkdirSync(SCREEN_DIR, { recursive: true });
  const server = startServer();
  let browser;
  try {
    await waitForServer(`${ORIGIN}${BASE_PATH}/`);

    browser = await chromium.launch();
    const shots = [];
    for (const theme of THEMES) {
      for (const width of WIDTHS) {
        const context = await browser.newContext({
          viewport: { width, height: 900 },
          deviceScaleFactor: 1,
          colorScheme: theme,
        });
        if (theme === 'dark') {
          await context.addInitScript(() => localStorage.setItem('ho-dev-docs-theme', 'dark'));
        }
        const page = await context.newPage();
        await page.goto(`${ORIGIN}${LANDING}`, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        const file = join(SCREEN_DIR, `landing-${width}-${theme}.png`);
        await page.screenshot({ path: file, fullPage: true });
        shots.push(file);
        await context.close();
      }
    }

    const light = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      colorScheme: 'light',
    });
    const lightPage = await light.newPage();
    const landing = await probe(lightPage, `${ORIGIN}${LANDING}`);
    const component = await probe(lightPage, `${ORIGIN}${COMPONENT}`);
    const landingOverflow = await overflow(lightPage, `${ORIGIN}${LANDING}`, 390);
    const componentOverflow = await overflow(lightPage, `${ORIGIN}${COMPONENT}`, 390);
    await light.close();

    const dark = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
      colorScheme: 'dark',
    });
    await dark.addInitScript(() => localStorage.setItem('ho-dev-docs-theme', 'dark'));
    const darkPage = await dark.newPage();
    const darkPalette = await probe(darkPage, `${ORIGIN}${LANDING}`);
    await dark.close();

    const probeOutput = {
      capturedAt: new Date().toISOString(),
      basePath: BASE_PATH,
      viewports: WIDTHS,
      themes: THEMES,
      pages: {
        landing: {
          url: LANDING,
          fontFamily: landing.fontFamily,
          palette: landing.palette,
          darkPalette: darkPalette.palette,
          overflowAt390: landingOverflow,
        },
        component: {
          url: COMPONENT,
          fontFamily: component.fontFamily,
          palette: component.palette,
          overflowAt390: componentOverflow,
        },
      },
    };
    writeFileSync(PROBE_PATH, `${JSON.stringify(probeOutput, null, 2)}\n`);
    console.log(`capture-polish-screens: wrote ${PROBE_PATH}`);
    for (const shot of shots) console.log(`capture-polish-screens: ${shot}`);
  } finally {
    if (browser !== undefined) await browser.close();
    server.kill('SIGTERM');
  }
}

await main();

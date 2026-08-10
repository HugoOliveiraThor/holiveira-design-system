import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { chromium } from '@playwright/test';

const PORT = 6007;
const BASE = `http://localhost:${PORT}`;
const STORYBOOK_DIR = fileURLToPath(new URL('../', import.meta.url));
const OUT_DIR = fileURLToPath(new URL('../../../assets/screenshots/', import.meta.url));

const COMPONENTS = [
  { slug: 'button', storyId: 'primitives-button--primary' },
  { slug: 'alert', storyId: 'primitives-alert--all-variants' },
  { slug: 'button-group', storyId: 'ui-buttongroup--primary' },
  { slug: 'card', storyId: 'ui-card--default' },
  { slug: 'input-group', storyId: 'primitives-inputgroup--text' },
  { slug: 'table', storyId: 'primitives-table--full-composition' },
  { slug: 'dropdown', storyId: 'primitives-dropdown--default' },
  { slug: 'area-chart', storyId: 'charts-areachart--single-area' },
  { slug: 'pie-chart', storyId: 'charts-piechart--donut' },
  { slug: 'sidebar', storyId: 'layouts-sidebar--with-navigation-items' },
  { slug: 'form', storyId: 'forms-form--full-integration' },
];

mkdirSync(OUT_DIR, { recursive: true });

const server = spawn('npx', ['http-server', 'storybook-static', '-p', String(PORT), '-s', '-c-1'], {
  cwd: STORYBOOK_DIR,
  stdio: 'ignore',
});

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

try {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  for (const { slug, storyId } of COMPONENTS) {
    await page.goto(
      `${BASE}/iframe.html?id=${encodeURIComponent(storyId)}&viewMode=story&globals=theme:light`,
      { waitUntil: 'domcontentloaded' },
    );
    await page.waitForSelector('#storybook-root', { state: 'attached', timeout: 15_000 });
    await page.waitForTimeout(500);
    await page.locator('#storybook-root').screenshot({ path: `${OUT_DIR}${slug}.png` });
    console.log(`captured ${slug}.png`);
  }
} finally {
  await browser.close();
  server.kill();
}

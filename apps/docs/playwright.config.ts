import { defineConfig } from '@playwright/test';

const EXPORT_URL = 'http://127.0.0.1:3300/holiveira-design-system/docs/';

export default defineConfig({
  testDir: './e2e',
  timeout: 120_000,
  fullyParallel: true,
  // Two workers keep peak RAM bounded on a shared 16 GB machine; CI already
  // runs two.
  workers: 2,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: EXPORT_URL,
    browserName: 'chromium',
    viewport: { width: 1440, height: 900 },
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node scripts/serve-export.mjs',
    url: EXPORT_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});

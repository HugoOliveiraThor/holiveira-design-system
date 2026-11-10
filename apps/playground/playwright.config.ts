import { defineConfig } from '@playwright/test';

const DEV_URL = 'http://127.0.0.1:3100/holiveira-design-system/playground/';
const EXPORT_URL = 'http://127.0.0.1:3200/holiveira-design-system/playground/';

export default defineConfig({
  testDir: './e2e',
  timeout: 120_000,
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  retries: process.env.CI ? 2 : 1,
  snapshotPathTemplate: '{testDir}/{testFilePath}-snapshots/{arg}-{platform}{ext}',
  expect: {
    timeout: 15_000,
    toHaveScreenshot: {
      animations: 'disabled',
      maxDiffPixelRatio: 0.001,
      threshold: 0.2,
    },
  },
  use: {
    browserName: 'chromium',
    viewport: { width: 1440, height: 900 },
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'dev',
      testMatch: /playground\.spec\.ts$/,
      use: { baseURL: DEV_URL },
    },
    {
      name: 'export',
      testMatch: /(?:export|visual)\.spec\.ts$/,
      retries: 0,
      use: { baseURL: EXPORT_URL },
    },
  ],
  webServer: [
    {
      command: 'pnpm exec next dev --port 3100',
      url: DEV_URL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: 'node scripts/serve-export.mjs',
      url: EXPORT_URL,
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
  ],
});

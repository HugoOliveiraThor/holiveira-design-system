import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './visual',
  timeout: 120_000,
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  retries: process.env.CI ? 2 : 1,
  use: {
    baseURL: 'http://localhost:6007',
    browserName: 'chromium',
    viewport: { width: 1280, height: 800 },
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npx http-server storybook-static -p 6007 -s -c-1',
    url: 'http://localhost:6007',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

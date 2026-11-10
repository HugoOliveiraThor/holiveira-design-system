import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

/** Waits for fonts and two frames, so the exported page is painted before the snapshot. */
async function waitForStablePage(page: Page) {
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
}

test('matches the dashboard forms and settings screenshots', async ({ page }) => {
  await page.goto('/playground/');
  await expect(page.getByRole('region', { name: 'Key metrics' })).toBeVisible();
  await expect(page.locator('.apexcharts-svg')).toHaveCount(2);
  await expect(page.locator('.apexcharts-svg').first()).toBeVisible();
  await waitForStablePage(page);
  await expect(page).toHaveScreenshot('dashboard.png');

  await page.goto('/playground/forms/');
  await expect(page.getByRole('heading', { name: 'Project intake' })).toBeVisible();
  await expect(page.getByLabel('Start date')).toBeVisible();
  await waitForStablePage(page);
  await expect(page).toHaveScreenshot('forms.png');

  await page.goto('/playground/settings/');
  await expect(page.getByRole('heading', { name: 'Color tokens' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Switch to dark' })).toBeVisible();
  await waitForStablePage(page);
  await expect(page).toHaveScreenshot('settings.png');
});

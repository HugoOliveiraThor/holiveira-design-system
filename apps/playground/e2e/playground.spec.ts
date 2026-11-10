import { expect, test } from '@playwright/test';

const ROUTES = [
  { path: '/playground/', heading: 'Dashboard' },
  { path: '/playground/forms/', heading: 'Forms' },
  { path: '/playground/settings/', heading: 'Settings' },
  { path: '/playground/login/', heading: 'Login' },
  { path: '/playground/orders/', heading: 'Orders' },
];

test('serves every route directly', async ({ page }) => {
  for (const route of ROUTES) {
    const response = await page.goto(route.path);
    expect(response?.status(), route.path).toBe(200);
    await expect(
      page.getByRole('heading', { level: 2, name: route.heading }).first(),
      route.path,
    ).toBeVisible();
  }
});

test('keeps the theme after reload', async ({ page }) => {
  await page.goto('/playground/settings/');
  await expect(page.locator('html')).toHaveClass(/light/);

  await page.getByRole('button', { name: 'Switch to dark' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);

  await page.reload();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.getByRole('button', { name: 'Switch to light' })).toBeVisible();
});

test('matches the dashboard forms and settings screenshots', async ({ page }) => {
  await page.goto('/playground/');
  await expect(page.getByRole('region', { name: 'Key metrics' })).toBeVisible();
  await expect(page.locator('.apexcharts-svg')).toHaveCount(2);
  await page.waitForTimeout(1_000);
  await expect(page).toHaveScreenshot('dashboard.png');

  await page.goto('/playground/forms/');
  await expect(page.getByRole('heading', { name: 'Project intake' })).toBeVisible();
  await expect(page).toHaveScreenshot('forms.png');

  await page.goto('/playground/settings/');
  await expect(page.getByRole('heading', { name: 'Color tokens' })).toBeVisible();
  await expect(page).toHaveScreenshot('settings.png');
});

test.describe('375px', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('opens the sidebar drawer at 375px', async ({ page }) => {
    await page.goto('/playground/');

    const sidebar = page.locator('aside[aria-label="Main navigation"]');
    await expect(sidebar).toHaveAttribute('aria-hidden', 'true');

    await page.getByRole('button', { name: 'Toggle Sidebar' }).click();

    await expect(sidebar).toHaveAttribute('aria-hidden', 'false');
    await expect(sidebar).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Sidebar' })).toBeVisible();
  });

  test('scrolls the table horizontally at 375px', async ({ page }) => {
    await page.goto('/playground/orders/');

    const table = page.getByRole('table', { name: 'Orders' });
    await expect(table).toBeVisible();
    const container = table.locator('..');

    const metrics = await container.evaluate((element) => ({
      clientWidth: element.clientWidth,
      overflowX: getComputedStyle(element).overflowX,
      scrollWidth: element.scrollWidth,
    }));

    expect(metrics.overflowX).toBe('auto');
    expect(metrics.scrollWidth).toBeGreaterThan(metrics.clientWidth);

    await container.evaluate((element) => {
      element.scrollLeft = element.scrollWidth;
    });
    expect(await container.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  });
});

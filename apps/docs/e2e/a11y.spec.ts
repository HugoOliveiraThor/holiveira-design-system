import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

async function axeViolations(page: import('@playwright/test').Page) {
  const results = await new AxeBuilder({ page }).analyze();
  return results.violations;
}

test('axe finds no violations on the landing page', async ({ page }) => {
  await page.goto('./');
  expect(await axeViolations(page)).toEqual([]);
});

test('axe finds no violations on a component stub', async ({ page }) => {
  await page.goto('./components/button/');
  expect(await axeViolations(page)).toEqual([]);
});

test('axe finds no violations in dark mode', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('ho-dev-docs-theme', 'dark'));
  await page.goto('./components/button/');
  await expect(page.locator('html')).toHaveClass(/dark/);
  expect(await axeViolations(page)).toEqual([]);
});

test('page exposes one main landmark', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('main')).toHaveCount(1);
});

test('sidebar links work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  await page.goto('./');
  await page.getByRole('link', { name: 'Browse packages' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Packages' })).toBeVisible();
  await context.close();
});

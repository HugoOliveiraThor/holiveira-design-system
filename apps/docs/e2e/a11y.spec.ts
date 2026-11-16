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

test('axe finds no violations on the landing page in dark mode', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('ho-dev-docs-theme', 'dark'));
  await page.goto('./');
  await expect(page.locator('html')).toHaveClass(/dark/);
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

test('keeps a visible focus indicator', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  const outline = await skip.evaluate((node) => {
    const style = getComputedStyle(node);
    return { width: style.outlineWidth, style: style.outlineStyle };
  });
  expect(outline.style).toBe('solid');
  expect(outline.width).not.toBe('0px');
});

test('sidebar links and pagination work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto('./packages/');
  await page
    .getByRole('navigation', { name: 'Documentation' })
    .getByRole('link', { name: '@ho-dev/tokens' })
    .click();
  await expect(page.getByRole('heading', { level: 1, name: '@ho-dev/tokens' })).toBeVisible();
  await page.getByRole('link', { name: /^Next:/ }).click();
  await expect(page.getByRole('heading', { level: 1, name: '@ho-dev/types' })).toBeVisible();
  await context.close();
});

import { expect, test } from '@playwright/test';

test('marks the active route in the sidebar', async ({ page }) => {
  await page.goto('./packages/primitives/');
  const current = page.locator('nav[aria-label="Documentation"] a[aria-current="page"]');
  await expect(current).toHaveCount(1);
  await expect(current).toHaveText('@ho-dev/primitives');
});

test('shows breadcrumbs from the root', async ({ page }) => {
  await page.goto('./packages/primitives/');
  const trail = page.getByRole('navigation', { name: 'Breadcrumb' });
  await expect(trail).toContainText('Home');
  await expect(trail).toContainText('Packages');
  await expect(trail).toContainText('@ho-dev/primitives');
});

test('moves between packages with previous and next', async ({ page }) => {
  await page.goto('./packages/primitives/');
  const next = page.getByRole('link', { name: /^Next:/ });
  await next.click();
  await expect(page).toHaveURL(/\/packages\/providers\/$/);
});

test('skip link moves focus to main', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await skip.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
});

test('renders unbuilt sections as disabled text', async ({ page }) => {
  await page.goto('./');
  const sidebar = page.getByRole('navigation', { name: 'Documentation' });
  await expect(sidebar.getByText('Design tokens')).toBeVisible();
  await expect(sidebar.getByRole('link', { name: 'Design tokens' })).toHaveCount(0);
});

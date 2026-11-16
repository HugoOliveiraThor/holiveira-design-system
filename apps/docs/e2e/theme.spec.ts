import { expect, test } from '@playwright/test';

test('theme choice survives a reload', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/dark/);
});

test('applies the stored theme before paint', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('ho-dev-docs-theme', 'dark'));
  await page.goto('./');
  await expect(page.locator('html')).toHaveClass(/dark/);
});

test('falls back to system for an invalid stored theme', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.addInitScript(() => localStorage.setItem('ho-dev-docs-theme', 'purple'));
  await page.goto('./');
  await expect(page.locator('html')).not.toHaveClass(/dark/);
});

test('disables transitions under reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  const duration = await page
    .getByRole('link', { name: 'Storybook' })
    .evaluate((node) => getComputedStyle(node).transitionDuration);
  expect(duration).toMatch(/0\.01ms|0s|1e-05s/);
});

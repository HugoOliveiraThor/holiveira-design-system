import { expect, test } from '@playwright/test';

test('defaults to the system theme and persists a change', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('./');
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.getByRole('button', { name: /switch to .* theme/i }).click();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
});

test('applies the stored theme before hydration', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('ho-dev-docs-theme', 'dark'));
  await page.route('**/*.js', (route) => route.abort());
  await page.goto('./', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).toHaveClass(/dark/);
});

test('falls back to system for an invalid stored theme', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('ho-dev-docs-theme', 'purple'));
  for (const scheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto('./');
    if (scheme === 'dark') {
      await expect(page.locator('html')).toHaveClass(/dark/);
    } else {
      await expect(page.locator('html')).not.toHaveClass(/dark/);
    }
  }
});

test('switches the theme from the toggle', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.getByRole('button', { name: /switch to .* theme/i }).click();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
});

test('disables transitions under reduced motion', async ({ page }) => {
  await page.goto('./');
  const toggle = page.getByRole('button', { name: /switch to .* theme/i });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const reduced = await toggle.evaluate((node) => getComputedStyle(node).transitionDuration);
  expect(reduced).toMatch(/0\.01ms|1e-05s/);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const normal = await toggle.evaluate((node) => getComputedStyle(node).transitionDuration);
  expect(normal).not.toMatch(/^0s$/);
  expect(normal).not.toBe(reduced);
});

test('loads the Satoshi variable on the document element', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('html')).toHaveClass(/font-satoshi/);
  const family = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
  expect(family.toLowerCase().trim().startsWith('satoshi'), family).toBe(true);
});

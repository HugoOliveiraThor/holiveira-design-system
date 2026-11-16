import { expect, test } from '@playwright/test';

test('slash opens search', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('/');
  await expect(page.getByRole('combobox')).toBeFocused();
});

test('filters by title and keywords', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('/');
  await page.getByRole('combobox').fill('butt');
  await expect(page.getByRole('status')).toHaveText('1 results');
  await expect(page.getByRole('option')).toContainText('Button');
});

test('arrow keys move the active option', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('/');
  const input = page.getByRole('combobox');
  await input.fill('a');
  await page.keyboard.press('ArrowDown');
  const options = page.getByRole('option');
  const count = await options.count();
  expect(count).toBeGreaterThan(1);
  await expect(input).toHaveAttribute('aria-activedescendant', /docs-search-option-/);
  const activeId = await input.getAttribute('aria-activedescendant');
  await expect(options.nth(1)).toHaveAttribute('id', activeId ?? '');
});

test('enter opens the active result', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('/');
  await page.getByRole('combobox').fill('button');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/components\/button\/$/);
});

test('escape closes search and restores focus', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('/');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('combobox')).toHaveCount(0);
  await expect(page.getByRole('button', { name: /search/i })).toBeFocused();
});

test('shows the no-results state', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('/');
  await page.getByRole('combobox').fill('zzzz');
  await expect(page.getByRole('status')).toHaveText('0 results');
  await expect(page.getByText(/no results/i)).toBeVisible();
  await expect(page.getByRole('link', { name: 'all packages' })).toBeVisible();
});

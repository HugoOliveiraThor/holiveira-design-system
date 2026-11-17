import { expect, test } from '@playwright/test';

import { openSearch } from './keyboard';

test('slash opens search', async ({ page }) => {
  await page.goto('./');
  await openSearch(page);
  await expect(page.getByRole('combobox')).toBeFocused();
});

test('command k opens search', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('ControlOrMeta+k');
  await expect(page.getByRole('combobox')).toBeFocused();
});

test('filters by title and keywords', async ({ page }) => {
  await page.goto('./');
  await openSearch(page);
  await page.getByRole('combobox').fill('butt');
  const options = page.getByRole('option');
  await expect(options).toHaveCount(3);
  await expect(options.nth(0)).toContainText('Button');
  await expect(options.nth(1)).toContainText('@ho-dev/primitives');
  await expect(options.nth(2)).toContainText('@ho-dev/ui');
});

test('arrow keys move the active option', async ({ page }) => {
  await page.goto('./');
  await openSearch(page);
  const input = page.getByRole('combobox');
  await input.fill('');
  const options = page.getByRole('option');
  const count = await options.count();
  expect(count).toBeGreaterThan(2);

  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  const afterDown = await input.getAttribute('aria-activedescendant');
  await expect(options.nth(2)).toHaveAttribute('id', afterDown ?? '');

  await page.keyboard.press('ArrowUp');
  const afterUp = await input.getAttribute('aria-activedescendant');
  await expect(options.nth(1)).toHaveAttribute('id', afterUp ?? '');
  await expect(options.nth(1)).toHaveAttribute('aria-selected', 'true');
});

test('enter opens the active result at the docs base path', async ({ page }) => {
  await page.goto('./');
  await openSearch(page);
  await page.keyboard.press('ArrowDown');
  const input = page.getByRole('combobox');
  const activeId = await input.getAttribute('aria-activedescendant');
  expect(activeId).toMatch(/^docs-search-option-/);
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(
    /\/holiveira-design-system\/docs\/(packages|components|getting-started|foundations|guides|architecture)(\/[a-z0-9-]+)*\/$/,
  );
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('escape closes search and restores focus', async ({ page }) => {
  await page.goto('./');
  await openSearch(page);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('combobox')).toHaveCount(0);
  await expect(page.getByRole('button', { name: /search/i })).toBeFocused();
});

test('shows the no-results state', async ({ page }) => {
  await page.goto('./');
  await openSearch(page);
  await page.getByRole('combobox').fill('zzzz');
  await expect(page.getByRole('status')).toHaveText('0 results');
  await expect(page.getByText(/no results/i)).toBeVisible();
  await expect(page.getByRole('link', { name: 'all packages' })).toHaveAttribute(
    'href',
    /\/holiveira-design-system\/docs\/packages\/$/,
  );
});

test('finds the theming guide and opens it', async ({ page }) => {
  await page.goto('./');
  await openSearch(page);
  const input = page.getByRole('combobox');
  await input.fill('theming');
  await expect(page.getByRole('status')).toHaveText('1 results');
  await expect(page.getByRole('option')).toContainText('Theming');
  await input.press('Enter');
  await expect(page).toHaveURL(/\/holiveira-design-system\/docs\/getting-started\/theming\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Theming');
});

import { expect, test } from '@playwright/test';

test('landing renders the hero and package groups', async ({ page }) => {
  await page.goto('./');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Holiveira Documentation Platform' }),
  ).toBeVisible();
  await expect(page.getByText(/pre-release/i).first()).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Foundation' })).toBeVisible();
});

test('header links to storybook, playground and the repository', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('link', { name: 'Storybook' })).toHaveAttribute('href', '/');
  await expect(page.getByRole('link', { name: 'Playground' })).toHaveAttribute(
    'href',
    '/playground/',
  );
  await expect(page.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', /github\.com/);
});

test('package index links every package', async ({ page }) => {
  await page.goto('./packages/');
  const links = page.locator('main a[href*="/packages/"]');
  await expect(links).toHaveCount(16);
});

test('package stub shows version, install state and exports', async ({ page }) => {
  await page.goto('./packages/primitives/');
  await expect(page.getByRole('heading', { level: 1, name: '@ho-dev/primitives' })).toBeVisible();
  await expect(page.locator('main').getByText(/0\.2\.\d+/)).toBeVisible();
  await expect(page.getByText('pre-release').first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Exports' })).toBeVisible();
});

test('component stub links to its package', async ({ page }) => {
  await page.goto('./components/button/');
  await expect(page.getByRole('heading', { level: 1, name: 'Button' })).toBeVisible();
  await expect(
    page.locator('main').getByRole('link', { name: '@ho-dev/primitives' }),
  ).toHaveAttribute('href', /\/packages\/primitives\//);
});

test('stub pages state they are not documented', async ({ page }) => {
  for (const path of ['./packages/tokens/', './components/button/']) {
    await page.goto(path);
    await expect(page.getByText('Not documented yet')).toBeVisible();
  }
});

test('stub pages make no completeness claim', async ({ page }) => {
  for (const path of ['./packages/tokens/', './components/button/']) {
    await page.goto(path);
    await expect(page.getByText('Complete documentation')).toHaveCount(0);
    await expect(page.getByText('available on npm')).toHaveCount(0);
  }
});

test('every catalogue link resolves', async ({ page, request }) => {
  await page.goto('./');
  const hrefs = await page
    .locator('main a[href*="/packages/"]')
    .evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).getAttribute('href') ?? ''),
    );
  const unique = [...new Set(hrefs)];
  expect(unique.length).toBeGreaterThan(0);
  for (const href of unique) {
    const response = await request.get(href);
    expect(response.status(), href).toBe(200);
  }
});

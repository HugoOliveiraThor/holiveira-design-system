import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from '@playwright/test';

const registry = JSON.parse(
  readFileSync(join(process.cwd(), 'src', 'generated', 'registry.json'), 'utf8'),
) as Array<{
  name: string;
  version: string;
  description: string;
  category: string;
  installState: string;
  exports: Array<{ name: string; kind: string }>;
}>;

const slugs = registry.map((record) => record.name.split('/')[1]);
const packagePath = (slug: string) => `packages/${slug}/`;

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
  await expect(page.getByRole('link', { name: 'Storybook' })).toHaveAttribute(
    'href',
    'https://hugoliveirathor.github.io/holiveira-design-system/',
  );
  await expect(page.getByRole('link', { name: 'Playground' })).toHaveAttribute(
    'href',
    'https://hugoliveirathor.github.io/holiveira-design-system/playground/',
  );
  await expect(page.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', /github\.com/);
});

test('serves the export under the docs base path', async ({ page }) => {
  await page.goto('./');
  expect(page.url()).toContain('/holiveira-design-system/docs/');
  const stylesheet = page.locator('link[rel="stylesheet"]').first();
  expect(await stylesheet.getAttribute('href')).toContain('/holiveira-design-system/docs/');
});

test('package index links every package', async ({ page }) => {
  await page.goto('./packages/');
  const hrefs = await page
    .locator('main a[href*="/packages/"]')
    .evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).getAttribute('href') ?? ''),
    );
  const linked = new Set(
    hrefs.map((href) => href.replace(/^.*\/packages\//, '').replace(/\/$/, '')),
  );
  expect([...linked].sort()).toEqual([...slugs].sort());
});

test('every package page names the package once', async ({ page }) => {
  for (const record of registry) {
    const slug = record.name.split('/')[1];
    await page.goto(`./${packagePath(slug)}`);
    const headings = page.getByRole('heading', { level: 1 });
    await expect(headings, slug).toHaveCount(1);
    await expect(headings.first(), slug).toHaveText(record.name);
  }
});

test('every package page renders the six sections in order', async ({ page }) => {
  for (const record of registry) {
    const slug = record.name.split('/')[1];
    await page.goto(`./${packagePath(slug)}`);
    const sections = await page
      .locator('main article > header, main article > section[id]')
      .evaluateAll((nodes) => nodes.map((node) => node.id || node.tagName.toLowerCase()));
    expect(sections, slug).toEqual([
      'header',
      'installation',
      'exports',
      'components',
      'related-pages',
      'related-packages',
    ]);
  }
});

test('no package page shows the not-documented notice', async ({ page }) => {
  for (const record of registry) {
    const slug = record.name.split('/')[1];
    await page.goto(`./${packagePath(slug)}`);
    const main = page.locator('main');
    await expect(main, slug).not.toContainText('Not documented yet');
    await expect(main, slug).not.toContainText('undocumented');
  }
});

test('every package page is indexable', async ({ page }) => {
  const base = test.info().project.use.baseURL as string;
  for (const record of registry) {
    const slug = record.name.split('/')[1];
    const response = await page.request.get(new URL(packagePath(slug), base).toString());
    expect(response.status(), slug).toBe(200);
    const html = await response.text();
    expect(html, slug).not.toMatch(/<meta[^>]+name=["']robots["'][^>]*noindex/i);
    expect(html, slug).not.toContain('content="noindex"');
  }
});

test('every package page shows its real install state', async ({ page }) => {
  for (const record of registry) {
    const slug = record.name.split('/')[1];
    await page.goto(`./${packagePath(slug)}`);
    const main = page.locator('main');
    await expect(main, slug).toContainText(record.version);
    await expect(main, slug).toContainText(record.installState);
    if (record.installState === 'pre-release') {
      await expect(main, slug).not.toContainText(`pnpm add ${record.name}`);
      await expect(main, slug).toContainText('workspace:*');
    }
  }
});

test('the package index links all sixteen packages', async ({ page }) => {
  await page.goto('./packages/');
  const hrefs = await page
    .locator('main a[href*="/packages/"]')
    .evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).getAttribute('href') ?? ''),
    );
  const linked = new Set(
    hrefs.map((href) => href.replace(/^.*\/packages\//, '').replace(/\/$/, '')),
  );
  expect(linked.size).toBe(16);
  expect([...linked].sort()).toEqual([...slugs].sort());
  const main = page.locator('main');
  await expect(main).not.toContainText('Not documented');
  await expect(main).not.toContainText('undocumented');
});

test('component page renders the contract', async ({ page }) => {
  await page.goto('./components/button/');
  await expect(page.getByRole('heading', { level: 1, name: 'Button' })).toBeVisible();
  for (const section of [
    'Description',
    'Installation',
    'Preview',
    'Variants and states',
    'Usage',
    'Props / API',
    'Accessibility',
    'Related components',
    'References',
  ]) {
    await expect(page.getByRole('heading', { level: 2, name: section })).toBeVisible();
  }
  await expect(page.getByText('Not documented yet')).toHaveCount(0);
});

test('every catalogue link resolves', async ({ page, request }) => {
  await page.goto('./');
  const hrefs = await page
    .locator('main a[href*="/packages/"]')
    .evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).getAttribute('href') ?? ''),
    );
  const unique = [...new Set(hrefs)].filter((href) => /\/packages\/[a-z0-9-]+\/$/.test(href));
  expect(unique).toHaveLength(16);
  for (const href of unique) {
    const response = await request.get(href);
    expect(response.status(), href).toBe(200);
  }
});

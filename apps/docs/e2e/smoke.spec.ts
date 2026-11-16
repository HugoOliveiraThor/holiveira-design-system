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
  exports: string[];
}>;

const api = JSON.parse(
  readFileSync(join(process.cwd(), 'src', 'generated', 'api.json'), 'utf8'),
) as Array<{ id: string; exportName: string; package: string; variants: Record<string, unknown> }>;

const slugs = registry.map((record) => record.name.split('/')[1]);
const stubPaths = [
  ...slugs.map((slug) => `packages/${slug}/`),
  ...api.map((record) => `components/${record.id}/`),
];

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

test('package stub shows version, install state and exports', async ({ page }) => {
  const record = registry.find((entry) => entry.name === '@ho-dev/primitives');
  expect(record).toBeDefined();
  await page.goto('./packages/primitives/');
  const main = page.locator('main');
  await expect(page.getByRole('heading', { level: 1, name: '@ho-dev/primitives' })).toBeVisible();
  await expect(main.getByText(record!.version, { exact: false })).toBeVisible();
  await expect(main.getByText(record!.installState, { exact: false }).first()).toBeVisible();
  await expect(main.getByText(record!.category, { exact: false }).first()).toBeVisible();
  await expect(main.getByText(record!.description)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Exports' })).toBeVisible();
  await expect(main.getByText(record!.exports[0], { exact: true })).toBeVisible();
});

test('component stub shows variants and prop count', async ({ page }) => {
  const record = api.find((entry) => entry.id === 'button');
  expect(record).toBeDefined();
  await page.goto('./components/button/');
  await expect(page.getByRole('heading', { level: 1, name: 'Button' })).toBeVisible();
  const main = page.locator('main');
  await expect(main.getByText(/\d+ props/)).toBeVisible();
  for (const variant of Object.keys(record!.variants)) {
    await expect(main.getByText(variant, { exact: true }).first()).toBeVisible();
  }
  await expect(main.getByRole('link', { name: record!.package })).toHaveAttribute(
    'href',
    /\/packages\/primitives\//,
  );
});

test('stub pages state they are not documented', async ({ page }) => {
  const base = test.info().project.use.baseURL as string;
  for (const path of stubPaths) {
    const response = await page.request.get(new URL(path, base).toString());
    expect(response.status(), path).toBe(200);
    expect(await response.text(), path).toContain('Not documented yet');
  }
});

test('stub pages make no completeness claim', async ({ page }) => {
  const base = test.info().project.use.baseURL as string;
  for (const path of stubPaths) {
    const body = await (await page.request.get(new URL(path, base).toString())).text();
    expect(body, path).not.toMatch(
      /complete documentation|fully documented|available on npm|\bpublished\b/i,
    );
  }
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

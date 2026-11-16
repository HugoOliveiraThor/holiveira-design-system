import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from '@playwright/test';

import { DOCS_BASE_PATH, docsSite } from '../site.config';

interface ExportRecord {
  name: string;
  kind: 'component' | 'hook' | 'function' | 'constant' | 'type';
}

interface ComponentExportRecord {
  id: string;
  exportName: string;
  sourceFile: string;
  story?: { id: string; title: string };
}

interface PackageRecord {
  name: string;
  version: string;
  category: string;
  installState: string;
  exports: ExportRecord[];
  componentExports: ComponentExportRecord[];
}

const registry = JSON.parse(
  readFileSync(join(process.cwd(), 'src', 'generated', 'registry.json'), 'utf8'),
) as PackageRecord[];

const slugOf = (name: string) => name.split('/')[1];
const packagePath = (record: PackageRecord) => `packages/${slugOf(record.name)}/`;

/** The six sections of the package contract, in the order the spec fixes. */
const CONTRACT = [
  'header',
  'installation',
  'exports',
  'components',
  'related-pages',
  'related-packages',
];

/** The derived kinds and the label the exports section gives each one. */
const KINDS = [
  { kind: 'component', label: 'Components' },
  { kind: 'hook', label: 'Hooks' },
  { kind: 'function', label: 'Functions' },
  { kind: 'constant', label: 'Constants' },
  { kind: 'type', label: 'Types' },
] as const;

function storybookHref(component: ComponentExportRecord): string {
  return component.story === undefined
    ? docsSite.storybookUrl
    : `${docsSite.storybookUrl}?path=/docs/${component.story.id}--docs`;
}

test.describe.configure({ mode: 'serial' });

test('every package page names the package once', async ({ page }) => {
  for (const record of registry) {
    await page.goto(packagePath(record));
    const headings = page.getByRole('heading', { level: 1 });
    await expect(headings, record.name).toHaveCount(1);
    await expect(headings, record.name).toHaveText(record.name);
  }
});

test('every package page renders the six sections in order', async ({ page }) => {
  for (const record of registry) {
    await page.goto(packagePath(record));
    const sections = await page
      .locator('main article > header, main article > section[id]')
      .evaluateAll((nodes) => nodes.map((node) => node.id || node.tagName.toLowerCase()));
    expect(sections, record.name).toEqual(CONTRACT);
  }
});

test('no package page shows the not-documented notice', async ({ page }) => {
  for (const record of registry) {
    await page.goto(packagePath(record));
    const main = page.locator('main');
    await expect(main, record.name).not.toContainText('Not documented yet');
    await expect(main, record.name).not.toContainText('undocumented');
  }
});

test('every package page is indexable', async ({ page }) => {
  const base = test.info().project.use.baseURL as string;
  for (const record of registry) {
    const response = await page.request.get(new URL(packagePath(record), base).toString());
    expect(response.status(), record.name).toBe(200);
    const html = await response.text();
    expect(html, record.name).not.toMatch(/<meta[^>]+name=["']robots["'][^>]*noindex/i);
    expect(html, record.name).not.toContain('content="noindex"');
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
  expect([...linked].sort()).toEqual(registry.map((record) => slugOf(record.name)).sort());
  const main = page.locator('main');
  await expect(main).not.toContainText('Not documented');
  await expect(main).not.toContainText('undocumented');
});

test('every package page groups its exports by kind', async ({ page }) => {
  for (const record of registry) {
    await page.goto(packagePath(record));
    const present = KINDS.filter((entry) =>
      record.exports.some((exported) => exported.kind === entry.kind),
    );
    const groups = page.locator('#exports > div > div');
    await expect(groups, record.name).toHaveCount(present.length);
    for (const [index, entry] of present.entries()) {
      const group = groups.nth(index);
      await expect(group.locator('h3'), record.name).toHaveText(entry.label);
      const names = await group.locator('code').allTextContents();
      expect(names.sort(), record.name).toEqual(
        record.exports
          .filter((exported) => exported.kind === entry.kind)
          .map((exported) => exported.name)
          .sort(),
      );
    }
  }
});

test('every component export carries its inventory anchor', async ({ page }) => {
  for (const record of registry) {
    await page.goto(packagePath(record));
    if (record.componentExports.length === 0) {
      await expect(page.locator('#components'), record.name).toContainText(
        'This package exports no components.',
      );
      continue;
    }
    for (const component of record.componentExports) {
      const row = page.locator(`#components li[id="${component.id}"]`);
      await expect(row, `${record.name}/${component.id}`).toHaveCount(1);
      await expect(row, `${record.name}/${component.id}`).toContainText(component.exportName);
      await expect(row, `${record.name}/${component.id}`).toContainText(component.sourceFile);
    }
  }
});

test('every component story links, or the package fallback', async ({ page }) => {
  for (const record of registry) {
    await page.goto(packagePath(record));
    for (const component of record.componentExports) {
      const row = page.locator(`#components li[id="${component.id}"]`);
      const link = row.locator('a');
      await expect(link, `${record.name}/${component.id}`).toHaveCount(1);
      await expect(link, `${record.name}/${component.id}`).toHaveAttribute(
        'href',
        storybookHref(component),
      );
      await expect(link, `${record.name}/${component.id}`).toHaveText(
        component.story === undefined ? 'Storybook (package root)' : 'Storybook story',
      );
    }
  }
});

test('every package header links its readme, contract and storybook', async ({ page }) => {
  const repository = docsSite.repositoryUrl;
  for (const record of registry) {
    await page.goto(packagePath(record));
    const dir = slugOf(record.name);
    const links = page.getByRole('navigation', { name: 'Package links' });
    await expect(links.getByRole('link', { name: 'README' }), record.name).toHaveAttribute(
      'href',
      `${repository}/blob/main/packages/${dir}/README.md`,
    );
    await expect(links.getByRole('link', { name: 'Contract' }), record.name).toHaveAttribute(
      'href',
      `${repository}/blob/main/docs/architecture/contracts/${dir}.md`,
    );
    await expect(links.getByRole('link', { name: 'Storybook' }), record.name).toHaveAttribute(
      'href',
      docsSite.storybookUrl,
    );
  }
});

test('the package page lists related guides', async ({ page }) => {
  const origin = new URL(test.info().project.use.baseURL as string).origin;
  await page.goto(packagePath(registry.find((record) => record.name === '@ho-dev/theme')!));
  const related = page.locator('#related-pages');
  await expect(related.getByRole('link', { name: 'Theming' })).toHaveAttribute(
    'href',
    `${DOCS_BASE_PATH}/getting-started/theming/`,
  );
  await expect(related.getByRole('link', { name: 'Design tokens' })).toHaveAttribute(
    'href',
    `${DOCS_BASE_PATH}/foundations/tokens/`,
  );

  await page.goto(packagePath(registry.find((record) => record.name === '@ho-dev/config')!));
  await expect(page.locator('#related-pages')).toContainText('No related pages.');

  await page.goto(packagePath(registry.find((record) => record.name === '@ho-dev/theme')!));
  const hrefs = await page
    .locator('#related-pages a')
    .evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).getAttribute('href') ?? ''),
    );
  for (const href of hrefs) {
    expect(href, href).toMatch(new RegExp(`^${DOCS_BASE_PATH}/`));
    expect((await page.request.get(`${origin}${href}`)).status(), href).toBe(200);
  }
});

test('the package page lists same-category packages', async ({ page }) => {
  for (const record of registry) {
    await page.goto(packagePath(record));
    const expected = registry
      .filter((entry) => entry.category === record.category && entry.name !== record.name)
      .map((entry) => entry.name)
      .sort();
    const labels = await page.locator('#related-packages a').allTextContents();
    expect(labels.sort(), record.name).toEqual(expected);
    const hrefs = await page
      .locator('#related-packages a')
      .evaluateAll((links) =>
        links.map((link) => (link as HTMLAnchorElement).getAttribute('href') ?? ''),
      );
    expect(hrefs.sort(), record.name).toEqual(
      expected.map((name) => `${DOCS_BASE_PATH}/packages/${slugOf(name)}/`).sort(),
    );
  }
});

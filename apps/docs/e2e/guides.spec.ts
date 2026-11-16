import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from '@playwright/test';

import { DOCS_BASE_PATH } from '../site.config';

import { axeViolations } from './axe';

interface GuideRoute {
  route: string;
  title: string;
  section: 'Getting Started' | 'Foundations' | 'Guides' | 'Architecture';
}

/** The twelve guide routes ADS-011 fixes, with the section each one belongs to. */
const GUIDES: GuideRoute[] = [
  { route: 'getting-started', title: 'Getting started', section: 'Getting Started' },
  { route: 'getting-started/installation', title: 'Installation', section: 'Getting Started' },
  { route: 'getting-started/theming', title: 'Theming', section: 'Getting Started' },
  { route: 'foundations/tokens', title: 'Design tokens', section: 'Foundations' },
  { route: 'foundations/styling', title: 'Styling and Tailwind', section: 'Foundations' },
  { route: 'foundations/accessibility', title: 'Accessibility', section: 'Foundations' },
  { route: 'guides/providers', title: 'Provider composition', section: 'Guides' },
  { route: 'guides/forms', title: 'Forms and validation', section: 'Guides' },
  { route: 'guides/charts', title: 'Charts', section: 'Guides' },
  { route: 'guides/layouts', title: 'Application layouts', section: 'Guides' },
  { route: 'guides/icons', title: 'Icons', section: 'Guides' },
  { route: 'architecture', title: 'Architecture', section: 'Architecture' },
];

const registry = JSON.parse(
  readFileSync(join(process.cwd(), 'src', 'generated', 'registry.json'), 'utf8'),
) as Array<{ name: string }>;

const packageSlugs = registry.map((record) => record.name.split('/')[1]);

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** The browser URL a route resolves to under the docs base path. */
function routePattern(route: string): RegExp {
  return new RegExp(`${escapeRegExp(DOCS_BASE_PATH)}/${route}/$`);
}

function routeUrl(route: string): string {
  const base = test.info().project.use.baseURL as string;
  return new URL(`${route}/`, base).toString();
}

test.describe.configure({ mode: 'serial' });

test('every guide page names the guide once', async ({ page }) => {
  for (const guide of GUIDES) {
    await page.goto(`./${guide.route}/`);
    const headings = page.getByRole('heading', { level: 1 });
    await expect(headings, guide.route).toHaveCount(1);
    await expect(headings, guide.route).toHaveText(guide.title);
  }
});

test('serves the twelve guide routes', async ({ page }) => {
  for (const guide of GUIDES) {
    const response = await page.goto(`./${guide.route}/`);
    expect(response?.status(), guide.route).toBe(200);
    await expect(page).toHaveURL(routePattern(guide.route));
    await expect(page.getByRole('heading', { level: 1, name: guide.title })).toBeVisible();
  }
});

test('every guide renders its summary, sections, snippet and links', async ({ page }) => {
  for (const guide of GUIDES) {
    await page.goto(`./${guide.route}/`);
    const summary = page.locator('main article > header p');
    await expect(summary, guide.route).toHaveCount(1);
    expect((await summary.textContent())?.trim().length ?? 0, guide.route).toBeGreaterThan(40);

    const ids = await page
      .locator('main article section[id]')
      .evaluateAll((nodes) => nodes.map((node) => node.id));
    expect(ids, guide.route).toContain('snippets');
    expect(ids, guide.route).toContain('related-links');
    expect(ids.at(-1), guide.route).toBe('related-links');
    expect(ids.indexOf('snippets'), guide.route).toBeGreaterThan(0);

    const firstSection = page.locator('main article section[id]').first();
    await expect(firstSection.locator('h2'), guide.route).toBeVisible();
    await expect(firstSection.locator('p').first(), guide.route).not.toBeEmpty();

    const code = page.locator('[data-code-block] pre > code').first();
    await expect(code, guide.route).toBeVisible();
    await expect(code, guide.route).not.toBeEmpty();

    await expect(page.locator('#related-links h2'), guide.route).toHaveText('Related');
    expect(Number(await page.locator('#related-links a').count()), guide.route).toBeGreaterThan(0);
  }
});

test('the theming guide documents the theme provider and dark class', async ({ page }) => {
  await page.goto('./getting-started/theming/');
  const main = page.locator('main');
  await expect(main).toContainText('ThemeProvider');
  await expect(main).toContainText('next-themes');
  await expect(main).toContainText('.dark');
  await expect(
    page.getByRole('heading', { level: 2, name: 'The .dark class contract' }),
  ).toBeVisible();
  await expect(page.locator('[data-code-block] pre > code').first()).toContainText('@ho-dev/theme');
});

test('every guide route exists in the static export', async ({ page }) => {
  for (const guide of GUIDES) {
    const response = await page.request.get(routeUrl(guide.route));
    expect(response.status(), guide.route).toBe(200);
    const html = await response.text();
    expect(html, guide.route).toContain('<!DOCTYPE html>');
    expect(html, guide.route).toContain(guide.title);
    expect(html, guide.route).toMatch(/<h1[^>]*>/);
  }
});

test('every guide page passes axe in light and dark', async ({ page }) => {
  for (const guide of GUIDES) {
    await page.goto(`./${guide.route}/`);
    expect(await axeViolations(page), `${guide.route} light`).toEqual([]);
  }

  await page.addInitScript(() => localStorage.setItem('ho-dev-docs-theme', 'dark'));
  for (const guide of GUIDES) {
    await page.goto(`./${guide.route}/`);
    await expect(page.locator('html'), guide.route).toHaveClass(/dark/);
    expect(await axeViolations(page), `${guide.route} dark`).toEqual([]);
  }
});

test('every guide fits at 375px without horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const guide of GUIDES) {
    await page.goto(`./${guide.route}/`);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    const offenders = await page.evaluate(() => {
      const width = document.documentElement.clientWidth;
      return [...document.querySelectorAll('*')]
        .filter((element) => element.getBoundingClientRect().right > width + 1)
        .slice(0, 6)
        .map((element) => `${element.tagName}.${String(element.className).slice(0, 80)}`);
    });
    expect(overflow, `${guide.route} :: ${offenders.join(' | ')}`).toBeLessThanOrEqual(0);
  }
});

test('the sidebar links every guide', async ({ page }) => {
  await page.goto('./');
  const sidebar = page.getByRole('navigation', { name: 'Documentation' });
  await expect(sidebar.locator('[aria-disabled="true"]')).toHaveCount(0);
  for (const guide of GUIDES) {
    await expect(
      sidebar.locator(`a[href="${DOCS_BASE_PATH}/${guide.route}/"]`),
      guide.route,
    ).toHaveCount(1);
  }
});

test('guide breadcrumbs name the section and the guide', async ({ page }) => {
  for (const guide of GUIDES) {
    await page.goto(`./${guide.route}/`);
    const trail = page.getByRole('navigation', { name: 'Breadcrumb trail' });
    await expect(trail.locator('li'), guide.route).toHaveCount(3);
    await expect(trail.getByRole('link', { name: 'Home' }), guide.route).toHaveAttribute(
      'href',
      `${DOCS_BASE_PATH}/`,
    );
    await expect(trail, guide.route).toContainText(guide.section);
    const current = trail.locator('[aria-current="page"]');
    await expect(current, guide.route).toHaveCount(1);
    await expect(current, guide.route).toHaveText(guide.title);
  }
});

test('a guide search result opens the guide', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('/');
  const input = page.getByRole('combobox');
  await input.fill('theming');
  await expect(page.getByRole('status')).toHaveText('1 results');
  await expect(page.getByRole('option')).toContainText('Theming');
  await input.press('Enter');
  await expect(page).toHaveURL(routePattern('getting-started/theming'));
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Theming');
});

test('the pager moves between guides', async ({ page }) => {
  await page.goto('./getting-started/theming/');
  await page.getByRole('link', { name: 'Previous: Installation' }).click();
  await expect(page).toHaveURL(routePattern('getting-started/installation'));
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Installation');

  await page.goto('./getting-started/theming/');
  await page.getByRole('link', { name: 'Next: Design tokens' }).click();
  await expect(page).toHaveURL(routePattern('foundations/tokens'));
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Design tokens');

  await page.goto('./getting-started/');
  await expect(page.getByRole('link', { name: /^Previous:/ })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Next: Installation' })).toBeVisible();

  await page.goto('./architecture/');
  await expect(page.getByRole('link', { name: /^Next:/ })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Previous: Icons' })).toBeVisible();
});

test('the guide lists related packages and components', async ({ page }) => {
  const origin = new URL(test.info().project.use.baseURL as string).origin;
  await page.goto('./getting-started/theming/');
  const related = page.locator('#related-links');
  await expect(related.getByRole('link', { name: '@ho-dev/theme' })).toHaveAttribute(
    'href',
    `${DOCS_BASE_PATH}/packages/theme/`,
  );
  await expect(related.getByRole('link', { name: '@ho-dev/tokens' })).toHaveAttribute(
    'href',
    `${DOCS_BASE_PATH}/packages/tokens/`,
  );
  await expect(related.getByRole('link', { name: 'Button' })).toHaveAttribute(
    'href',
    `${DOCS_BASE_PATH}/components/button/`,
  );

  const hrefs = await related
    .locator('a')
    .evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).getAttribute('href') ?? ''),
    );
  for (const href of hrefs) {
    expect(href, href).toMatch(new RegExp(`^${escapeRegExp(DOCS_BASE_PATH)}/`));
    expect((await page.request.get(`${origin}${href.split('#')[0]}`)).status(), href).toBe(200);
  }
});

test('every internal link resolves under the docs base path', async ({ page }) => {
  const origin = new URL(test.info().project.use.baseURL as string).origin;
  const pages = [
    ...GUIDES.map((guide) => `${guide.route}/`),
    ...packageSlugs.map((slug) => `packages/${slug}/`),
  ];

  for (const path of pages) {
    await page.goto(`./${path}`);
    const hrefs = [
      ...new Set(
        await page
          .locator('main article a[href^="/"]')
          .evaluateAll((links) =>
            links.map((link) => (link as HTMLAnchorElement).getAttribute('href') ?? ''),
          ),
      ),
    ];
    expect(hrefs.length, path).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href, `${path} -> ${href}`).toMatch(new RegExp(`^${escapeRegExp(DOCS_BASE_PATH)}/`));
      const [target, fragment] = href.split('#');
      const response = await page.request.get(`${origin}${target}`);
      expect(response.status(), `${path} -> ${href}`).toBe(200);
      if (fragment !== undefined) {
        expect(await response.text(), `${path} -> ${href}`).toContain(`id="${fragment}"`);
      }
    }
  }
});

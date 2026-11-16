import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

const api = JSON.parse(
  readFileSync(join(process.cwd(), 'src', 'generated', 'api.json'), 'utf8'),
) as Array<{ id: string; exportName: string; package: string }>;

const examples = JSON.parse(
  readFileSync(join(process.cwd(), 'src', 'generated', 'examples.json'), 'utf8'),
) as Array<{ id: string; kind: 'minimal' | 'realistic'; source: string }>;

const LABELS = { minimal: 'Minimal example', realistic: 'Realistic example' } as const;

function pathFor(id: string): string {
  return `./components/${id}/`;
}

function exampleSource(id: string, kind: 'minimal' | 'realistic'): string {
  const record = examples.find((entry) => entry.id === id && entry.kind === kind);
  if (record === undefined) throw new Error(`missing example ${id}/${kind}`);
  return record.source;
}

/** What the real component renders, inside the preview frame only. */
const REAL_RENDER: Record<string, (frame: Locator) => Promise<void>> = {
  button: async (frame) => {
    await expect(frame.getByRole('button', { name: 'Publish release' })).toBeVisible();
  },
  alert: async (frame) => {
    await expect(frame.getByRole('alert').first()).toBeVisible();
    await expect(frame.getByText('Import finished')).toBeVisible();
  },
  badge: async (frame) => {
    await expect(frame.getByText('Paid', { exact: true })).toBeVisible();
    await expect(frame.getByText('Refunded', { exact: true })).toBeVisible();
  },
  'input-group': async (frame) => {
    await expect(frame.getByPlaceholder('Order number or email')).toBeVisible();
    await expect(frame.getByText('Work email')).toBeVisible();
  },
  table: async (frame) => {
    await expect(frame.locator('table')).toBeVisible();
    await expect(frame.getByText('ORD-1042')).toBeVisible();
  },
  dropdown: async (frame) => {
    await expect(frame.getByRole('button', { name: 'Order actions' })).toBeVisible();
  },
  card: async (frame) => {
    await expect(frame.getByText('Open orders')).toBeVisible();
    await expect(frame.getByText('$48.2k')).toBeVisible();
  },
  'page-header': async (frame) => {
    await expect(frame.getByRole('heading', { name: 'Open orders' })).toBeVisible();
    await expect(frame.getByRole('navigation', { name: 'Breadcrumb' })).toBeVisible();
  },
  form: async (frame) => {
    await expect(frame.locator('form')).toBeVisible();
    await expect(frame.getByRole('button', { name: 'Save profile' })).toBeVisible();
  },
  field: async (frame) => {
    await expect(frame.getByPlaceholder('Acme Corp')).toBeVisible();
    await expect(frame.getByText('Company name')).toBeVisible();
  },
  'area-chart': async (frame) => {
    await expect(frame.locator('[role="img"][aria-label*="Revenue by week"]')).toBeVisible({
      timeout: 20_000,
    });
  },
  sidebar: async (frame) => {
    await expect(frame.locator('aside[aria-label="Main navigation"]')).toBeVisible();
    await expect(frame.getByRole('link', { name: 'Customers' })).toBeVisible();
  },
  header: async (frame) => {
    await expect(frame.locator('header')).toBeVisible();
    await expect(frame.getByText('jane@acme.com')).toBeVisible();
  },
};

test.describe.configure({ mode: 'serial' });

test('every component page names the component once', async ({ page }) => {
  for (const record of api) {
    await page.goto(pathFor(record.id));
    const headings = page.getByRole('heading', { level: 1 });
    await expect(headings, record.id).toHaveCount(1);
    await expect(headings, record.id).toHaveText(record.exportName);
  }
});

test('every component page drops the not-documented notice', async ({ page }) => {
  for (const record of api) {
    await page.goto(pathFor(record.id));
    await expect(page.locator('main'), record.id).not.toContainText('Not documented yet');
  }
});

test('every component page is indexable', async ({ page }) => {
  const base = test.info().project.use.baseURL as string;
  for (const record of api) {
    const response = await page.request.get(new URL(pathFor(record.id), base).toString());
    expect(response.status(), record.id).toBe(200);
    const html = await response.text();
    expect(html, record.id).not.toMatch(/name="robots"[^>]*noindex/);
  }
});

test('every preview renders the real component', async ({ page }) => {
  for (const record of api) {
    const check = REAL_RENDER[record.id];
    expect(check, `no render check for ${record.id}`).toBeDefined();
    await page.goto(pathFor(record.id));
    const frame = page.locator('[data-preview-frame]');
    await expect(frame, record.id).toBeVisible();
    await check!(frame);
  }
});

test('every code block matches its generated source', async ({ page }) => {
  for (const record of api) {
    await page.goto(pathFor(record.id));
    for (const kind of ['minimal', 'realistic'] as const) {
      const source = exampleSource(record.id, kind);
      const block = page
        .locator('[data-code-block]')
        .filter({ has: page.locator('figcaption', { hasText: LABELS[kind] }) });
      await expect(block, `${record.id}/${kind}`).toHaveCount(1);
      await expect(block.locator('pre > code'), `${record.id}/${kind}`).toHaveText(source);
    }
    await expect(page.locator('[data-preview-frame]'), record.id).toHaveAttribute(
      'data-example',
      `${record.id}/realistic`,
    );
  }
});

test('the toolbar applies the selected viewport width', async ({ page }) => {
  await page.goto(pathFor('button'));
  const frame = page.locator('[data-preview-frame]');
  await page.getByRole('button', { name: '375', exact: true }).click();
  await expect(frame).toHaveCSS('width', '375px');
  await page.getByRole('button', { name: '768', exact: true }).click();
  await expect(frame).toHaveCSS('width', '768px');
  await page.getByRole('button', { name: 'Full', exact: true }).click();
  const width = await frame.evaluate((element) => element.getBoundingClientRect().width);
  expect(width).toBeGreaterThan(768);
});

test('the toolbar switches the page theme', async ({ page }) => {
  await page.goto(pathFor('button'));
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.evaluate(() => {
    Object.defineProperty(window, '__stable', { value: true, configurable: true });
  });

  await page.getByRole('button', { name: 'system', exact: true }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);

  await page.getByRole('button', { name: 'light', exact: true }).click();
  await expect(page.locator('html')).not.toHaveClass(/dark/);

  await page.getByRole('button', { name: 'dark', exact: true }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);

  expect(await page.evaluate(() => Object.prototype.hasOwnProperty.call(window, '__stable'))).toBe(
    true,
  );
});

test('the layout previews render inside a bounded frame', async ({ page }) => {
  for (const id of ['sidebar', 'header']) {
    await page.goto(pathFor(id));
    const frame = page.locator('[data-preview-frame]');
    const box = await frame.boundingBox();
    expect(box, id).not.toBeNull();
    expect(box!.height, id).toBeLessThan(600);
    const inner = id === 'sidebar' ? frame.locator('aside') : frame.locator('header');
    await expect(inner, id).toBeVisible();
    const innerBox = await inner.boundingBox();
    expect(innerBox!.width, id).toBeLessThanOrEqual(box!.width + 1);
  }
});

test('the component index renders no preview', async ({ page }) => {
  await page.goto('./components/');
  await expect(page.locator('[data-preview]')).toHaveCount(0);
  await expect(page.locator('[data-preview-frame]')).toHaveCount(0);
});

test('the area chart shows a placeholder before the chart', async ({ page }) => {
  const base = test.info().project.use.baseURL as string;
  const html = await (
    await page.request.get(new URL(pathFor('area-chart'), base).toString())
  ).text();
  expect(html).toContain('Chart loading');

  await page.goto(pathFor('area-chart'));
  await expect(page.locator('[role="img"][aria-label*="Revenue by week"]')).toBeVisible({
    timeout: 20_000,
  });
  await expect(page.locator('[aria-label="Chart loading"]')).toHaveCount(0);
});

test('the page fits at 390px without horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const id of ['table', 'button']) {
    await page.goto(pathFor(id));
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
    expect(overflow, `${id} :: ${offenders.join(' | ')}`).toBeLessThanOrEqual(0);
  }
});

test('pages render without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(pathFor('table'));
  await expect(page.getByRole('heading', { level: 1, name: 'Table' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Description' })).toBeVisible();
  await expect(page.getByText(/Displays rows of comparable data/)).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Installation' })).toBeVisible();
  await expect(page.getByText('@ho-dev/primitives').first()).toBeVisible();
  await expect(page.getByText(/pre-release/).first()).toBeVisible();
  await expect(page.getByText('Peer dependencies')).toBeVisible();
  await expect(page.getByText('react').first()).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Props / API' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'aria-label' })).toBeVisible();
  await expect(page.locator('[data-code-block] pre > code').first()).toBeVisible();
  await expect(page.locator('[data-code-block] pre > code').first()).not.toBeEmpty();
  await context.close();
});

test('every internal link resolves under the docs base path', async ({ page }) => {
  const origin = new URL(test.info().project.use.baseURL as string).origin;
  for (const record of api) {
    await page.goto(pathFor(record.id));
    const links = [
      page.locator('article > header a[href*="/packages/"]').first(),
      page.locator('#references').getByRole('link', { name: 'Package page' }),
      page.locator('#related a').first(),
    ];
    for (const [index, link] of links.entries()) {
      const href = await link.getAttribute('href');
      expect(href, `${record.id} link ${index}`).toMatch(/^\/holiveira-design-system\/docs\//);
      const response = await page.request.get(`${origin}${href}`);
      expect(response.status(), `${record.id} link ${index} -> ${href}`).toBe(200);
    }
  }
});

test('the button page lists the real variants and their defaults', async ({ page }) => {
  await page.goto(pathFor('button'));
  const variants = page.locator('#variants');
  await expect(variants).toContainText(
    'primary, green, dark, outlinePrimary, outlineGreen, outline',
  );
  await expect(variants).toContainText('sm, md');
  await expect(variants).toContainText('default, rounded');
  const variantRow = variants.locator('tbody tr').filter({ hasText: /^variant/ });
  await expect(variantRow).toHaveCount(1);
  await expect(variantRow).toContainText('primary');
});

test('the button page lists the generated props', async ({ page }) => {
  await page.goto(pathFor('button'));
  const api = page.locator('#api');
  const ownTable = api.locator('table').first();
  const labelRow = ownTable.locator('tbody tr').filter({ hasText: /^label/ });
  await expect(labelRow).toHaveCount(1);
  await expect(labelRow).toContainText('string');
  await expect(labelRow).toContainText('No');
  const iconRow = ownTable.locator('tbody tr').filter({ hasText: /^icon/ });
  await expect(iconRow).toContainText('ReactNode');
  const details = api.locator('details');
  await expect(details).not.toHaveAttribute('open');
  await expect(details).toContainText('onClick');
});

test('the preview follows a theme change', async ({ page }: { page: Page }) => {
  await page.goto(pathFor('alert'));
  const alert = page.locator('[data-preview-frame] [role="alert"]').first();
  const before = await alert.evaluate((element) => getComputedStyle(element).backgroundColor);
  await page.getByRole('button', { name: 'dark', exact: true }).click();
  await expect(alert).toBeVisible();
  const after = await alert.evaluate((element) => getComputedStyle(element).backgroundColor);
  expect(after).not.toBe(before);
});

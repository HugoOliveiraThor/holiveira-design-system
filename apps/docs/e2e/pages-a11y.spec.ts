import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from '@playwright/test';

import { axeViolations } from './axe';

const api = JSON.parse(
  readFileSync(join(process.cwd(), 'src', 'generated', 'api.json'), 'utf8'),
) as Array<{ id: string; exportName: string }>;

async function focusedControl(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const element = document.activeElement as HTMLElement | null;
    if (element === null) return null;
    const style = getComputedStyle(element);
    return {
      name:
        element.getAttribute('aria-label') ??
        element.textContent?.trim().slice(0, 80) ??
        element.tagName,
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
    };
  });
}

test('every component page passes axe in light', async ({ page }) => {
  for (const record of api) {
    await page.goto(`./components/${record.id}/`);
    expect(await axeViolations(page), record.id).toEqual([]);
  }
});

test('every component page passes axe in dark', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('ho-dev-docs-theme', 'dark'));
  for (const record of api) {
    await page.goto(`./components/${record.id}/`);
    await expect(page.locator('html'), record.id).toHaveClass(/dark/);
    expect(await axeViolations(page), record.id).toEqual([]);
  }
});

test('preview controls and copy buttons are keyboard reachable', async ({ page }) => {
  await page.goto('./components/button/');

  const expected = ['Full', '375', '768', 'system', 'light', 'dark'];
  const reached: string[] = [];
  for (let step = 0; step < 200 && reached.length < expected.length; step += 1) {
    await page.keyboard.press('Tab');
    const focused = await focusedControl(page);
    if (focused === null) continue;
    const name = focused.name;
    if (expected.includes(name) && !reached.includes(name)) {
      reached.push(name);
      expect(focused.outlineStyle, name).toBe('solid');
      expect(focused.outlineWidth, name).not.toBe('0px');
    }
  }
  expect(reached).toEqual(expected);

  const reachedCopy: string[] = [];
  for (let step = 0; step < 40 && reachedCopy.length < 2; step += 1) {
    await page.keyboard.press('Tab');
    const focused = await focusedControl(page);
    if (focused === null) continue;
    if (/^Copy (Minimal|Realistic) example for Button$/.test(focused.name)) {
      reachedCopy.push(focused.name);
      expect(focused.outlineStyle, focused.name).toBe('solid');
      expect(focused.outlineWidth, focused.name).not.toBe('0px');
    }
  }
  expect(reachedCopy).toEqual([
    'Copy Minimal example for Button',
    'Copy Realistic example for Button',
  ]);
});

test('the dropdown opens with the keyboard and closes with escape', async ({ page }) => {
  await page.goto('./components/dropdown/');
  const frame = page.locator('[data-preview-frame]');
  const trigger = frame.getByRole('button', { name: 'Order actions' });
  const menu = frame.getByRole('menu');

  for (const key of ['Enter', 'Space']) {
    await trigger.focus();
    await expect(trigger).toBeFocused();
    await page.keyboard.press(key);

    await expect(menu, key).toBeVisible();
    await expect(menu.getByText('Open order'), key).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(menu, key).toBeHidden();
    await expect(trigger, key).toBeFocused();
  }
});

/** The four page types the redesign touches, each with a route and a specimen. */
const PAGE_TYPES = [
  { name: 'landing', path: './', specimen: '' },
  { name: 'component', path: './components/button/', specimen: 'Button' },
  { name: 'package', path: './packages/primitives/', specimen: '@ho-dev/primitives' },
  { name: 'guide', path: './getting-started/theming/', specimen: 'Theming' },
] as const;

test('axe passes on every page type in both themes', async ({ page }) => {
  for (const pageType of PAGE_TYPES) {
    await page.goto(pageType.path);
    await expect(page.locator('html'), `${pageType.name} light`).not.toHaveClass(/dark/);
    if (pageType.specimen !== '') {
      expect(await page.getByRole('heading', { level: 1 }).textContent(), pageType.name).toContain(
        pageType.specimen,
      );
    }
    expect(await axeViolations(page), `${pageType.name} light`).toEqual([]);
  }

  await page.addInitScript(() => localStorage.setItem('ho-dev-docs-theme', 'dark'));
  for (const pageType of PAGE_TYPES) {
    await page.goto(pageType.path);
    await expect(page.locator('html'), `${pageType.name} dark`).toHaveClass(/dark/);
    expect(await axeViolations(page), `${pageType.name} dark`).toEqual([]);
  }
});

test('no page scrolls sideways at 390', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const pageType of PAGE_TYPES) {
    await page.goto(pageType.path);
    const measurements = await page.evaluate(() => {
      const root = document.documentElement;
      const width = root.clientWidth;
      const offenders = [...document.querySelectorAll('*')]
        .filter((element) => element.getBoundingClientRect().right > width + 1)
        .slice(0, 6)
        .map((element) => `${element.tagName}.${String(element.className).slice(0, 80)}`);
      return { overflow: root.scrollWidth - width, width, offenders };
    });
    expect(
      measurements.overflow,
      `${pageType.name} :: ${measurements.offenders.join(' | ')}`,
    ).toBeLessThanOrEqual(0);
    expect(measurements.overflow, pageType.name).toBe(0);
  }
});

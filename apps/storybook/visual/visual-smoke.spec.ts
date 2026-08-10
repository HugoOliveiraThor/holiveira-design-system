import { readFileSync } from 'node:fs';

import { expect, test, type Page } from '@playwright/test';

const THEMES = ['light', 'dark'] as const;

interface StoryEntry {
  id: string;
  type: 'story' | 'docs';
  title: string;
  name: string;
}

const index = JSON.parse(
  readFileSync(new URL('../storybook-static/index.json', import.meta.url), 'utf8'),
) as { entries: Record<string, StoryEntry> };

const stories = Object.values(index.entries).filter((entry) => entry.type === 'story');

if (stories.length === 0) {
  throw new Error('index.json has no stories — run build:storybook first');
}

async function assertStoryRenders(page: Page, id: string, theme: string) {
  await page.goto(
    `/iframe.html?id=${encodeURIComponent(id)}&viewMode=story&globals=theme:${theme}`,
    { waitUntil: 'domcontentloaded' },
  );

  await page.waitForSelector('#storybook-root', { state: 'attached', timeout: 15_000 });
  await page.waitForTimeout(500);

  expect(await page.locator('#sb-errordisplay').count(), `error display for ${id} [${theme}]`).toBe(
    0,
  );
  expect(
    await page.locator('#storybook-root').isVisible(),
    `story root not visible for ${id} [${theme}]`,
  ).toBe(true);
}

for (const story of stories) {
  for (const theme of THEMES) {
    test(`${story.id} renders in ${theme}`, async ({ page }) => {
      await assertStoryRenders(page, story.id, theme);
    });
  }
}

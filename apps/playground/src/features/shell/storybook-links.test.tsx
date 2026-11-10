import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { PAGE_STORY_TITLES, STORYBOOK_BASE, storyId } from '../../lib/storybook-links';

import { AppShell, NAV_ITEMS } from './app-shell';

const REPO_ROOT = process.cwd();
const APP_STORY_ROOT = join(REPO_ROOT, 'apps', 'storybook', 'stories');
const PACKAGES_ROOT = join(REPO_ROOT, 'packages');

afterEach(cleanup);

function listStoryFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);

    if (entry.isDirectory()) {
      return entry.name === 'node_modules' || entry.name === 'dist' ? [] : listStoryFiles(path);
    }

    return entry.name.endsWith('.stories.tsx') ? [path] : [];
  });
}

/** Reads the title of the `const meta` block, which is the real story title. */
function metaTitle(file: string): string | null {
  const source = readFileSync(file, 'utf8');
  const metaStart = source.search(/const\s+meta\b/);

  if (metaStart === -1) {
    return null;
  }

  const defaultStart = source.indexOf('export default', metaStart);
  const block = source.slice(metaStart, defaultStart === -1 ? undefined : defaultStart);

  return block.match(/title:\s*'([^']+)'/)?.[1] ?? null;
}

/** Story titles Storybook actually serves: the app stories plus package stories. */
function realStoryTitles(): Set<string> {
  const packageStoryDirs = readdirSync(PACKAGES_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(PACKAGES_ROOT, entry.name, 'src'));

  const titles = [APP_STORY_ROOT, ...packageStoryDirs]
    .flatMap(listStoryFiles)
    .map(metaTitle)
    .filter((title): title is string => title !== null);

  return new Set(titles);
}

describe('Storybook cross-links', () => {
  it('links each page to its Storybook story', () => {
    const titles = realStoryTitles();
    expect(titles.size).toBeGreaterThan(0);

    expect(Object.keys(PAGE_STORY_TITLES).sort()).toEqual(
      NAV_ITEMS.map((item) => item.href).sort(),
    );

    for (const item of NAV_ITEMS) {
      const title = PAGE_STORY_TITLES[item.href] ?? '';
      expect(title, item.href).not.toBe('');
      expect(titles.has(title), `${item.href} -> ${title}`).toBe(true);

      render(
        <AppShell title={item.label} activePath={item.href}>
          <p>{item.label} content</p>
        </AppShell>,
      );

      const link = screen.getByRole('link', { name: 'View in Storybook' });
      const href = link.getAttribute('href') ?? '';

      expect(href, item.href).toContain(STORYBOOK_BASE);
      expect(href, item.href).toContain(storyId(title));
      expect(link, item.href).toHaveAttribute('target', '_blank');

      cleanup();
    }
  });

  it('derives story ids the way Storybook does', () => {
    expect(storyId('Patterns/Sidebar + Breadcrumb')).toBe('patterns-sidebar-breadcrumb');
    expect(storyId('Patterns/Form + Validation')).toBe('patterns-form-validation');
    expect(storyId('Patterns/Tables/Data Table 1')).toBe('patterns-tables-data-table-1');
    expect(storyId('Layouts/SignInForm')).toBe('layouts-signinform');
    expect(storyId('Design Tokens/Shadows')).toBe('design-tokens-shadows');
  });

  it('GettingStarted links to the playground', () => {
    const gettingStarted = readFileSync(
      join(REPO_ROOT, 'apps', 'storybook', 'stories', 'GettingStarted.mdx'),
      'utf8',
    );

    expect(gettingStarted).toContain(
      '[Playground](https://hugooliveirathor.github.io/holiveira-design-system/playground/)',
    );
  });
});

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { AppShell, NAV_ITEMS } from './app-shell';

const REPO_ROOT = process.cwd();
const STORYBOOK_BASE = 'https://HugoOliveiraThor.github.io/holiveira-design-system';

const STORYBOOK_HREFS: Record<string, string> = {
  '/': `${STORYBOOK_BASE}/?path=/story/patterns-sidebar-breadcrumb--layout`,
  '/forms': `${STORYBOOK_BASE}/?path=/story/patterns-form-validation--example`,
  '/orders': `${STORYBOOK_BASE}/?path=/story/patterns-tables-data-table-1--default`,
  '/settings': `${STORYBOOK_BASE}/?path=/docs/design-tokens-colors--docs`,
  '/login': `${STORYBOOK_BASE}/?path=/story/layouts-signinform--default`,
};

afterEach(cleanup);

describe('Storybook cross-links', () => {
  it('links each page to its Storybook story', () => {
    expect(Object.keys(STORYBOOK_HREFS).sort()).toEqual(NAV_ITEMS.map((item) => item.href).sort());

    for (const item of NAV_ITEMS) {
      render(
        <AppShell title={item.label} activePath={item.href}>
          <p>{item.label} content</p>
        </AppShell>,
      );

      const link = screen.getByRole('link', { name: 'View in Storybook' });
      expect(link, item.href).toHaveAttribute('href', STORYBOOK_HREFS[item.href]);
      expect(link, item.href).toHaveAttribute('target', '_blank');

      cleanup();
    }
  });

  it('GettingStarted links to the playground', () => {
    const gettingStarted = readFileSync(
      join(REPO_ROOT, 'apps', 'storybook', 'stories', 'GettingStarted.mdx'),
      'utf8',
    );

    expect(gettingStarted).toContain(
      '[HO Design System Playground](https://HugoOliveiraThor.github.io/holiveira-design-system/playground/)',
    );
  });
});

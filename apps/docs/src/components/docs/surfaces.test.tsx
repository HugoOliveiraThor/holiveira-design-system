import '@testing-library/jest-dom/vitest';
import { ThemeProvider } from '@ho-dev/theme';

import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import ComponentsIndex from '../../app/components/page';
import PackagesIndex from '../../app/packages/page';
import HomePage from '../../app/page';
import type { GuideDoc } from '../../lib/docs-metadata/guides';
import type { ComponentDoc, ComponentRecord, PackageRecord } from '../../lib/docs-metadata/types';

import { ComponentInventory } from './component-inventory';
import { ComponentPage, type ComponentPageProps } from './component-page';
import { ExportsTable } from './exports-table';
import { GuidePage } from './guide-page';
import { PackageHeader } from './package-header';
import { PropsTable, VariantsTable } from './props-table';
import { References, RelatedComponents } from './references';
import { RelatedPackages, RelatedPages } from './related-links';
import { CARD_CLASS } from './surfaces';

afterEach(cleanup);

const PACKAGE: PackageRecord = {
  name: '@ho-dev/primitives',
  version: '0.2.0',
  description: 'Primitive components.',
  private: false,
  installState: 'pre-release',
  exports: [{ name: 'Button', kind: 'component' }],
  componentExports: [],
  category: 'Components',
  peers: {},
};

const RECORD: ComponentRecord = {
  id: 'button',
  package: '@ho-dev/primitives',
  exportName: 'Button',
  props: [{ name: 'label', type: 'string', required: true, default: null, origin: 'component' }],
  variants: { variant: { name: 'variant', values: ['primary'], default: 'primary' } },
  story: { title: 'Primitives/Button', id: 'primitives-button' },
  sourceFile: 'packages/primitives/src/button.tsx',
};

const DOC: ComponentDoc = {
  id: 'button',
  summary: 'Triggers an action.',
  whenToUse: 'Use it for the primary action of a view.',
  whenNotToUse: 'Do not use it for navigation.',
  accessibility: {
    keyboard: 'Enter and Space activate it.',
    aria: 'Renders a native button.',
    focus: 'Keeps the browser focus ring.',
  },
  related: [],
};

const COMPONENT_PAGE: ComponentPageProps = {
  record: RECORD,
  doc: DOC,
  packageRecord: PACKAGE,
  preview: <div>preview child</div>,
  previewKey: 'button/realistic',
  examples: [{ kind: 'minimal', label: 'Minimal example', source: '<Button>Save</Button>' }],
  related: [],
  sourceHref: 'https://github.com/example/blob/main/packages/primitives/src/button.tsx',
  contractHref: 'https://github.com/example/blob/main/docs/architecture/contracts/primitives.md',
  packageHref: '/holiveira-design-system/docs/packages/primitives/',
  storyHref: 'https://example.test/?path=/docs/primitives-button--docs',
};

const THEMING: GuideDoc = {
  slug: 'getting-started/theming',
  section: 'Getting Started',
  title: 'Theming',
  summary: 'ThemeProvider switches the whole application between light and dark.',
  order: 3,
  sections: [{ id: 'provider', title: 'Provide the theme', prose: ['Wrap the application once.'] }],
  snippets: [],
  related: { packages: [], components: [] },
  sources: [],
};

/** The one page header a surface renders, with its style contract. */
function pageHeader(container: HTMLElement): HTMLElement {
  const headers = container.querySelectorAll<HTMLElement>('[data-page-header]');
  expect(headers).toHaveLength(1);
  return headers[0];
}

function withTheme(ui: React.ReactNode) {
  return render(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {ui}
    </ThemeProvider>,
  );
}

describe('shared surfaces', () => {
  it('shares the page header and table styles', () => {
    const componentPage = withTheme(<ComponentPage {...COMPONENT_PAGE} />);
    const guidePage = render(
      <GuidePage guide={{ ...THEMING, slug: 'foundations/tokens' }} snippets={() => undefined} />,
    );
    const packageHeader = render(<PackageHeader record={PACKAGE} />);
    const componentsIndex = render(<ComponentsIndex />);
    const packagesIndex = render(<PackagesIndex />);
    const landing = render(<HomePage />);

    const headers = [
      pageHeader(componentPage.container),
      pageHeader(guidePage.container),
      pageHeader(packageHeader.container),
      pageHeader(componentsIndex.container),
      pageHeader(packagesIndex.container),
    ];
    for (const header of headers) {
      expect(within(header).getByRole('heading', { level: 1 })).toBeInTheDocument();
    }
    expect(new Set(headers.map((header) => header.className)).size).toBe(1);
    expect(headers[0].className).toContain('border-[var(--portal-border)]');

    for (const container of [componentPage.container, guidePage.container]) {
      const tables = container.querySelectorAll('[data-docs-table]');
      expect(tables.length).toBeGreaterThan(0);
      for (const table of tables) {
        expect(table.parentElement?.className).toContain('overflow-x-auto');
      }
    }

    // The landing shares the card tile with the indexes and the package cards.
    const categoryLinks = within(
      screen.getByRole('list', { name: 'Package categories' }),
    ).getAllByRole('link');
    expect(categoryLinks.length).toBeGreaterThan(0);
    for (const link of categoryLinks) {
      expect(link.className).toBe(CARD_CLASS);
    }
    for (const [container, prefix] of [
      [componentsIndex.container, '/components/'],
      [packagesIndex.container, '/packages/'],
    ] as const) {
      const cards = container.querySelectorAll<HTMLAnchorElement>(`a[href^="${prefix}"]`);
      expect(cards.length).toBeGreaterThan(0);
      for (const card of cards) {
        expect(card.className).toBe(CARD_CLASS);
      }
    }
    expect(landing.container.querySelectorAll('[data-page-header]')).toHaveLength(0);
  });

  it('renders the designed empty state', () => {
    const surfaces: Array<{ container: HTMLElement; text: string }> = [];
    const push = (container: HTMLElement, text: string) => surfaces.push({ container, text });

    push(
      render(<PropsTable props={[]} />).container,
      'This component declares no props of its own.',
    );
    push(render(<VariantsTable variants={{}} />).container, 'This component exposes no variants.');
    push(
      render(<ExportsTable record={{ ...PACKAGE, exports: [] }} />).container,
      'This package has no public exports.',
    );
    push(
      render(<ComponentInventory record={PACKAGE} />).container,
      'This package exports no components.',
    );
    push(render(<RelatedPages pages={[]} />).container, 'No related pages.');
    push(render(<RelatedPackages packages={[]} />).container, 'No related packages.');
    push(render(<RelatedComponents related={[]} />).container, 'No related components');
    push(
      render(<GuidePage guide={THEMING} snippets={() => undefined} />).container,
      'No related packages.',
    );

    for (const { container, text } of surfaces) {
      const states = container.querySelectorAll<HTMLElement>('[data-empty-state]');
      expect(states.length, text).toBeGreaterThan(0);
      for (const state of states) {
        expect(state.querySelector('svg[aria-hidden="true"]')).not.toBeNull();
      }
      expect(
        [...states].some((state) => state.textContent?.includes(text)),
        `${text} is not in a designed empty state`,
      ).toBe(true);
    }
  });
});

import '@testing-library/jest-dom/vitest';

import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { CARD_CLASS } from '../../components/docs/surfaces';
import { packages, slugOf } from '../../lib/docs-metadata-query';

import PackagesIndex from './page';

afterEach(cleanup);

describe('packages index', () => {
  it('renders the shared page header', () => {
    render(<PackagesIndex />);
    const header = document.querySelector('[data-page-header]');
    expect(header).not.toBeNull();
    expect(within(header as HTMLElement).getByRole('heading', { level: 1 })).toHaveTextContent(
      'Packages',
    );
  });

  it('links every package through the shared card', () => {
    render(<PackagesIndex />);
    const cards = [...document.querySelectorAll<HTMLAnchorElement>('a[href^="/packages/"]')];

    expect(cards).toHaveLength(packages.length);
    for (const [index, card] of cards.entries()) {
      const slug = slugOf(packages[index].name);
      expect(card.getAttribute('href'), slug).toMatch(new RegExp(`^/packages/${slug}/?$`));
      expect(card.className, slug).toBe(CARD_CLASS);
    }
    for (const record of packages) {
      expect(screen.getByText(record.name)).toBeInTheDocument();
    }
  });
});

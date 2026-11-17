import '@testing-library/jest-dom/vitest';

import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { CARD_CLASS } from '../../components/docs/surfaces';
import { components } from '../../lib/docs-metadata-query';

import ComponentsIndex from './page';

afterEach(cleanup);

describe('components index', () => {
  it('renders the shared page header', () => {
    render(<ComponentsIndex />);
    const header = document.querySelector('[data-page-header]');
    expect(header).not.toBeNull();
    expect(within(header as HTMLElement).getByRole('heading', { level: 1 })).toHaveTextContent(
      'Components',
    );
  });

  it('links every documented component through the shared card', () => {
    render(<ComponentsIndex />);
    const cards = [...document.querySelectorAll<HTMLAnchorElement>('a[href^="/components/"]')];

    expect(cards).toHaveLength(components.length);
    for (const [index, card] of cards.entries()) {
      const id = components[index].id;
      expect(card.getAttribute('href'), id).toMatch(new RegExp(`^/components/${id}/?$`));
      expect(card.className, id).toBe(CARD_CLASS);
    }
    for (const component of components) {
      expect(screen.getByText(component.exportName)).toBeInTheDocument();
    }
  });
});

import '@testing-library/jest-dom/vitest';

import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { docsSite } from '../../site.config';
import {
  components,
  examples,
  guideDocs,
  packageSections,
  packages,
} from '../lib/docs-metadata-query';

import HomePage from './page';

function stubClipboard(writeText: (text: string) => Promise<void>): void {
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  Reflect.deleteProperty(navigator, 'clipboard');
});

describe('landing page', () => {
  it('renders the hero with the primary action', () => {
    render(<HomePage />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Build interfaces that feel native to your product.');
    expect(screen.getByText(/sixteen packages, one design language/i)).toBeVisible();
    expect(screen.getByRole('link', { name: /browse components/i }).getAttribute('href')).toMatch(
      /^\/components\/?$/,
    );
    expect(
      screen.getByRole('link', { name: /start with the guides/i }).getAttribute('href'),
    ).toMatch(/^\/getting-started\/?$/);
  });

  it('copies the workspace install and announces it', async () => {
    const writeText = vi.fn<(text: string) => Promise<void>>().mockResolvedValue(undefined);
    stubClipboard(writeText);

    render(<HomePage />);
    expect(document.querySelector('pre > code')?.textContent).toBe(
      '"@ho-dev/primitives": "workspace:*"',
    );
    fireEvent.click(screen.getByRole('button', { name: /copy workspace install/i }));

    expect(writeText).toHaveBeenCalledWith('"@ho-dev/primitives": "workspace:*"');
    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent('Workspace install copied.'),
    );
  });

  it('counts packages, components, guides and examples', () => {
    render(<HomePage />);
    const values: Record<string, number> = {
      Packages: packages.length,
      Components: components.length,
      Guides: guideDocs.length,
      Examples: examples.length,
    };
    for (const [label, value] of Object.entries(values)) {
      const term = screen.getByText(label, { selector: 'dt' });
      expect(term.nextElementSibling).toHaveTextContent(String(value));
    }
    // The spec fixes the catalogue at these counts; a new artifact updates both.
    expect(Object.values(values)).toEqual([16, 13, 12, 26]);
  });

  it('lists categories with counts', () => {
    render(<HomePage />);
    const sections = packageSections();
    const links = within(screen.getByRole('list', { name: 'Package categories' })).getAllByRole(
      'link',
    );
    expect(links).toHaveLength(sections.length);
    for (const [index, section] of sections.entries()) {
      expect(links[index]).toHaveTextContent(section.category);
      expect(links[index]).toHaveTextContent(`${section.items.length} packages`);
      expect(
        links[index].querySelector('svg[aria-hidden="true"]'),
        section.category,
      ).not.toBeNull();
    }
  });

  it('links Storybook and the Playground', () => {
    render(<HomePage />);
    expect(screen.getByRole('link', { name: /^storybook/i })).toHaveAttribute(
      'href',
      docsSite.storybookUrl,
    );
    expect(screen.getByRole('link', { name: /^playground/i })).toHaveAttribute(
      'href',
      docsSite.playgroundUrl,
    );
  });
});

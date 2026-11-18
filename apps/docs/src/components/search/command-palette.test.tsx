import '@testing-library/jest-dom/vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { SearchRecord } from '../../lib/docs-metadata/types';

import { CommandPalette } from './command-palette';

const router = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock('next/navigation', () => ({
  useRouter: () => router,
  usePathname: () => '/',
}));

const RECORDS: SearchRecord[] = [
  {
    id: 'button',
    type: 'component',
    title: 'Button',
    package: '@ho-dev/primitives',
    category: 'Components',
    summary: '',
    keywords: ['button'],
    path: '/components/button/',
  },
  {
    id: 'tokens',
    type: 'package',
    title: '@ho-dev/tokens',
    package: '@ho-dev/tokens',
    category: 'Foundation',
    summary: '',
    keywords: ['tokens'],
    path: '/packages/tokens/',
  },
  {
    id: 'getting-started/theming',
    type: 'guide',
    title: 'Theming',
    category: 'Getting Started',
    summary: '',
    keywords: ['theming'],
    path: '/getting-started/theming/',
  },
];

function renderPalette(records: SearchRecord[] = RECORDS) {
  const onOpenChange = vi.fn();
  render(<CommandPalette open onOpenChange={onOpenChange} records={records} />);
  return { onOpenChange };
}

afterEach(() => {
  cleanup();
  router.push.mockReset();
});

describe('command palette', () => {
  it('opens with focus in the combobox and keeps tab focus inside the dialog', () => {
    renderPalette();
    const input = screen.getByRole('combobox');
    expect(input).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(input).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(input).toHaveFocus();
  });

  it('groups the results as Components, Packages and Guides', () => {
    renderPalette();
    const groups = screen.getAllByRole('group');
    expect(groups.map((group) => group.getAttribute('aria-label'))).toEqual([
      'Components',
      'Packages',
      'Guides',
    ]);
    const options = screen.getAllByRole('option');
    expect(options.map((option) => option.id)).toEqual([
      'docs-search-option-button',
      'docs-search-option-tokens',
      'docs-search-option-getting-started/theming',
    ]);
  });

  it('moves the active option with the arrow keys', () => {
    renderPalette();
    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('aria-activedescendant', 'docs-search-option-button');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveAttribute('aria-activedescendant', 'docs-search-option-tokens');
    expect(document.getElementById('docs-search-option-tokens')).toHaveAttribute(
      'aria-selected',
      'true',
    );

    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input).toHaveAttribute('aria-activedescendant', 'docs-search-option-button');
    expect(document.getElementById('docs-search-option-tokens')).toHaveAttribute(
      'aria-selected',
      'false',
    );
  });

  it('opens the active result on Enter', () => {
    const { onOpenChange } = renderPalette();
    const input = screen.getByRole('combobox');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(router.push).toHaveBeenCalledWith('/packages/tokens/');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes on Escape', () => {
    const { onOpenChange } = renderPalette();
    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes when the pointer presses outside the panel', () => {
    const { onOpenChange } = renderPalette();
    fireEvent.mouseDown(document.body);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('renders the designed empty state and keeps the query editable', () => {
    renderPalette();
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'zzz' } });
    expect(screen.queryByRole('option')).toBeNull();
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'all packages' }).getAttribute('href')).toMatch(
      /^\/packages\/?$/,
    );
    expect(input).toHaveValue('zzz');
  });

  it('keeps the empty state when the index has nothing to show', () => {
    renderPalette([]);
    expect(screen.queryByRole('option')).toBeNull();
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });
});

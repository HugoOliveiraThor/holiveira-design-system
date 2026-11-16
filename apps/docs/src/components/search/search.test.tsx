import '@testing-library/jest-dom/vitest';

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { SearchRecord } from '../../lib/docs-metadata/types';

import { DocsSearch } from './search';

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
    keywords: ['button', '@ho-dev/primitives', 'components'],
    path: '/components/button/',
  },
  {
    id: 'tokens',
    type: 'package',
    title: '@ho-dev/tokens',
    package: '@ho-dev/tokens',
    category: 'Foundation',
    summary: '',
    keywords: ['@ho-dev/tokens', 'foundation', 'tokens'],
    path: '/packages/tokens/',
  },
];

afterEach(() => {
  cleanup();
  router.push.mockReset();
  vi.restoreAllMocks();
});

describe('search', () => {
  it('exposes combobox semantics', () => {
    render(<DocsSearch records={RECORDS} />);
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(input).toHaveAttribute('aria-controls', 'docs-search-list');
    expect(input).toHaveAttribute('aria-activedescendant', 'docs-search-option-button');
  });

  it('announces the result count', () => {
    render(<DocsSearch records={RECORDS} />);
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(screen.getByRole('status')).toHaveTextContent('2 results');
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'but' } });
    expect(screen.getByRole('status')).toHaveTextContent('1 results');
  });

  it('filters the provided records without a network request', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    render(<DocsSearch records={RECORDS} />);
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'token' } });
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent('@ho-dev/tokens');
    expect(fetchSpy).not.toHaveBeenCalled();
    for (const file of ['search.tsx', 'filter.ts']) {
      const source = readFileSync(
        join(process.cwd(), 'apps', 'docs', 'src', 'components', 'search', file),
        'utf8',
      );
      expect(source).not.toMatch(/\bfetch\(|XMLHttpRequest/);
    }
  });

  it('navigates to a guide record by its route', () => {
    render(
      <DocsSearch
        records={[
          {
            id: 'getting-started/theming',
            type: 'guide',
            title: 'Theming',
            category: 'Getting Started',
            summary: 'ThemeProvider switches the application between light and dark.',
            keywords: ['theming', 'getting started'],
            path: '/getting-started/theming/',
          },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'theming' } });
    const option = screen.getByRole('option');
    expect(option).toHaveTextContent('Theming');
    expect(option).not.toHaveTextContent('·');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(router.push).toHaveBeenCalledWith('/getting-started/theming/');
  });

  it('shows the no-results state for an empty index', () => {
    render(<DocsSearch records={[]} />);
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'zzz' } });
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /all packages/i }).getAttribute('href')).toMatch(
      /^\/packages\/?$/,
    );
  });
});

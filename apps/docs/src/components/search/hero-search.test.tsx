import '@testing-library/jest-dom/vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { SearchRecord } from '../../lib/docs-metadata/types';

import { HeroSearch } from './hero-search';

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
];

afterEach(() => {
  cleanup();
  router.push.mockReset();
});

describe('hero search', () => {
  it('opens the palette from the hero button', () => {
    render(<HeroSearch records={RECORDS} />);
    const trigger = screen.getByRole('button', { name: /^Search components, packages and guides/ });
    expect(trigger.tagName).toBe('BUTTON');
    expect(screen.queryByRole('combobox')).toBeNull();

    fireEvent.click(trigger);

    expect(screen.getByRole('dialog', { name: 'Search documentation' })).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveFocus();
    expect(screen.getAllByRole('option')).toHaveLength(2);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes on escape and returns focus to the hero button', () => {
    render(<HeroSearch records={RECORDS} />);
    const trigger = screen.getByRole('button', { name: /^Search components, packages and guides/ });
    fireEvent.click(trigger);

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });

    expect(screen.queryByRole('combobox')).toBeNull();
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});

import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { DocsShell } from './docs-shell';

const state = vi.hoisted(() => ({ pathname: '/packages/primitives/' }));

vi.mock('next/navigation', () => ({
  usePathname: () => state.pathname,
}));

const SECTIONS = [
  {
    category: 'Components',
    items: [{ id: 'primitives', label: '@ho-dev/primitives', href: '/packages/primitives/' }],
  },
];

const UNBUILT = [{ title: 'Foundations', items: ['Design tokens'] }];

function renderShell() {
  return render(
    <DocsShell packageSections={SECTIONS} componentSections={[]} unbuiltSections={UNBUILT}>
      <p>Page</p>
    </DocsShell>,
  );
}

afterEach(cleanup);

describe('sidebar and drawer', () => {
  it('marks the active route with aria-current', () => {
    renderShell();
    const links = screen.getAllByRole('link', { name: '@ho-dev/primitives' });
    expect(links[0]).toHaveAttribute('aria-current', 'page');
  });

  it('renders disabled sections without links', () => {
    renderShell();
    expect(screen.queryByRole('link', { name: 'Design tokens' })).toBeNull();
    expect(screen.getAllByText('Design tokens').length).toBeGreaterThan(0);
  });

  it('marks the drawer closed and expands on trigger', () => {
    renderShell();
    const trigger = screen.getByRole('button', { name: 'Menu' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: 'Documentation navigation' })).toBeInTheDocument();
  });

  it('closes the drawer on Escape', () => {
    renderShell();
    const trigger = screen.getByRole('button', { name: 'Menu' });
    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(document.activeElement).toBe(trigger);
  });

  it('locks body scroll while open', () => {
    renderShell();
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(document.body.style.overflow).toBe('');
  });
});

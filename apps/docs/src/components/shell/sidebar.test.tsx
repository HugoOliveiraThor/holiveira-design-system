import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { guideSections, packageSections } from '../../lib/docs-metadata-query';

import { DocsShell } from './docs-shell';

const state = vi.hoisted(() => ({ pathname: '/packages/primitives/' }));

vi.mock('next/navigation', () => ({
  usePathname: () => state.pathname,
}));

function renderShell(pathname = '/packages/primitives/') {
  state.pathname = pathname;
  return render(
    <DocsShell
      guideSections={guideSections()}
      packageSections={packageSections()}
      componentSections={[]}
    >
      <p>Page</p>
    </DocsShell>,
  );
}

function sidebar() {
  return screen.getByRole('navigation', { name: 'Documentation' });
}

/** Next Link normalises the trailing slash away outside a configured export. */
function linkHref(href: string): string {
  return href.replace(/\/$/, '');
}

afterEach(cleanup);

describe('sidebar and drawer', () => {
  it('links every guide in the sidebar grouped by section', () => {
    renderShell();
    const sections = guideSections();
    expect(sections.map((section) => section.category)).toEqual([
      'Getting Started',
      'Foundations',
      'Guides',
      'Architecture',
    ]);
    const links = sidebar().querySelectorAll<HTMLAnchorElement>('a[href^="/"]');
    const guideLinks = [...links].filter(
      (link) => !link.getAttribute('href')?.startsWith('/packages/'),
    );
    expect(guideLinks).toHaveLength(12);
    for (const section of sections) {
      for (const item of section.items) {
        const link = screen.getByRole('link', { name: item.label });
        expect(link).toHaveAttribute('href', linkHref(item.href));
      }
    }
    expect(screen.getByRole('link', { name: 'Installation' })).toHaveAttribute(
      'href',
      '/getting-started/installation',
    );
    expect(screen.getByRole('link', { name: 'Design tokens' })).toHaveAttribute(
      'href',
      '/foundations/tokens',
    );
    expect(screen.getByRole('link', { name: 'Architecture' })).toHaveAttribute(
      'href',
      '/architecture',
    );
  });

  it('renders no disabled placeholder item', () => {
    const { container } = renderShell();
    expect(container.querySelectorAll('[aria-disabled="true"]')).toHaveLength(0);
    const placeholders = [...sidebar().querySelectorAll('li')].filter(
      (item) => item.querySelector('a') === null,
    );
    expect(placeholders).toHaveLength(0);
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
    const drawer = screen.getByRole('dialog', { name: 'Documentation navigation' });
    expect(drawer.querySelectorAll('[aria-disabled="true"]')).toHaveLength(0);
    expect(screen.getAllByRole('link', { name: 'Design tokens' })).toHaveLength(2);
  });

  it('marks the active guide route with aria-current', () => {
    renderShell('/guides/icons/');
    const current = sidebar().querySelectorAll('a[aria-current="page"]');
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveTextContent('Icons');
  });

  it('marks the active route with aria-current', () => {
    renderShell();
    const links = screen.getAllByRole('link', { name: '@ho-dev/primitives' });
    expect(links[0]).toHaveAttribute('aria-current', 'page');
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

import '@testing-library/jest-dom/vitest';

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { PageShell } from './page-shell';

const TOC = [
  { id: 'installation', title: 'Installation' },
  { id: 'peer-dependencies', title: 'Peer dependencies' },
];

afterEach(cleanup);

describe('page shell', () => {
  it('renders the breadcrumb trail and caps the content column at 820px', () => {
    render(
      <PageShell breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Packages' }]}>
        <p>content</p>
      </PageShell>,
    );
    expect(screen.getByRole('navigation', { name: 'Breadcrumb trail' })).toHaveTextContent('Home');
    expect(screen.getByText('content').parentElement?.className).toContain('max-w-[820px]');
  });

  it('hides the toc below the wide breakpoint', () => {
    render(
      <PageShell toc={TOC}>
        <p>content</p>
      </PageShell>,
    );
    const aside = document.querySelector('aside');
    expect(aside).not.toBeNull();
    expect(aside?.className).toContain('hidden');
    expect(aside?.className).toContain('xl:block');
    // `xl:block` means 1280px while the token set does not override Tailwind's xl.
    const tokens = readFileSync(
      join(process.cwd(), 'packages', 'tokens', 'src', 'tokens.css'),
      'utf8',
    );
    expect(tokens).not.toMatch(/--breakpoint-xl\s*:/);
  });

  it('renders one column when the page has fewer than two sections', () => {
    render(
      <PageShell toc={[{ id: 'installation', title: 'Installation' }]}>
        <p>content</p>
      </PageShell>,
    );
    expect(document.querySelector('aside')).toBeNull();
  });
});

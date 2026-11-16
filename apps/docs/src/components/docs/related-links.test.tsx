import '@testing-library/jest-dom/vitest';

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { RelatedPackages, RelatedPages, relatedLinks, targetHref } from './related-links';

afterEach(cleanup);

describe('related links', () => {
  it('resolves page guide and anchor targets to docs hrefs', () => {
    expect(targetHref({ kind: 'page', id: 'button' })).toBe(
      '/holiveira-design-system/docs/components/button/',
    );
    expect(targetHref({ kind: 'guide', slug: 'guides/icons' })).toBe(
      '/holiveira-design-system/docs/guides/icons/',
    );
    expect(targetHref({ kind: 'anchor', package: '@ho-dev/primitives', anchor: 'avatar' })).toBe(
      '/holiveira-design-system/docs/packages/primitives/#avatar',
    );
  });

  it('drops a relation without a resolved target', () => {
    expect(
      relatedLinks([
        { id: 'button', label: 'Button', target: { kind: 'page', id: 'button' } },
        { id: 'ghost', label: 'Ghost' },
      ]),
    ).toEqual([
      {
        id: 'button',
        label: 'Button',
        href: '/holiveira-design-system/docs/components/button/',
      },
    ]);
  });

  it('renders related pages as pills under their own section', () => {
    render(
      <RelatedPages
        pages={[{ id: 'guides/icons', label: 'Icons', href: '/docs/guides/icons/' }]}
      />,
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Related pages' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Icons' })).toHaveAttribute(
      'href',
      '/docs/guides/icons/',
    );
  });

  it('renders related packages and states when there are none', () => {
    const { unmount } = render(
      <RelatedPackages
        packages={[{ id: 'ui', label: '@ho-dev/ui', href: '/docs/packages/ui/' }]}
      />,
    );
    expect(screen.getByRole('link', { name: '@ho-dev/ui' })).toHaveAttribute(
      'href',
      '/docs/packages/ui/',
    );
    unmount();

    render(<RelatedPackages packages={[]} />);
    expect(screen.getByText('No related packages.')).toBeInTheDocument();
  });
});

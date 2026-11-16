import '@testing-library/jest-dom/vitest';

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { storyHref } from '../../lib/docs-metadata-query';

import { References, RelatedComponents } from './references';

afterEach(cleanup);

const HREFS = {
  sourceHref: 'https://github.com/example/blob/main/packages/primitives/src/button.tsx',
  contractHref: 'https://github.com/example/blob/main/docs/architecture/contracts/primitives.md',
  packageHref: '/holiveira-design-system/docs/packages/primitives/',
  storyHref: storyHref('button'),
};

describe('references section', () => {
  it('links source, contract, package page and story', () => {
    render(<References {...HREFS} />);
    expect(screen.getByRole('link', { name: 'Source file' })).toHaveAttribute(
      'href',
      HREFS.sourceHref,
    );
    expect(screen.getByRole('link', { name: 'Package contract' })).toHaveAttribute(
      'href',
      HREFS.contractHref,
    );
    expect(screen.getByRole('link', { name: 'Package page' })).toHaveAttribute(
      'href',
      '/holiveira-design-system/docs/packages/primitives/',
    );
    expect(screen.getByRole('link', { name: 'Storybook story' })).toHaveAttribute(
      'href',
      HREFS.storyHref,
    );
  });

  it('builds the story link from the generated id', () => {
    render(<References {...HREFS} />);
    expect(screen.getByRole('link', { name: 'Storybook story' }).getAttribute('href')).toMatch(
      /\/\?path=\/docs\/primitives-button--docs$/,
    );
  });

  it('links the playground screen when one exists', () => {
    const { unmount } = render(
      <References {...HREFS} playgroundHref="https://example.test/playground/forms/" />,
    );
    expect(screen.getByRole('link', { name: 'Playground screen' })).toHaveAttribute(
      'href',
      'https://example.test/playground/forms/',
    );
    unmount();

    render(<References {...HREFS} />);
    expect(screen.queryByRole('link', { name: 'Playground screen' })).not.toBeInTheDocument();
  });

  it('lists only catalogued related components', () => {
    render(<RelatedComponents related={['alert', 'ghost']} />);
    expect(screen.getByRole('link', { name: 'Alert' })).toHaveAttribute(
      'href',
      '/holiveira-design-system/docs/components/alert/',
    );
    expect(screen.queryByText(/ghost/i)).not.toBeInTheDocument();
  });
});

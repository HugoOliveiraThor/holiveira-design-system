import { cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import { render } from './test-utils';

import { Link } from './index';

afterEach(cleanup);

describe('Link', () => {
  it('renders an anchor with href and children', () => {
    const { getByRole } = render(<Link href="/page">Go to page</Link>);
    const link = getByRole('link', { name: 'Go to page' });
    expect(link).toHaveAttribute('href', '/page');
  });

  it.each([
    ['default', 'text-gray-500'],
    ['primary', 'text-primary'],
    ['success', 'text-success-500'],
    ['error', 'text-error-500'],
    ['warning', 'text-warning-500'],
    ['info', 'text-blue-light-500'],
    ['light', 'text-gray-400'],
    ['dark', 'text-gray-800'],
  ] as const)('renders %s variant', (variant, expectedClass) => {
    const { getByRole } = render(
      <Link href="#" variant={variant}>
        Link
      </Link>,
    );
    expect(getByRole('link')).toHaveClass(expectedClass);
  });

  it('adds underline when underline prop set', () => {
    const { getByRole } = render(
      <Link href="#" underline>
        Link
      </Link>,
    );
    expect(getByRole('link')).toHaveClass('underline');
  });

  it('does not underline by default', () => {
    const { getByRole } = render(<Link href="#">Link</Link>);
    expect(getByRole('link')).not.toHaveClass('underline');
  });

  it('applies opacity modifier', () => {
    const { getByRole } = render(
      <Link href="#" opacity={25}>
        Link
      </Link>,
    );
    expect(getByRole('link')).toHaveClass('text-gray-500/25');
  });

  it('does not apply opacity modifier at 100', () => {
    const { getByRole } = render(
      <Link href="#" opacity={100}>
        Link
      </Link>,
    );
    expect(getByRole('link')).not.toHaveClass('/100');
  });
});

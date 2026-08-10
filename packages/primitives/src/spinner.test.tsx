import { cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import { render } from './test-utils';

import { Spinner } from './index';

afterEach(cleanup);

describe('Spinner', () => {
  it('renders status role with aria-label', () => {
    const { getByRole } = render(<Spinner />);
    const spinner = getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });

  it.each([
    ['xs', 'h-5'],
    ['sm', 'h-7'],
    ['md', 'h-9'],
    ['lg', 'h-10'],
    ['xl', 'h-12'],
  ] as const)('applies %s size', (size, expectedClass) => {
    const { getByRole } = render(<Spinner size={size} />);
    expect(getByRole('status')).toHaveClass(expectedClass);
  });

  it.each([
    ['primary', 'text-primary'],
    ['white', 'text-white'],
    ['gray', 'text-gray-400'],
  ] as const)('applies %s color', (color, expectedClass) => {
    const { getByRole } = render(<Spinner color={color} />);
    expect(getByRole('status')).toHaveClass(expectedClass);
  });

  it('renders track circle with muted color', () => {
    const { container } = render(<Spinner />);
    const track = container.querySelector('circle');
    expect(track).toHaveClass('text-gray-200');
    expect(track).toHaveAttribute('stroke-width', '3');
  });
});

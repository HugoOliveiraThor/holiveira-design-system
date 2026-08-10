import { cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import { render } from './test-utils';

import { Progress } from './index';

afterEach(cleanup);

describe('Progress', () => {
  it('renders progressbar with aria-valuenow', () => {
    const { getByRole } = render(<Progress value={55} />);
    const bar = getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '55');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('clamps value to 100', () => {
    const { getByRole } = render(<Progress value={150} />);
    expect(getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('clamps value to 0', () => {
    const { getByRole } = render(<Progress value={-10} />);
    expect(getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  });

  it.each([
    ['sm', 'h-2'],
    ['md', 'h-3'],
    ['lg', 'h-4'],
    ['xl', 'h-5'],
  ] as const)('applies %s size height', (size, expectedClass) => {
    const { getByRole } = render(<Progress value={50} size={size} />);
    expect(getByRole('progressbar')).toHaveClass(expectedClass);
  });

  it('default shape is rounded-full', () => {
    const { getByRole } = render(<Progress value={50} />);
    expect(getByRole('progressbar')).toHaveClass('rounded-full');
  });

  it('shape default applies rounded-sm', () => {
    const { getByRole } = render(<Progress value={50} shape="default" />);
    expect(getByRole('progressbar')).toHaveClass('rounded-sm');
  });

  it('sets fill width style', () => {
    const { getByRole } = render(<Progress value={40} />);
    const fill = getByRole('progressbar').firstElementChild as HTMLElement;
    expect(fill.style.width).toBe('40%');
  });

  it('renders outside label', () => {
    const { getByText } = render(<Progress value={70} label="outside" />);
    expect(getByText('70%')).toBeVisible();
  });

  it('renders inside label', () => {
    const { getByText } = render(<Progress value={30} label="inside" />);
    expect(getByText('30%')).toBeVisible();
  });

  it('does not render label by default', () => {
    const { queryByText } = render(<Progress value={50} />);
    expect(queryByText('50%')).not.toBeInTheDocument();
  });
});

import { userEvent } from '@storybook/test';
import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { axe } from 'vitest-axe';

import { render } from './test-utils';

import { Button } from './index';

afterEach(cleanup);

describe('Button', () => {
  it('renders with label', () => {
    const { getByRole } = render(<Button label="Click me" />);
    expect(getByRole('button', { name: /click me/i })).toBeVisible();
  });

  it('renders all variants', () => {
    const variants = [
      'primary',
      'green',
      'dark',
      'outlinePrimary',
      'outlineGreen',
      'outlineDark',
    ] as const;
    for (const variant of variants) {
      const { getByRole } = render(<Button variant={variant} label={variant} />);
      expect(getByRole('button', { name: variant })).toBeVisible();
    }
  });

  it('renders all shapes', () => {
    const shapes = ['default', 'rounded', 'full'] as const;
    for (const shape of shapes) {
      const { getByRole } = render(<Button shape={shape} label={shape} />);
      expect(getByRole('button', { name: shape })).toBeVisible();
    }
  });

  it('renders small size', () => {
    const { getByRole } = render(<Button size="small" label="Small" />);
    expect(getByRole('button', { name: /small/i })).toBeVisible();
  });

  it('renders with icon', () => {
    const { getByRole } = render(
      <Button label="Settings" icon={<span data-testid="icon">*</span>} />,
    );
    expect(getByRole('button', { name: /settings/i })).toBeVisible();
  });

  it('applies disabled state', () => {
    const { getByRole } = render(<Button label="Disabled" disabled />);
    expect(getByRole('button', { name: /disabled/i })).toBeDisabled();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Button label="Click" onClick={onClick} />);

    await userEvent.click(getByRole('button', { name: /click/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('Button — keyboard', () => {
  it('activates on Enter', async () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Button label="Press" onClick={onClick} />);
    const button = getByRole('button', { name: /press/i });
    button.focus();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('activates on Space', async () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Button label="Press" onClick={onClick} />);
    const button = getByRole('button', { name: /press/i });
    button.focus();
    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('Button — pre-existing findings', () => {
  it.skip('P2-1: Button does not default type="button" — form submit risk (D6.9)', () => {
    const { container } = render(<Button label="Test" />);
    const button = container.querySelector('button');
    expect(button?.getAttribute('type')).toBe('button');
  });
});

describe('Button — accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(<Button label="Accessible" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations in dark mode', async () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<Button label="Dark" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
    document.documentElement.classList.remove('dark');
  });
});

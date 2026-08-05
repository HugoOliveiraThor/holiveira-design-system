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
      'outline',
    ] as const;
    for (const variant of variants) {
      const { getByRole } = render(<Button variant={variant} label={variant} />);
      expect(getByRole('button', { name: variant })).toBeVisible();
    }
  });

  it('renders all shapes', () => {
    const shapes = ['default', 'rounded'] as const;
    for (const shape of shapes) {
      const { getByRole } = render(<Button shape={shape} label={shape} />);
      expect(getByRole('button', { name: shape })).toBeVisible();
    }
  });

  it('renders sm and md sizes', () => {
    const { getByRole: getSm } = render(<Button size="sm" label="Sm" />);
    expect(getSm('button', { name: /sm/i })).toBeVisible();
    const { getByRole: getMd } = render(<Button size="md" label="Md" />);
    expect(getMd('button', { name: /md/i })).toBeVisible();
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
  it('P2-1: defaults to type="button" (form submit safety)', () => {
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

describe('Button — TailAdmin style', () => {
  it('primary applies shadow-theme-xs', () => {
    const { getByRole } = render(<Button label="Primary" />);
    expect(getByRole('button')).toHaveClass('shadow-theme-xs');
  });

  it('primary uses solid hover with opacity', () => {
    const { getByRole } = render(<Button label="Primary" />);
    expect(getByRole('button')).toHaveClass('bg-primary', 'hover:bg-primary/90');
  });

  it('default shape is rounded-lg', () => {
    const { getByRole } = render(<Button label="Default" />);
    expect(getByRole('button')).toHaveClass('rounded-lg');
  });

  it('rounded shape is rounded-full', () => {
    const { getByRole } = render(<Button shape="rounded" label="Pill" />);
    expect(getByRole('button')).toHaveClass('rounded-full');
  });

  it('sm size uses px-4 py-3', () => {
    const { getByRole } = render(<Button size="sm" label="Sm" />);
    expect(getByRole('button')).toHaveClass('px-4', 'py-3');
  });

  it('md size uses px-5 py-3.5', () => {
    const { getByRole } = render(<Button size="md" label="Md" />);
    expect(getByRole('button')).toHaveClass('px-5', 'py-3.5');
  });

  it('applies disabled styling', () => {
    const { getByRole } = render(<Button label="Disabled" disabled />);
    expect(getByRole('button')).toHaveClass(
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',
      'disabled:bg-primary/50',
    );
  });

  it('renders children in place of label', () => {
    const { getByRole } = render(<Button>Children</Button>);
    expect(getByRole('button', { name: /children/i })).toBeVisible();
  });
});

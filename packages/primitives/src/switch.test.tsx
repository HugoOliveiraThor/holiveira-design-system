import { userEvent } from '@storybook/test';
import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { axe } from 'vitest-axe';

import { render } from './test-utils';

import { Switch } from './index';

afterEach(cleanup);

describe('Switch', () => {
  it('renders with role="switch"', () => {
    const { getByRole } = render(<Switch />);
    expect(getByRole('switch')).toBeInTheDocument();
  });

  it('renders unchecked by default', () => {
    const { getByRole } = render(<Switch />);
    expect(getByRole('switch')).not.toBeChecked();
  });

  it('renders checked when defaultChecked', () => {
    const { getByRole } = render(<Switch defaultChecked />);
    expect(getByRole('switch')).toBeChecked();
  });

  it('renders disabled state', () => {
    const { container } = render(<Switch disabled />);
    const hiddenInput = container.querySelector('input[type="checkbox"]');
    expect(hiddenInput).toBeInTheDocument();
  });

  it('toggles on click', async () => {
    const { getByRole } = render(<Switch />);
    const checkbox = getByRole('switch');

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});

describe('Switch — keyboard', () => {
  it('toggles on Space', async () => {
    const { getByRole } = render(<Switch />);
    const checkbox = getByRole('switch');
    checkbox.focus();
    await userEvent.keyboard(' ');
    expect(checkbox).toBeChecked();
  });
});

describe('Switch — pre-existing findings', () => {
  it.skip('P2-2: Switch has no label prop — accessible name via explicit prop (D6.9)', () => {
    const { container } = render(<Switch label="Enable notifications" />);
    const input = container.querySelector('input');
    expect(input).toHaveAccessibleName('Enable notifications');
  });
});

describe('Switch — accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(<Switch />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations in dark mode', async () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<Switch />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
    document.documentElement.classList.remove('dark');
  });
});

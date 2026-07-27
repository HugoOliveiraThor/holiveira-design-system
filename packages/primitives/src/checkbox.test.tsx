import { userEvent } from '@storybook/test';
import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { axe } from 'vitest-axe';

import { render } from './test-utils';

import { Checkbox } from './index';

afterEach(cleanup);

describe('Checkbox', () => {
  it('renders with label', () => {
    const { getByLabelText } = render(<Checkbox label="Accept terms" />);
    expect(getByLabelText('Accept terms')).toBeVisible();
  });

  it('renders checked', () => {
    const { getByRole } = render(<Checkbox label="Checked" defaultChecked />);
    expect(getByRole('checkbox')).toBeChecked();
  });

  it('renders unchecked', () => {
    const { getByRole } = render(<Checkbox label="Unchecked" />);
    expect(getByRole('checkbox')).not.toBeChecked();
  });

  it('renders disabled state', () => {
    const { container } = render(<Checkbox label="Disabled" disabled />);
    const hiddenInput = container.querySelector('input[type="checkbox"]');
    expect(hiddenInput).toBeInTheDocument();
  });

  it('handles onChange', async () => {
    const onChange = vi.fn();
    const { getByRole } = render(<Checkbox label="Toggle" onChange={onChange} />);

    await userEvent.click(getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});

describe('Checkbox — keyboard', () => {
  it('toggles on Space', async () => {
    const { getByRole } = render(<Checkbox label="Toggle" />);
    const checkbox = getByRole('checkbox');
    checkbox.focus();
    await userEvent.keyboard(' ');
    expect(checkbox).toBeChecked();
  });
});

describe('Checkbox — accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(<Checkbox label="Accept" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations in dark mode', async () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<Checkbox label="Dark" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
    document.documentElement.classList.remove('dark');
  });
});

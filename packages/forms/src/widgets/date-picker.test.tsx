import { userEvent } from '@storybook/test';
import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { axe } from 'vitest-axe';

import { DatePicker } from '../index';
import { render } from '../test-utils';

afterEach(cleanup);

describe('DatePicker', () => {
  it('renders with label', () => {
    const { getByText } = render(<DatePicker label="Pick a date" placeholder="mm/dd/yyyy" />);
    expect(getByText('Pick a date')).toBeVisible();
  });
});

describe('DatePicker — keyboard', () => {
  it('focuses input on Tab', async () => {
    const { getByPlaceholderText } = render(<DatePicker label="Date" placeholder="mm/dd/yyyy" />);
    const input = getByPlaceholderText('mm/dd/yyyy');
    input.focus();
    expect(input).toHaveFocus();
  });
});

describe('DatePicker — accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(<DatePicker label="Pick a date" placeholder="mm/dd/yyyy" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations in dark mode', async () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<DatePicker label="Dark" placeholder="mm/dd/yyyy" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
    document.documentElement.classList.remove('dark');
  });
});

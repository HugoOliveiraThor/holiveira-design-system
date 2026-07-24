import { userEvent } from '@storybook/test';
import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from './test-utils';

import { Switch } from './index';

afterEach(cleanup);

describe('Switch', () => {
  it('renders unchecked by default', () => {
    const { getByRole } = render(<Switch />);
    expect(getByRole('checkbox')).not.toBeChecked();
  });

  it('renders checked when defaultChecked', () => {
    const { getByRole } = render(<Switch defaultChecked />);
    expect(getByRole('checkbox')).toBeChecked();
  });

  it('renders disabled state', () => {
    const { container } = render(<Switch disabled />);
    const hiddenInput = container.querySelector('input[type="checkbox"]');
    expect(hiddenInput).toBeInTheDocument();
  });

  it('toggles on click', async () => {
    const { getByRole } = render(<Switch />);
    const checkbox = getByRole('checkbox');

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});

import { userEvent } from '@storybook/test';
import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from './test-utils';

import { Radio } from './index';

afterEach(cleanup);

describe('Radio', () => {
  it('renders with label', () => {
    const { getByLabelText } = render(<Radio label="Option A" name="group" />);
    expect(getByLabelText('Option A')).toBeVisible();
  });

  it('renders selected', () => {
    const { getByRole } = render(<Radio label="Selected" name="group" defaultChecked />);
    expect(getByRole('radio')).toBeChecked();
  });

  it('renders unselected', () => {
    const { getByRole } = render(<Radio label="Unselected" name="group" />);
    expect(getByRole('radio')).not.toBeChecked();
  });

  it('renders disabled state', () => {
    const { container } = render(<Radio label="Disabled" name="group" disabled />);
    const hiddenInput = container.querySelector('input[type="radio"]');
    expect(hiddenInput).toBeInTheDocument();
  });

  it('handles onChange', async () => {
    const onChange = vi.fn();
    const { getByRole } = render(<Radio label="Click" name="group" onChange={onChange} />);

    await userEvent.click(getByRole('radio'));
    expect(onChange).toHaveBeenCalled();
  });
});

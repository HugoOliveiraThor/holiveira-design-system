import { userEvent } from '@storybook/test';
import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { axe } from 'vitest-axe';

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

describe('Radio — keyboard', () => {
  it('selects on Space', async () => {
    const onChange = vi.fn();
    const { getByRole } = render(<Radio label="Option" name="group" onChange={onChange} />);
    const radio = getByRole('radio');
    radio.focus();
    await userEvent.keyboard(' ');
    expect(onChange).toHaveBeenCalled();
  });

  it('navigates with ArrowDown', async () => {
    const onChange = vi.fn();
    const { getByRole } = render(
      <div>
        <Radio label="A" name="group" defaultChecked />
        <Radio label="B" name="group" onChange={onChange} />
      </div>,
    );
    const radios = document.querySelectorAll('input[type="radio"]');
    (radios[0] as HTMLElement).focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(onChange).toHaveBeenCalled();
  });
});

describe('Radio — accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(<Radio label="Option" name="group" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations in dark mode', async () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<Radio label="Dark" name="group" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
    document.documentElement.classList.remove('dark');
  });
});

import { userEvent } from '@storybook/test';
import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { axe } from 'vitest-axe';

import { Submit } from '../index';
import { render } from '../test-utils';

afterEach(cleanup);

describe('Submit', () => {
  it('renders with children', () => {
    const { getByRole } = render(<Submit>Save</Submit>);
    expect(getByRole('button', { name: /save/i })).toBeVisible();
  });

  it('renders disabled', () => {
    const { getByRole } = render(<Submit disabled>Disabled</Submit>);
    expect(getByRole('button', { name: /disabled/i })).toBeDisabled();
  });

  it('renders type="submit"', () => {
    const { container } = render(<Submit>Save</Submit>);
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('type', 'submit');
  });
});

describe('Submit — keyboard', () => {
  it('activates on Enter', async () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Submit onClick={onClick}>Save</Submit>);
    const button = getByRole('button', { name: /save/i });
    button.focus();
    await userEvent.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalled();
  });

  it('activates on Space', async () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Submit onClick={onClick}>Save</Submit>);
    const button = getByRole('button', { name: /save/i });
    button.focus();
    await userEvent.keyboard(' ');
    expect(onClick).toHaveBeenCalled();
  });
});

describe('Submit — accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(<Submit>Save</Submit>);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations in dark mode', async () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<Submit>Save</Submit>);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
    document.documentElement.classList.remove('dark');
  });
});

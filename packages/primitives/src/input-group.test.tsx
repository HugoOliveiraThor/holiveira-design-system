import { userEvent } from '@storybook/test';
import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { axe } from 'vitest-axe';

import { render } from './test-utils';

import { InputGroup } from './index';

afterEach(cleanup);

describe('InputGroup', () => {
  it('renders with label', () => {
    const { getByLabelText } = render(<InputGroup label="Name" placeholder="Enter name" />);
    expect(getByLabelText('Name')).toBeVisible();
  });

  it('renders text type', () => {
    const { container } = render(<InputGroup type="text" label="Text" placeholder="text" />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.type).toBe('text');
  });

  it('renders email type', () => {
    const { container } = render(<InputGroup type="email" label="Email" placeholder="email" />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.type).toBe('email');
  });

  it('renders password type', () => {
    const { getByLabelText } = render(
      <InputGroup type="password" label="Password" placeholder="pass" />,
    );
    const input = getByLabelText('Password') as HTMLInputElement;
    expect(input.type).toBe('password');
  });

  it('renders with error message', () => {
    const { getByText } = render(
      <InputGroup type="text" label="Field" placeholder="test" error="This field is required" />,
    );
    expect(getByText('This field is required')).toBeVisible();
  });

  it('handles input change', async () => {
    const { getByPlaceholderText } = render(
      <InputGroup type="text" label="Type" placeholder="..." />,
    );
    const input = getByPlaceholderText('...') as HTMLInputElement;

    await userEvent.type(input, 'hello');
    expect(input).toHaveValue('hello');
  });
});

describe('InputGroup — keyboard', () => {
  it('focuses on Tab', async () => {
    const { getByRole } = render(<InputGroup label="Name" placeholder="Enter" />);
    const input = getByRole('textbox');
    input.focus();
    expect(input).toHaveFocus();
  });

  it('accepts text input', async () => {
    const { getByRole } = render(<InputGroup label="Name" placeholder="Enter" />);
    const input = getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, 'test');
    expect(input).toHaveValue('test');
  });
});

describe('InputGroup — accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(<InputGroup label="Name" placeholder="Enter" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no axe violations in dark mode', async () => {
    document.documentElement.classList.add('dark');
    const { container } = render(<InputGroup label="Name" placeholder="Enter" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
    document.documentElement.classList.remove('dark');
  });
});

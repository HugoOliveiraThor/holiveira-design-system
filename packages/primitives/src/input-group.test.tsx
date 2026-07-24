import { userEvent } from '@storybook/test';
import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

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

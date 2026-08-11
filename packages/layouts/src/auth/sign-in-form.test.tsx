import { cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from '../test-utils';

import { SignInForm } from './sign-in-form';

afterEach(cleanup);

describe('SignInForm', () => {
  it('renders email and password labels and submit button', () => {
    const { getByLabelText, getByRole } = render(<SignInForm onSubmit={() => {}} />);
    expect(getByLabelText(/^email/i)).toBeVisible();
    expect(getByLabelText(/^password/i)).toBeVisible();
    expect(getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  it('calls onSubmit with email password and remember on submit', () => {
    const onSubmit = vi.fn();
    const { getByLabelText, getByRole } = render(<SignInForm onSubmit={onSubmit} />);
    fireEvent.change(getByLabelText(/^email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(getByLabelText(/^password/i), { target: { value: 'secret' } });
    fireEvent.click(getByRole('button', { name: /sign in/i }));
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'a@b.com',
      password: 'secret',
      remember: false,
    });
  });

  it('toggles password visibility on eye click', () => {
    const { getByLabelText, getByRole } = render(<SignInForm onSubmit={() => {}} />);
    const input = getByLabelText(/^password/i) as HTMLInputElement;
    expect(input.type).toBe('password');
    fireEvent.click(getByRole('button', { name: /show password|hide password/i }));
    expect((getByLabelText(/^password/i) as HTMLInputElement).type).toBe('text');
  });

  it('does not render social buttons by default', () => {
    const { queryByText } = render(<SignInForm onSubmit={() => {}} />);
    expect(queryByText(/sign in with google/i)).toBeNull();
    expect(queryByText('Or')).toBeNull();
  });

  it('renders social buttons and divider when socialProviders provided', () => {
    const { getByText } = render(
      <SignInForm
        onSubmit={() => {}}
        socialProviders={[
          { provider: 'google', label: 'Sign in with Google' },
          { provider: 'x', label: 'Sign in with X' },
        ]}
      />,
    );
    expect(getByText(/sign in with google/i)).toBeVisible();
    expect(getByText(/sign in with x/i)).toBeVisible();
    expect(getByText('Or')).toBeVisible();
  });

  it('disables submit when submitting', () => {
    const { getByRole } = render(<SignInForm onSubmit={() => {}} submitting />);
    expect(getByRole('button', { name: /signing in|sign in/i })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('renders error message', () => {
    const { getByText } = render(<SignInForm onSubmit={() => {}} error="Invalid credentials" />);
    expect(getByText('Invalid credentials')).toBeVisible();
  });

  it('renders forgot and signup links with custom hrefs', () => {
    const { getByRole } = render(
      <SignInForm onSubmit={() => {}} forgotHref="/reset" signupHref="/register" />,
    );
    expect(getByRole('link', { name: /forgot password/i })).toHaveAttribute('href', '/reset');
    expect(getByRole('link', { name: /sign up/i })).toHaveAttribute('href', '/register');
  });
});

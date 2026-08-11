import { cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from '../test-utils';

import { SignUpForm } from './sign-up-form';

afterEach(cleanup);

describe('SignUpForm', () => {
  it('renders all field labels and submit button', () => {
    const { getByLabelText, getByRole } = render(<SignUpForm onSubmit={() => {}} />);
    expect(getByLabelText(/^first name/i)).toBeVisible();
    expect(getByLabelText(/^last name/i)).toBeVisible();
    expect(getByLabelText(/^email/i)).toBeVisible();
    expect(getByLabelText(/^password/i)).toBeVisible();
    expect(getByRole('button', { name: /sign up/i })).toBeVisible();
  });

  it('calls onSubmit with all values on submit', () => {
    const onSubmit = vi.fn();
    const { getByLabelText, getByRole } = render(<SignUpForm onSubmit={onSubmit} />);
    fireEvent.change(getByLabelText(/^first name/i), { target: { value: 'Joao' } });
    fireEvent.change(getByLabelText(/^last name/i), { target: { value: 'Silva' } });
    fireEvent.change(getByLabelText(/^email/i), { target: { value: 'a@b.com' } });
    fireEvent.change(getByLabelText(/^password/i), { target: { value: 'secret' } });
    fireEvent.click(getByRole('button', { name: /sign up/i }));
    expect(onSubmit).toHaveBeenCalledWith({
      firstName: 'Joao',
      lastName: 'Silva',
      email: 'a@b.com',
      password: 'secret',
      termsAgreed: false,
    });
  });

  it('toggles password visibility on eye click', () => {
    const { getByLabelText, getByRole } = render(<SignUpForm onSubmit={() => {}} />);
    const input = getByLabelText(/^password/i) as HTMLInputElement;
    expect(input.type).toBe('password');
    fireEvent.click(getByRole('button', { name: /show password|hide password/i }));
    expect((getByLabelText(/^password/i) as HTMLInputElement).type).toBe('text');
  });

  it('does not render social buttons by default', () => {
    const { queryByText } = render(<SignUpForm onSubmit={() => {}} />);
    expect(queryByText(/sign up with google/i)).toBeNull();
    expect(queryByText('Or')).toBeNull();
  });

  it('renders social buttons and divider when socialProviders provided', () => {
    const { getByText } = render(
      <SignUpForm
        onSubmit={() => {}}
        socialProviders={[
          { provider: 'google', label: 'Sign up with Google' },
          { provider: 'x', label: 'Sign up with X' },
        ]}
      />,
    );
    expect(getByText(/sign up with google/i)).toBeVisible();
    expect(getByText(/sign up with x/i)).toBeVisible();
    expect(getByText('Or')).toBeVisible();
  });

  it('disables submit when submitting', () => {
    const { getByRole } = render(<SignUpForm onSubmit={() => {}} submitting />);
    expect(getByRole('button', { name: /signing up|sign up/i })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('renders error message', () => {
    const { getByText } = render(<SignUpForm onSubmit={() => {}} error="Email already exists" />);
    expect(getByText('Email already exists')).toBeVisible();
  });

  it('renders terms and privacy links with custom hrefs', () => {
    const { getByText } = render(
      <SignUpForm onSubmit={() => {}} termsHref="/legal/terms" privacyHref="/legal/privacy" />,
    );
    expect(getByText(/terms and conditions/i)).toHaveAttribute('href', '/legal/terms');
    expect(getByText(/privacy policy/i)).toHaveAttribute('href', '/legal/privacy');
  });

  it('renders signin link with custom href', () => {
    const { getByRole } = render(<SignUpForm onSubmit={() => {}} signinHref="/login" />);
    expect(getByRole('link', { name: /sign in/i })).toHaveAttribute('href', '/login');
  });
});

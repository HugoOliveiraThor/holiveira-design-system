import { cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from '../test-utils';

import { PasswordResetForm } from './password-reset-form';

afterEach(cleanup);

describe('PasswordResetForm', () => {
  it('renders heading, email label, and submit button', () => {
    const { getByRole, getByLabelText, getByText } = render(
      <PasswordResetForm onSubmit={() => {}} />,
    );
    expect(getByText(/forgot your password/i)).toBeVisible();
    expect(getByLabelText(/^email/i)).toBeVisible();
    expect(getByRole('button', { name: /send reset link/i })).toBeVisible();
  });

  it('calls onSubmit with email on submit', () => {
    const onSubmit = vi.fn();
    const { getByLabelText, getByRole } = render(<PasswordResetForm onSubmit={onSubmit} />);
    fireEvent.change(getByLabelText(/^email/i), { target: { value: 'a@b.com' } });
    fireEvent.click(getByRole('button', { name: /send reset link/i }));
    expect(onSubmit).toHaveBeenCalledWith({ email: 'a@b.com' });
  });

  it('disables submit when submitting', () => {
    const { getByRole } = render(<PasswordResetForm onSubmit={() => {}} submitting />);
    expect(getByRole('button', { name: /sending|send reset link/i })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('renders error message', () => {
    const { getByText } = render(<PasswordResetForm onSubmit={() => {}} error="Email not found" />);
    expect(getByText('Email not found')).toBeVisible();
  });

  it('renders signin link with custom href', () => {
    const { getByRole } = render(<PasswordResetForm onSubmit={() => {}} signinHref="/login" />);
    expect(getByRole('link', { name: /click here/i })).toHaveAttribute('href', '/login');
  });
});

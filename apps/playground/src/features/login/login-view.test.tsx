import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { DEMO_EMAIL, DEMO_PASSWORD, LoginView } from './login-view';

afterEach(cleanup);

function signIn(email: string, password: string) {
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: email } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: password } });
  fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
}

describe('LoginView', () => {
  it('shows the authenticated state for demo credentials', () => {
    render(<LoginView />);

    signIn(DEMO_EMAIL, DEMO_PASSWORD);

    expect(screen.getByRole('heading', { name: 'Signed in' })).toBeVisible();
    expect(screen.getByText('Demo User')).toBeVisible();
  });

  it('shows an error for wrong credentials', () => {
    render(<LoginView />);

    signIn(DEMO_EMAIL, 'wrong-password');

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid demo credentials');
    expect(screen.getByLabelText('Email')).toHaveValue(DEMO_EMAIL);
    expect(screen.getByLabelText('Password')).toHaveValue('wrong-password');
    expect(screen.queryByRole('heading', { name: 'Signed in' })).not.toBeInTheDocument();
  });

  it('returns to the unauthenticated state on logout', () => {
    render(<LoginView />);

    signIn(DEMO_EMAIL, DEMO_PASSWORD);
    fireEvent.click(screen.getByRole('button', { name: 'Log out' }));

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeVisible();
    expect(screen.queryByText('Demo User')).not.toBeInTheDocument();
  });

  it('labels the demo credentials', () => {
    render(<LoginView />);

    expect(screen.getByText(/Demo credentials:/)).toHaveTextContent(DEMO_EMAIL);
    expect(screen.getByText(/Demo credentials:/)).toHaveTextContent(DEMO_PASSWORD);
    expect(screen.getByText(/No backend and no protected routes/)).toBeVisible();
  });
});

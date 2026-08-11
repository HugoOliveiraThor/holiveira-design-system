import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from '../test-utils';

import { AuthLayout } from './auth-layout';

afterEach(cleanup);

describe('AuthLayout', () => {
  it('renders children', () => {
    const { getByText } = render(<AuthLayout>SignInForm</AuthLayout>);
    expect(getByText('SignInForm')).toBeVisible();
  });

  it('renders brand panel with logo and text', () => {
    const { container, getByText } = render(
      <AuthLayout brandLogo={<span>Logo</span>} brandText="Free Admin Template">
        form
      </AuthLayout>,
    );
    expect(getByText('Logo')).toBeVisible();
    expect(getByText('Free Admin Template')).toBeVisible();
    expect(container.querySelector('[class*="brand-950"]')).not.toBeNull();
  });

  it('renders brand panel without brandText', () => {
    const { container } = render(<AuthLayout brandLogo={<span>Logo</span>}>form</AuthLayout>);
    expect(container.querySelector('[class*="brand-950"]')).not.toBeNull();
  });

  it('renders back link with default href', () => {
    const { getByRole } = render(<AuthLayout>form</AuthLayout>);
    expect(getByRole('link', { name: /back to dashboard/i })).toHaveAttribute('href', '/');
  });

  it('renders back link with custom backHref', () => {
    const { getByRole } = render(<AuthLayout backHref="/login">form</AuthLayout>);
    expect(getByRole('link', { name: /back to dashboard/i })).toHaveAttribute('href', '/login');
  });

  it('hides brand panel on mobile', () => {
    const { container } = render(<AuthLayout brandLogo={<span>Logo</span>}>form</AuthLayout>);
    const panel = container.querySelector('[class*="hidden"]');
    expect(panel).not.toBeNull();
    expect(panel?.className).toContain('hidden');
    expect(panel?.className).toContain('lg:grid');
  });
});

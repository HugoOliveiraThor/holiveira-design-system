import { cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import { render } from './test-utils';

import { Alert } from './index';

afterEach(cleanup);

describe('Alert', () => {
  it('renders role alert with title and description', () => {
    const { getByRole, getByText } = render(
      <Alert title="Test Alert" description="This is a test" />,
    );
    expect(getByRole('alert')).toBeVisible();
    expect(getByText('Test Alert')).toBeVisible();
    expect(getByText('This is a test')).toBeVisible();
  });

  it.each(['success', 'warning', 'error', 'info'] as const)('renders %s variant', (variant) => {
    const { getByRole } = render(
      <Alert variant={variant} title="Title" description="Description" />,
    );
    expect(getByRole('alert')).toBeVisible();
  });

  it('defaults to info variant', () => {
    const { getByRole } = render(<Alert title="Title" description="Description" />);
    expect(getByRole('alert')).toHaveClass('border-blue-light-500');
  });

  it('renders link when provided', () => {
    const { getByRole } = render(
      <Alert
        variant="success"
        title="Title"
        description="Description"
        link={{ label: 'Learn more', href: '/learn' }}
      />,
    );
    const link = getByRole('link');
    expect(link).toHaveAttribute('href', '/learn');
    expect(link).toHaveTextContent('Learn more');
  });

  it('does not render link when absent', () => {
    const { queryByRole } = render(<Alert title="Title" description="Description" />);
    expect(queryByRole('link')).not.toBeInTheDocument();
  });
});

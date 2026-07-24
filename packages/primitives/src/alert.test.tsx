import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from './test-utils';

import { Alert } from './index';

afterEach(cleanup);

describe('Alert', () => {
  it('renders with title and description', () => {
    const { getByText } = render(<Alert title="Test Alert" description="This is a test" />);
    expect(getByText('Test Alert')).toBeVisible();
    expect(getByText('This is a test')).toBeVisible();
  });

  it('renders success variant', () => {
    const { getByRole, getByText } = render(
      <Alert variant="success" title="Success" description="Operation completed" />,
    );
    expect(getByRole('alert')).toBeVisible();
    expect(getByText('Success')).toBeVisible();
  });

  it('renders warning variant', () => {
    const { getByText } = render(
      <Alert variant="warning" title="Warning" description="Review required" />,
    );
    expect(getByText('Warning')).toBeVisible();
  });

  it('renders error variant', () => {
    const { getByText } = render(
      <Alert variant="error" title="Error" description="Something went wrong" />,
    );
    expect(getByText('Error')).toBeVisible();
  });
});

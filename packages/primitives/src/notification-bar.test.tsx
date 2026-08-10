import { cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from './test-utils';

import { NotificationBar } from './index';

afterEach(cleanup);

describe('NotificationBar', () => {
  it('renders title', () => {
    const { getByText } = render(<NotificationBar title="Success! Action Completed" />);
    expect(getByText('Success! Action Completed')).toBeVisible();
  });

  it.each([
    ['success', 'border-success-500'],
    ['info', 'border-blue-light-500'],
    ['warning', 'border-warning-500'],
    ['error', 'border-error-500'],
  ] as const)('renders %s variant', (variant, expectedClass) => {
    const { container } = render(<NotificationBar variant={variant} title="Notice" />);
    expect(container.querySelector('div[class*="rounded-md"]')).toHaveClass(expectedClass);
  });

  it('renders close button by default', () => {
    const { getByRole } = render(<NotificationBar title="Notice" />);
    expect(getByRole('button', { name: /close notification/i })).toBeVisible();
  });

  it('fires onClose when close clicked', () => {
    const onClose = vi.fn();
    const { getByRole } = render(<NotificationBar title="Notice" onClose={onClose} />);
    fireEvent.click(getByRole('button', { name: /close notification/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('omits close button when closable false', () => {
    const { queryByRole } = render(<NotificationBar title="Notice" closable={false} />);
    expect(queryByRole('button', { name: /close notification/i })).toBeNull();
  });
});

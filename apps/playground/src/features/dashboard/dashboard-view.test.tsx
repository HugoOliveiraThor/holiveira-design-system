import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('next/dynamic', () => ({
  default: () => {
    const MockChart = () => <div data-testid="apex-chart" />;
    MockChart.displayName = 'MockChart';
    return MockChart;
  },
}));

import { DashboardView } from './dashboard-view';

afterEach(cleanup);

describe('DashboardView', () => {
  it('renders three stat cards', () => {
    const { rerender } = render(<DashboardView />);

    const metrics = screen.getByRole('region', { name: 'Key metrics' });
    expect(metrics.children).toHaveLength(3);
    expect(within(metrics).getByText('Total revenue')).toBeVisible();
    expect(within(metrics).getByText('$128,450.00')).toBeVisible();
    expect(within(metrics).getByText('1,204')).toBeVisible();
    expect(within(metrics).getAllByText('24').length).toBeGreaterThan(0);

    rerender(<DashboardView orders={[]} />);
    expect(screen.getByText('No orders yet.')).toBeVisible();
  });

  it('renders the area and bar charts', async () => {
    render(<DashboardView />);

    expect(await screen.findByRole('img', { name: 'Monthly revenue' })).toBeVisible();
    expect(await screen.findByRole('img', { name: 'Monthly orders' })).toBeVisible();
    expect(await screen.findAllByTestId('apex-chart')).toHaveLength(2);
  });
});

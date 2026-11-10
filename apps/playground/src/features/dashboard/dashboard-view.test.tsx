import { formatCurrency } from '@ho-dev/i18n';

import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

interface ChartStubProps {
  label: string;
  series: { name: string; data: unknown[] }[];
}

vi.mock('@ho-dev/charts', () => {
  function AreaChart({ label, series }: ChartStubProps) {
    return (
      <div
        data-testid="area-chart"
        role="img"
        aria-label={label}
        data-series-name={series[0]?.name}
        data-series-points={series[0]?.data.length}
      />
    );
  }

  function BarChart({ label, series }: ChartStubProps) {
    return (
      <div
        data-testid="bar-chart"
        role="img"
        aria-label={label}
        data-series-name={series[0]?.name}
        data-series-points={series[0]?.data.length}
      />
    );
  }

  return { AreaChart, BarChart };
});

import { orders } from '../../data/mock-data';

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

  it('renders order amounts with formatCurrency', () => {
    render(<DashboardView />);

    const table = screen.getByRole('table', { name: 'Recent orders' });
    const firstRow = within(table).getAllByRole('row')[1];
    const amountCell = within(firstRow).getAllByRole('cell')[2];

    expect(amountCell.textContent).toBe(formatCurrency(orders[0].amount));
    expect(amountCell.textContent).toBe('$1,240.50');
  });

  it('renders the area and bar charts', () => {
    render(<DashboardView />);

    expect(screen.getAllByTestId('area-chart')).toHaveLength(1);
    expect(screen.getAllByTestId('bar-chart')).toHaveLength(1);

    const area = screen.getByTestId('area-chart');
    const bar = screen.getByTestId('bar-chart');

    expect(area).toHaveAccessibleName('Monthly revenue');
    expect(bar).toHaveAccessibleName('Monthly orders');

    expect(area).toHaveAttribute('data-series-name', 'Revenue');
    expect(bar).toHaveAttribute('data-series-name', 'Orders');
    expect(area).toHaveAttribute('data-series-points', '12');
    expect(bar).toHaveAttribute('data-series-points', '12');
  });
});

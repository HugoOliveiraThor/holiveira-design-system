import { cleanup, render, screen, waitFor } from '@testing-library/react';
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

describe('DashboardView loading state', () => {
  it('shows the chart skeleton while loading', async () => {
    render(<DashboardView />);

    expect(screen.getAllByRole('status', { name: 'Chart loading' })).toHaveLength(2);

    await waitFor(() =>
      expect(screen.queryAllByRole('status', { name: 'Chart loading' })).toHaveLength(0),
    );
  });
});

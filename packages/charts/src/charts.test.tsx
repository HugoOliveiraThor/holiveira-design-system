import { vi, describe, it, expect } from 'vitest';

vi.mock('next/dynamic', () => ({
  default: () => {
    const MockChart = () => null;
    MockChart.displayName = 'MockChart';
    return MockChart;
  },
}));

vi.mock('./lazy-bar-chart', async () => {
  const m = await import('./bar-chart');
  return { BarChart: m.BarChart };
});

vi.mock('./lazy-area-chart', async () => {
  const m = await import('./area-chart');
  return { AreaChart: m.AreaChart };
});

vi.mock('./lazy-pie-chart', async () => {
  const m = await import('./pie-chart');
  return { PieChart: m.PieChart };
});

import { render } from './test-utils';

import { BarChart, AreaChart, PieChart } from './index';

const sampleSeries = [
  {
    name: 'Revenue',
    data: [
      { x: 'Jan', y: 100 },
      { x: 'Feb', y: 200 },
    ],
  },
];
const sampleLabels = ['A', 'B', 'C'];
const samplePieSeries = [40, 30, 30];

describe('BarChart', () => {
  it('renders with series data', () => {
    const { container } = render(<BarChart series={sampleSeries} />);
    expect(container).toBeInTheDocument();
  });

  it('renders stacked variant', () => {
    const multi = [
      { name: 'A', data: [{ x: 'Jan', y: 100 }] },
      { name: 'B', data: [{ x: 'Jan', y: 200 }] },
    ];
    const { container } = render(<BarChart series={multi} stacked />);
    expect(container).toBeInTheDocument();
  });
});

describe('AreaChart', () => {
  it('renders with series data', () => {
    const { container } = render(<AreaChart series={sampleSeries} />);
    expect(container).toBeInTheDocument();
  });

  it('renders with custom height', () => {
    const { container } = render(<AreaChart series={sampleSeries} height={400} />);
    expect(container).toBeInTheDocument();
  });
});

describe('PieChart', () => {
  it('renders with series and labels', () => {
    const { container } = render(<PieChart series={samplePieSeries} labels={sampleLabels} />);
    expect(container).toBeInTheDocument();
  });

  it('renders with legend', () => {
    const { container } = render(<PieChart series={[50, 50]} labels={['One', 'Two']} />);
    expect(container).toBeInTheDocument();
  });
});

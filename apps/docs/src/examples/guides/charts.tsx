import { AreaChart, type ChartSeries } from '@ho-dev/charts';

/** The package already renders the chart lazily, behind a skeleton. */
const series: ChartSeries[] = [
  {
    name: 'Revenue',
    data: [
      { x: 'Jan', y: 4000 },
      { x: 'Feb', y: 3000 },
    ],
  },
];

export function RevenueChart() {
  return (
    <AreaChart
      series={series}
      height={350}
      label="Monthly revenue"
      description="Revenue for January and February."
    />
  );
}

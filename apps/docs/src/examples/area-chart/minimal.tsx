import { AreaChart } from '@ho-dev/charts';

export function AreaChartMinimal() {
  return (
    <AreaChart
      label="Weekly revenue"
      height={260}
      series={[
        {
          name: 'Revenue',
          data: [
            { x: 'Mon', y: 12 },
            { x: 'Tue', y: 18 },
            { x: 'Wed', y: 15 },
            { x: 'Thu', y: 24 },
            { x: 'Fri', y: 21 },
          ],
        },
      ]}
    />
  );
}

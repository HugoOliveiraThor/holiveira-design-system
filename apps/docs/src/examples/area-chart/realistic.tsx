'use client';

import { AreaChart, ChartSkeleton } from '@ho-dev/charts';

import { useEffect, useState } from 'react';

const series = [
  {
    name: 'This month',
    data: [
      { x: 'Week 1', y: 4200 },
      { x: 'Week 2', y: 5100 },
      { x: 'Week 3', y: 4750 },
      { x: 'Week 4', y: 6300 },
    ],
  },
  {
    name: 'Last month',
    data: [
      { x: 'Week 1', y: 3800 },
      { x: 'Week 2', y: 4400 },
      { x: 'Week 3', y: 4600 },
      { x: 'Week 4', y: 5200 },
    ],
  },
];

export function AreaChartRealistic() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ChartSkeleton height={300} />;
  }

  return (
    <AreaChart
      label="Revenue by week, this month compared with last month"
      description="Revenue grew in every week and closed the month 21% above the previous one."
      height={300}
      series={series}
    />
  );
}

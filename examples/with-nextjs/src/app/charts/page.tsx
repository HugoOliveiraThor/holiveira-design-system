'use client';

import { BarChart } from '@holiveira/charts';

const series = [
  {
    name: 'Values',
    data: [
      { x: 'A', y: 10 },
      { x: 'B', y: 20 },
      { x: 'C', y: 15 },
    ],
  },
];

export default function ChartsPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Charts</h1>
      <BarChart label="Values" series={series} />
    </main>
  );
}

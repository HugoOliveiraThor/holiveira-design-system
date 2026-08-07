'use client';

import { ChartSkeleton } from '@ho-dev/charts';

import { lazy, Suspense } from 'react';

const LazyAreaChart = lazy(() =>
  import('@ho-dev/charts').then((mod) => ({ default: mod.AreaChart })),
);

export default function ChartsPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Charts Example — AreaChart + React.lazy + ChartSkeleton</h1>
      <Suspense fallback={<ChartSkeleton />}>
        <LazyAreaChart
          label="Revenue"
          series={[
            {
              name: 'Revenue',
              data: [
                { x: 'Jan', y: 4000 },
                { x: 'Feb', y: 3000 },
              ],
            },
          ]}
          height={350}
        />
      </Suspense>
    </main>
  );
}

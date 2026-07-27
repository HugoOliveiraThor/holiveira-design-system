'use client';

import { lazy, Suspense } from 'react';

import type { AreaChartProps } from './area-chart';
import { ChartSkeleton } from './chart-skeleton';

const LazyAreaChart = lazy(() => import('./area-chart').then((m) => ({ default: m.AreaChart })));

export function AreaChart(props: AreaChartProps) {
  return (
    <Suspense fallback={<ChartSkeleton height={props.height} />}>
      <LazyAreaChart {...props} />
    </Suspense>
  );
}

AreaChart.displayName = 'AreaChart';

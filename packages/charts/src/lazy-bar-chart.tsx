'use client';

import { lazy, Suspense } from 'react';

import type { BarChartProps } from './bar-chart';
import { ChartSkeleton } from './chart-skeleton';

const LazyBarChart = lazy(() => import('./bar-chart').then((m) => ({ default: m.BarChart })));

export function BarChart(props: BarChartProps) {
  return (
    <Suspense fallback={<ChartSkeleton height={props.height} />}>
      <LazyBarChart {...props} />
    </Suspense>
  );
}

BarChart.displayName = 'BarChart';

'use client';

import { lazy, Suspense } from 'react';

import { ChartSkeleton } from './chart-skeleton';
import type { PieChartProps } from './pie-chart';

const LazyPieChart = lazy(() => import('./pie-chart').then((m) => ({ default: m.PieChart })));

export function PieChart(props: PieChartProps) {
  return (
    <Suspense fallback={<ChartSkeleton height={props.height} />}>
      <LazyPieChart {...props} />
    </Suspense>
  );
}

PieChart.displayName = 'PieChart';

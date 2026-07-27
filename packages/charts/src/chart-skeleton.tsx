'use client';

import { cn } from '@holiveira/utils';

export interface ChartSkeletonProps {
  height?: number;
  className?: string;
}

export function ChartSkeleton({ height = 370, className }: ChartSkeletonProps) {
  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ height }}
      role="status"
      aria-label="Chart loading"
    >
      <div className="flex h-full w-full items-end gap-2 p-4 motion-safe:animate-pulse">
        {[55, 70, 45, 85, 60, 75, 50, 80, 65, 90, 55, 72].map((pct, i) => (
          <div
            key={i}
            className="dark:bg-dark-2 h-full w-full rounded-sm bg-neutral-100"
            style={{ height: `${pct}%` }}
          />
        ))}
      </div>
      <span className="sr-only">Loading chart data...</span>
    </div>
  );
}

ChartSkeleton.displayName = 'ChartSkeleton';

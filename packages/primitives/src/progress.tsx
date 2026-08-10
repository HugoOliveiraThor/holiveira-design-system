'use client';

import { cva, cn, type VariantProps } from '@ho-dev/utils';

import { forwardRef, type HTMLAttributes } from 'react';

const progressVariants = cva('relative w-full bg-gray-200 dark:bg-gray-800', {
  variants: {
    size: {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4',
      xl: 'h-5',
    },
    shape: {
      default: 'rounded-sm',
      rounded: 'rounded-full',
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'rounded',
  },
});

/** @public */
type ProgressProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof progressVariants> & {
    value: number;
    label?: 'none' | 'outside' | 'inside';
  };

/**
 * Horizontal progress bar with value, size, shape, and optional percentage label.
 * @public
 */
const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, size, shape, label = 'none', className, ...props }, ref) => {
    const clamped = Math.min(100, Math.max(0, value));

    const bar = (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(progressVariants({ size, shape }), className)}
        {...props}
      >
        <div
          className={cn(
            'bg-primary absolute left-0 h-full',
            shape === 'rounded' ? 'rounded-full' : 'rounded-sm',
            label === 'inside' && 'flex items-center justify-center',
          )}
          style={{ width: `${clamped}%` }}
        >
          {label === 'inside' && (
            <span className="text-[10px] leading-tight font-medium text-white">{clamped}%</span>
          )}
        </div>
      </div>
    );

    if (label === 'outside') {
      return (
        <div className="flex items-center gap-3">
          <div className="w-full sm:max-w-[281px]">{bar}</div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-400">{clamped}%</span>
        </div>
      );
    }

    return bar;
  },
);

Progress.displayName = 'Progress';

export { Progress, progressVariants, type ProgressProps };

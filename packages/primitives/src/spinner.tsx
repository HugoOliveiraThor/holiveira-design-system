'use client';

import { cva, cn, type VariantProps } from '@ho-dev/utils';

import { forwardRef, type HTMLAttributes } from 'react';

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      xs: 'h-5 w-5',
      sm: 'h-7 w-7',
      md: 'h-9 w-9',
      lg: 'h-10 w-10',
      xl: 'h-12 w-12',
    },
    color: {
      primary: 'text-primary',
      white: 'text-white',
      gray: 'text-gray-400',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});

/** @public */
type SpinnerProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof spinnerVariants>;

/**
 * Circular arc spinner with size and color variants.
 * @public
 */
const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size, color, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn(spinnerVariants({ size, color }), className)}
        {...props}
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-full w-full">
          <circle
            cx="10"
            cy="10"
            r="8.5"
            stroke="currentColor"
            strokeWidth="3"
            opacity="0.25"
            className="text-gray-200 dark:text-gray-800"
          />
          <path
            d="M18.5172 10C19.3361 10 20.0113 9.33252 19.8903 8.52257C19.6474 6.89692 19.0062 5.34812 18.014 4.01868C16.7246 2.29109 14.9114 1.02642 12.8448 0.413166C10.7781 -0.200084 8.5686 -0.129079 6.54558 0.615599C4.9888 1.18865 3.60659 2.13704 2.51635 3.36711C1.97316 3.97997 2.17495 4.90767 2.86134 5.35436C3.54773 5.80104 4.45707 5.59214 5.03749 5.01442C5.75143 4.3038 6.61392 3.7506 7.57003 3.39866C8.9931 2.87482 10.5473 2.82488 12.0011 3.25626C13.4549 3.68764 14.7303 4.57726 15.6373 5.79251C16.2467 6.609 16.6679 7.5431 16.8787 8.52811C17.05 9.32892 17.6983 10 18.5172 10Z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  },
);

Spinner.displayName = 'Spinner';

export { Spinner, spinnerVariants, type SpinnerProps };

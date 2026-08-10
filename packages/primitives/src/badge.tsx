'use client';

import { cva, cn, type VariantProps } from '@ho-dev/utils';

import { forwardRef, type HTMLAttributes } from 'react';

const badgeVariants = cva(
  'inline-flex items-center justify-center gap-1 rounded-full py-0.5 text-sm font-medium',
  {
    variants: {
      variant: {
        primary: 'bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary',
        success: 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500',
        error: 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500',
        warning: 'bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400',
        info: 'bg-blue-light-50 text-blue-light-500 dark:bg-blue-light-500/15 dark:text-blue-light-500',
        light: 'bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80',
        dark: 'bg-gray-500 text-white dark:bg-white/5 dark:text-white',
      },
      fill: {
        light: '',
        solid: '',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        fill: 'solid',
        className: 'bg-primary dark:bg-primary text-white dark:text-white',
      },
      {
        variant: 'success',
        fill: 'solid',
        className: 'bg-success-500 dark:bg-success-500 text-white dark:text-white',
      },
      {
        variant: 'error',
        fill: 'solid',
        className: 'bg-error-500 dark:bg-error-500 text-white dark:text-white',
      },
      {
        variant: 'warning',
        fill: 'solid',
        className: 'bg-warning-500 dark:bg-warning-500 text-white dark:text-white',
      },
      {
        variant: 'info',
        fill: 'solid',
        className: 'bg-blue-light-500 dark:bg-blue-light-500 text-white dark:text-white',
      },
      {
        variant: 'light',
        fill: 'solid',
        className: 'bg-gray-400 text-white dark:bg-white/5 dark:text-white/80',
      },
      {
        variant: 'dark',
        fill: 'solid',
        className: 'bg-gray-800 text-white dark:bg-white/15 dark:text-white',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      fill: 'light',
    },
  },
);

const badgePadding = {
  none: 'px-2.5',
  left: 'pl-2 pr-2.5',
  right: 'pl-2.5 pr-2',
} as const;

/** @public */
type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
  };

/**
 * Badge with 7 color variants, light/solid fills, and optional icon.
 * @public
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, fill, icon, iconPosition = 'left', children, ...props }, ref) => {
    const padding = icon ? badgePadding[iconPosition] : badgePadding.none;

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, fill }), padding, className)}
        {...props}
      >
        {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
      </span>
    );
  },
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants, type BadgeProps };

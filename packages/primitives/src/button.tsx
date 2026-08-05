'use client';

import { cva, cn } from '@holiveira/utils';
import type { VariantProps } from '@holiveira/utils';

import { forwardRef, type HTMLAttributes } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary shadow-theme-xs hover:bg-primary/90 disabled:bg-primary/50 text-white',
        green: 'bg-green shadow-theme-xs hover:bg-green-dark disabled:bg-green/50 text-white',
        dark: 'bg-dark shadow-theme-xs hover:bg-dark-2 disabled:bg-dark/50 text-white dark:bg-white/10 dark:hover:bg-white/20',
        outlinePrimary:
          'text-primary ring-primary/40 hover:bg-primary/10 bg-white ring-1 ring-inset',
        outlineGreen: 'text-green ring-green/40 hover:bg-green/10 bg-white ring-1 ring-inset',
        outline:
          'bg-white text-gray-700 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300',
      },
      shape: {
        default: 'rounded-lg',
        rounded: 'rounded-full',
      },
      size: {
        sm: 'px-4 py-3 text-sm',
        md: 'px-5 py-3.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      shape: 'default',
      size: 'md',
    },
  },
);

/** @public */
type ButtonProps = HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    label?: string;
    icon?: React.ReactNode;
  };

/**
 * Button component with 6 variants, 2 shapes, and 2 sizes.
 * @public
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, icon, children, variant, shape, size, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(buttonVariants({ variant, shape, size }), className)}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children ?? label}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button, type ButtonProps };

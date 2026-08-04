'use client';

import { cva, cn } from '@holiveira/utils';
import type { VariantProps } from '@holiveira/utils';

import { forwardRef, type HTMLAttributes } from 'react';

const buttonVariants = cva(
  'shadow-theme-xs inline-flex items-center justify-center gap-2 text-center text-sm font-medium transition focus:outline-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary hover:bg-primary/90 text-white',
        green: 'bg-green hover:bg-green-dark text-white',
        dark: 'bg-dark hover:bg-dark-2 text-white dark:bg-white/10 dark:hover:bg-white/20',
        outlinePrimary:
          'text-primary ring-primary/40 hover:bg-primary/10 bg-white ring-1 ring-inset',
        outlineGreen: 'text-green ring-green/40 hover:bg-green/10 bg-white ring-1 ring-inset',
        outlineDark:
          'text-dark bg-white ring-1 ring-gray-300 ring-inset hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03]',
      },
      shape: {
        default: 'rounded-lg',
        rounded: 'rounded-full',
      },
      size: {
        md: 'px-4 py-3',
        lg: 'px-5 py-3.5',
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

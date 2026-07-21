'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cva, cn } from '@holiveira/utils';
import type { VariantProps } from '@holiveira/utils';

const buttonVariants = cva(
  'hover:bg-opacity-90 inline-flex items-center justify-center gap-2.5 text-center font-medium transition focus:outline-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white',
        green: 'bg-green text-white',
        dark: 'bg-dark text-white dark:bg-white/10',
        outlinePrimary: 'border-primary hover:bg-primary/10 text-primary border',
        outlineGreen: 'border-green hover:bg-green/10 text-green border',
        outlineDark:
          'border-dark hover:bg-dark/10 text-dark border dark:border-white/25 dark:text-white dark:hover:bg-white/10',
      },
      shape: {
        default: '',
        rounded: 'rounded-[5px]',
        full: 'rounded-full',
      },
      size: {
        default: 'px-10 py-3.5 lg:px-8 xl:px-10',
        small: 'px-6 py-[11px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      shape: 'default',
      size: 'default',
    },
  },
);

/** @public */
type ButtonProps = HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    label: string;
    icon?: React.ReactNode;
  };

/**
 * Button component with 6 variants, 3 shapes, and 2 sizes.
 * @public
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, icon, variant, shape, size, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, shape, size }), className)}
        {...props}
      >
        {icon && <span>{icon}</span>}
        {label}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button, type ButtonProps };

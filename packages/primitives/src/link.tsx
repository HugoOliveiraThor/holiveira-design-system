'use client';

import { cva, cn, type VariantProps } from '@ho-dev/utils';

import { forwardRef, type AnchorHTMLAttributes } from 'react';

const linkVariants = cva('text-sm font-normal transition-colors', {
  variants: {
    variant: {
      default: 'text-gray-500 dark:text-gray-400',
      primary: 'text-primary',
      success: 'text-success-500',
      error: 'text-error-500',
      warning: 'text-warning-500',
      info: 'text-blue-light-500',
      light: 'text-gray-400',
      dark: 'text-gray-800 dark:text-white/90',
    },
    underline: {
      true: 'underline',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const variantColors: Record<string, { light: string; dark?: string }> = {
  default: { light: 'text-gray-500', dark: 'text-gray-400' },
  primary: { light: 'text-primary' },
  success: { light: 'text-success-500' },
  error: { light: 'text-error-500' },
  warning: { light: 'text-warning-500' },
  info: { light: 'text-blue-light-500' },
  light: { light: 'text-gray-400' },
  dark: { light: 'text-gray-800', dark: 'text-white/90' },
};

/** @public */
type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof linkVariants> & {
    opacity?: 10 | 25 | 50 | 75 | 100;
  };

/**
 * Link with 8 color variants, optional underline, and opacity levels.
 * @public
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = 'default', underline, opacity = 100, children, ...props }, ref) => {
    const colors = variantColors[variant ?? 'default'];
    const opacityClass =
      opacity < 100
        ? cn(`${colors.light}/${opacity}`, colors.dark && `dark:${colors.dark}/${opacity}`)
        : '';

    return (
      <a
        ref={ref}
        className={cn(linkVariants({ variant, underline }), opacityClass, className)}
        {...props}
      >
        {children}
      </a>
    );
  },
);

Link.displayName = 'Link';

export { Link, linkVariants, type LinkProps };

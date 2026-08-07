'use client';

import { AlertErrorIcon, AlertInfoIcon, AlertSuccessIcon, AlertWarningIcon } from '@ho-dev/icons';
import { cva, cn } from '@ho-dev/utils';

import { forwardRef, type HTMLAttributes } from 'react';

const alertVariants = cva('rounded-xl border p-4', {
  variants: {
    variant: {
      success: 'border-success-500 bg-success-50 dark:border-success-500/30 dark:bg-success-500/15',
      warning: 'border-warning-500 bg-warning-50 dark:border-warning-500/30 dark:bg-warning-500/15',
      error: 'border-error-500 bg-error-50 dark:border-error-500/30 dark:bg-error-500/15',
      info: 'border-blue-light-500 bg-blue-light-50 dark:border-blue-light-500/30 dark:bg-blue-light-500/15',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

const icons = {
  success: AlertSuccessIcon,
  warning: AlertWarningIcon,
  error: AlertErrorIcon,
  info: AlertInfoIcon,
} as const;

const iconColors = {
  success: 'text-success-500',
  warning: 'text-warning-500',
  error: 'text-error-500',
  info: 'text-blue-light-500',
} as const;

/** @public */
type AlertProps = HTMLAttributes<HTMLDivElement> & {
  variant?: 'success' | 'warning' | 'error' | 'info';
  title: string;
  description: string;
  link?: { label: string; href: string };
};

/**
 * Alert with 4 severity variants (success, warning, error, info) and optional link.
 * @public
 */
const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, description, link, ...props }, ref) => {
    const IconComponent = icons[variant];

    return (
      <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
        <div className="flex items-start gap-3">
          <div className={cn('-mt-0.5 shrink-0', iconColors[variant])}>
            <IconComponent />
          </div>

          <div>
            <h4 className="mb-1 text-sm font-semibold text-gray-800 dark:text-white/90">{title}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            {link && (
              <a
                href={link.href}
                className="mt-3 inline-block text-sm font-medium text-gray-500 underline dark:text-gray-400"
              >
                {link.label}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  },
);

Alert.displayName = 'Alert';

export { Alert, alertVariants, type AlertProps };

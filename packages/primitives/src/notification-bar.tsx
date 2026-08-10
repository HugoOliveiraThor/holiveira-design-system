'use client';

import { CheckIcon, CloseIcon, AlertInfoIcon, AlertWarningIcon, XIcon } from '@ho-dev/icons';
import { cva, cn, type VariantProps } from '@ho-dev/utils';

import { forwardRef, type HTMLAttributes } from 'react';

const notificationBarVariants = cva(
  'shadow-theme-sm flex items-center justify-between gap-3 rounded-md border-b-4 bg-white p-3 dark:bg-[#1E2634]',
  {
    variants: {
      variant: {
        success: 'border-success-500',
        info: 'border-blue-light-500',
        warning: 'border-warning-500',
        error: 'border-error-500',
      },
    },
    defaultVariants: {
      variant: 'success',
    },
  },
);

const iconBoxVariants = cva('flex h-10 w-10 items-center justify-center rounded-lg', {
  variants: {
    variant: {
      success: 'bg-success-50 text-success-600 dark:bg-success-500/[0.15] dark:text-success-500',
      info: 'bg-blue-light-50 text-blue-light-500 dark:bg-blue-light-500/[0.15]',
      warning: 'bg-warning-50 text-warning-600 dark:bg-warning-500/[0.15] dark:text-orange-400',
      error: 'bg-error-50 text-error-600 dark:bg-error-500/[0.15] dark:text-error-500',
    },
  },
  defaultVariants: {
    variant: 'success',
  },
});

const icons = {
  success: CheckIcon,
  info: AlertInfoIcon,
  warning: AlertWarningIcon,
  error: XIcon,
} as const;

/** @public */
type NotificationBarProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof notificationBarVariants> & {
    title: string;
    closable?: boolean;
    onClose?: () => void;
  };

/**
 * Compact inline status notification with tinted icon box, title, and optional close.
 * @public
 */
const NotificationBar = forwardRef<HTMLDivElement, NotificationBarProps>(
  ({ variant = 'success', title, closable = true, onClose, className, ...props }, ref) => {
    const IconComponent = icons[variant ?? 'success'];

    return (
      <div ref={ref} className={cn(notificationBarVariants({ variant }), className)} {...props}>
        <div className="flex items-center gap-4">
          <div className={cn(iconBoxVariants({ variant }))}>
            <IconComponent size={24} />
          </div>
          <h4 className="text-sm text-gray-800 sm:text-base dark:text-white/90">{title}</h4>
        </div>
        {closable && (
          <button
            type="button"
            aria-label="Close notification"
            className="text-gray-400 hover:text-gray-800 dark:hover:text-white/90"
            onClick={onClose}
          >
            <CloseIcon size={24} />
          </button>
        )}
      </div>
    );
  },
);

NotificationBar.displayName = 'NotificationBar';

export { NotificationBar, notificationBarVariants, iconBoxVariants, type NotificationBarProps };

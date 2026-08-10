'use client';

import { CheckIcon, AlertInfoIcon, AlertWarningIcon, XIcon } from '@ho-dev/icons';
import { cva, cn } from '@ho-dev/utils';

import { forwardRef, type HTMLAttributes } from 'react';

const modalAlertHalo = cva('relative mb-7 flex items-center justify-center', {
  variants: {
    variant: {
      success: '',
      info: '',
      warning: '',
      danger: '',
    },
  },
  defaultVariants: {
    variant: 'success',
  },
});

const modalAlertHaloFill = cva('', {
  variants: {
    variant: {
      success: 'fill-success-50 dark:fill-success-500/15',
      info: 'fill-blue-light-50 dark:fill-blue-light-500/15',
      warning: 'fill-warning-50 dark:fill-warning-500/15',
      danger: 'fill-error-50 dark:fill-error-500/15',
    },
  },
  defaultVariants: {
    variant: 'success',
  },
});

const modalAlertSymbol = cva('absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', {
  variants: {
    variant: {
      success: 'text-success-600 dark:text-success-500',
      info: 'text-blue-light-500',
      warning: 'text-warning-600 dark:text-orange-400',
      danger: 'text-error-600 dark:text-error-500',
    },
  },
  defaultVariants: {
    variant: 'success',
  },
});

const haloPath =
  'M34.364 6.85053C38.6205 -2.28351 51.3795 -2.28351 55.636 6.85053C58.0129 11.951 63.5594 14.6722 68.9556 13.3853C78.6192 11.0807 86.5743 21.2433 82.2185 30.3287C79.7862 35.402 81.1561 41.5165 85.5082 45.0122C93.3019 51.2725 90.4628 63.9451 80.7747 66.1403C75.3648 67.3661 71.5265 72.2695 71.5572 77.9156C71.6123 88.0265 60.1169 93.6664 52.3918 87.3184C48.0781 83.7737 41.9219 83.7737 37.6082 87.3184C29.8831 93.6664 18.3877 88.0266 18.4428 77.9156C18.4735 72.2695 14.6352 67.3661 9.22531 66.1403C-0.462787 63.9451 -3.30193 51.2725 4.49185 45.0122C8.84391 41.5165 10.2138 35.402 7.78151 30.3287C3.42572 21.2433 11.3808 11.0807 21.0444 13.3853C26.4406 14.6722 31.9871 11.951 34.364 6.85053Z';

/** @public */
type ModalAlertProps = HTMLAttributes<HTMLDivElement> & {
  variant: 'success' | 'info' | 'warning' | 'danger';
  title: string;
  description: string;
  children?: React.ReactNode;
};

/**
 * Centered modal alert with large status icon, title, description, and action children.
 * @public
 */
const ModalAlert = forwardRef<HTMLDivElement, ModalAlertProps>(
  ({ variant = 'success', title, description, children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('text-center', className)} {...props}>
        <div className={cn(modalAlertHalo({ variant }))}>
          <svg
            width="90"
            height="90"
            viewBox="0 0 90 90"
            className={modalAlertHaloFill({ variant })}
          >
            <path d={haloPath} />
          </svg>
          <span className={cn(modalAlertSymbol({ variant }))}>
            {variant === 'success' ? (
              <CheckIcon size={38} />
            ) : variant === 'info' ? (
              <AlertInfoIcon size={38} />
            ) : variant === 'warning' ? (
              <AlertWarningIcon size={38} />
            ) : (
              <XIcon size={38} />
            )}
          </span>
        </div>
        <h4 className="sm:text-title-sm mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          {title}
        </h4>
        <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">{description}</p>
        {children && (
          <div className="mt-7 flex w-full items-center justify-center gap-3">{children}</div>
        )}
      </div>
    );
  },
);

ModalAlert.displayName = 'ModalAlert';

export { ModalAlert, type ModalAlertProps };

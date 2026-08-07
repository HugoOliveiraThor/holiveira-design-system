'use client';

import { CheckIcon, XIcon } from '@ho-dev/icons';
import { cn } from '@ho-dev/utils';

import { forwardRef, useId } from 'react';

/** @public */
type CheckboxProps = {
  label: string;
  withIcon?: 'check' | 'x';
  withBg?: boolean;
  minimal?: boolean;
  radius?: 'default' | 'md';
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'id' | 'className'>;

/**
 * Checkbox input with label, icon, and background variants.
 * Supports controlled and uncontrolled usage.
 * @public
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      name,
      checked,
      defaultChecked,
      onChange,
      withIcon,
      withBg,
      minimal,
      radius,
      className,
      ...props
    },
    ref,
  ) => {
    const id = useId();

    return (
      <div className={className}>
        <label
          htmlFor={id}
          className={cn(
            'flex cursor-pointer items-center select-none',
            !minimal && 'text-body-sm font-medium',
          )}
        >
          <div className="relative">
            <input
              type="checkbox"
              ref={ref}
              onChange={onChange}
              name={name}
              id={id}
              checked={checked}
              defaultChecked={defaultChecked}
              className="peer sr-only"
              {...props}
            />

            <div
              className={cn(
                'border-dark-5 peer-checked:border-primary focus-visible:border-primary focus-visible:ring-primary dark:border-dark-6 mr-2 flex size-5 items-center justify-center rounded border outline-0 peer-checked:*:block focus-visible:ring-1',
                withBg
                  ? 'peer-checked:bg-primary *:text-white'
                  : 'peer-checked:bg-gray-2 dark:peer-checked:bg-transparent',
                minimal && 'border-stroke dark:border-dark-3 mr-3',
                radius === 'md' && 'rounded-md',
              )}
            >
              {!withIcon && <span className="bg-primary hidden size-2.5 rounded-sm" />}

              {withIcon === 'check' && <CheckIcon className="text-primary hidden" />}

              {withIcon === 'x' && <XIcon className="text-primary hidden" />}
            </div>
          </div>
          <span>{label}</span>
        </label>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export { Checkbox, type CheckboxProps };

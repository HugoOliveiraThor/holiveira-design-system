'use client';

import { CheckIcon, XIcon } from '@holiveira/icons';
import { cn } from '@holiveira/utils';

import { forwardRef, useId } from 'react';

/** @public */
type SwitchProps = {
  withIcon?: boolean;
  background?: 'dark' | 'light';
  backgroundSize?: 'sm' | 'default';
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'id' | 'className'>;

/**
 * Toggle switch with icon and background variants.
 * Supports controlled and uncontrolled usage.
 * @public
 */
const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked,
      onChange,
      background,
      withIcon,
      backgroundSize,
      name,
      className,
      ...props
    },
    ref,
  ) => {
    const id = useId();

    return (
      <label
        htmlFor={id}
        className={cn('flex max-w-fit cursor-pointer items-center select-none', className)}
      >
        <div className="relative">
          <input
            type="checkbox"
            ref={ref}
            name={name}
            id={id}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            className="peer sr-only"
            aria-label={name || 'Toggle'}
            {...props}
          />
          <div
            className={cn('bg-gray-3 h-8 w-14 rounded-full dark:bg-[#5A616B]', {
              'h-5': backgroundSize === 'sm',
              'dark:bg-primary bg-[#212B36]': background === 'dark',
            })}
          />

          <div
            className={cn(
              'shadow-switch-1 absolute top-1 left-1 flex size-6 items-center justify-center rounded-full bg-white transition peer-checked:right-1 peer-checked:translate-x-full peer-checked:[&_.check-icon]:block peer-checked:[&_.x-icon]:hidden',
              {
                'shadow-switch-2 -top-1 left-0 size-7': backgroundSize === 'sm',
                'peer-checked:bg-primary peer-checked:dark:bg-white': background !== 'dark',
              },
            )}
          >
            {withIcon && (
              <>
                <CheckIcon className="check-icon dark:fill-dark hidden fill-white" />
                <XIcon className="x-icon" />
              </>
            )}
          </div>
        </div>
      </label>
    );
  },
);

Switch.displayName = 'Switch';

export { Switch, type SwitchProps };

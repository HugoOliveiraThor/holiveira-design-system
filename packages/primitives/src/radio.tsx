'use client';

import { cn } from '@holiveira/utils';
import { forwardRef, useId } from 'react';

/** @public */
type RadioProps = {
  variant?: 'dot' | 'circle';
  label: string;
  name?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minimal?: boolean;
  className?: string;
};

/**
 * Radio button with dot and circle variants.
 * Supports controlled and uncontrolled usage.
 * @public
 */
const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    { label, variant = 'dot', name, value, checked, defaultChecked, onChange, minimal, className },
    ref,
  ) => {
    const id = useId();

    return (
      <div className={className}>
        <label
          htmlFor={id}
          className="text-body-sm text-dark flex cursor-pointer items-center font-medium select-none dark:text-white"
        >
          <div className="relative">
            <input
              type="radio"
              ref={ref}
              name={name}
              id={id}
              value={value}
              checked={checked}
              defaultChecked={defaultChecked}
              onChange={onChange}
              className="peer sr-only"
            />
            <div
              className={cn(
                'mr-2 flex size-5 items-center justify-center rounded-full border peer-checked:*:block',
                {
                  'border-primary peer-checked:border-6': variant === 'circle',
                  'border-dark-5 peer-checked:border-primary peer-checked:bg-gray-2 dark:border-dark-6 dark:peer-checked:bg-dark-2':
                    variant === 'dot',
                },
                minimal && 'border-stroke dark:border-dark-3',
              )}
            >
              <span
                className={cn(
                  'bg-primary hidden size-2.5 rounded-full',
                  variant === 'circle' && 'bg-transparent',
                )}
              />
            </div>
          </div>
          <span>{label}</span>
        </label>
      </div>
    );
  },
);

Radio.displayName = 'Radio';

export { Radio, type RadioProps };

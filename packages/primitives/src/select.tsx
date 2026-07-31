'use client';

import { ChevronUpIcon } from '@holiveira/icons';
import { cn } from '@holiveira/utils';

import { forwardRef, useId } from 'react';

/** @public */
type SelectItem = {
  value: string;
  label: string;
};

/** @public */
type SelectProps = {
  label: string;
  items: SelectItem[];
  prefixIcon?: React.ReactNode;
  placeholder?: string;
  error?: string;
};

/**
 * Native select with typed items, placeholder, prefix icon, and error state.
 * @public
 */
const Select = forwardRef<
  HTMLSelectElement,
  SelectProps & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'>
>(({ items, label, defaultValue, placeholder, prefixIcon, error, className, ...props }, ref) => {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={cn('space-y-3', className)}>
      <label htmlFor={id} className="text-body-sm text-dark block font-medium dark:text-white">
        {label}
      </label>

      <div className="relative">
        {prefixIcon && <div className="absolute top-1/2 left-4 -translate-y-1/2">{prefixIcon}</div>}

        <select
          ref={ref}
          id={id}
          defaultValue={defaultValue ?? ''}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'border-stroke focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary [&>option]:text-dark-5 dark:[&>option]:text-dark-6 w-full appearance-none rounded-lg border bg-transparent px-5.5 py-3 transition outline-none',
            'has-[option:checked]:text-dark dark:has-[option:checked]:text-white',
            prefixIcon && 'pl-11.5',
            error && 'border-red focus:border-red',
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}

          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <ChevronUpIcon className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 rotate-180" />

        {error && (
          <p id={errorId} className="text-body-xs text-red mt-1">
            {error}
          </p>
        )}
      </div>
    </div>
  );
});

Select.displayName = 'Select';

export { Select, type SelectProps };

'use client';

import { cn } from '@holiveira/utils';

import { forwardRef, useId } from 'react';
import type { HTMLInputTypeAttribute } from 'react';

/** @public */
type InputGroupProps = {
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  fileStyleVariant?: 'style1' | 'style2';
  required?: boolean;
  disabled?: boolean;
  active?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  height?: 'sm' | 'default';
  error?: string;
};

/**
 * Text input with label, icon positioning, file variants, and error state.
 * @public
 */
const InputGroup = forwardRef<
  HTMLInputElement,
  InputGroupProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>
>(
  (
    {
      label,
      type = 'text',
      placeholder,
      required,
      disabled,
      active,
      icon,
      iconPosition,
      height,
      fileStyleVariant,
      error,
      className,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const errorId = `${id}-error`;

    return (
      <div className={className}>
        <label htmlFor={id} className="text-body-sm text-dark font-medium dark:text-white">
          {label}
          {required && <span className="text-red ml-1 select-none">*</span>}
        </label>

        <div
          className={cn(
            'relative mt-3 [&_svg]:absolute [&_svg]:top-1/2 [&_svg]:-translate-y-1/2',
            iconPosition === 'left' ? '[&_svg]:left-4.5' : '[&_svg]:right-4.5',
          )}
        >
          <input
            ref={ref}
            id={id}
            type={type}
            placeholder={placeholder}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              'border-stroke focus:border-primary disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary w-full rounded-lg border-[1.5px] bg-transparent transition outline-none disabled:cursor-default',
              type === 'file' && fileStyleVariant
                ? getFileStyles(fileStyleVariant)
                : 'text-dark placeholder:text-dark-6 px-5.5 py-3 dark:text-white',
              iconPosition === 'left' && 'pl-12.5',
              height === 'sm' && 'py-2.5',
              error && 'border-red focus:border-red',
            )}
            required={required}
            disabled={disabled}
            data-active={active || undefined}
            {...props}
          />

          {icon}
        </div>

        {error && (
          <p id={errorId} className="text-body-xs text-red mt-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);

InputGroup.displayName = 'InputGroup';

export { InputGroup, type InputGroupProps };

function getFileStyles(variant: 'style1' | 'style2') {
  switch (variant) {
    case 'style1':
      return [
        'file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke',
        'file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5',
        'file:hover:bg-primary file:hover:bg-opacity-10',
        'dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white',
      ].join(' ');
    default:
      return [
        'file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-stroke',
        'file:px-2.5 file:py-1 file:text-body-xs file:font-medium file:text-dark-5',
        'file:focus:border-primary',
        'dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white',
        'px-3 py-[9px]',
      ].join(' ');
  }
}

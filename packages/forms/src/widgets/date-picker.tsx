'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useId } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@holiveira/utils';
import flatpickr from 'flatpickr';
import { Label } from '../components/label';
import { ErrorMessage } from '../components/error-message';

interface DatePickerProps {
  label?: string;
  defaultValue?: Date | string;
  value?: Date | string;
  onChange?: (date: Date | null) => void;
  dateFormat?: string;
  placeholder?: string;
  icon?: ReactNode;
  error?: string;
  disabled?: boolean;
  className?: string;
  minDate?: Date | string;
  maxDate?: Date | string;
}

interface DatePickerRef {
  input: HTMLInputElement | null;
  flatpickr: flatpickr.Instance | null;
}

const DatePicker = forwardRef<DatePickerRef, DatePickerProps>(
  (
    {
      label,
      defaultValue,
      value: controlledValue,
      onChange,
      dateFormat = 'M j, Y',
      placeholder = 'mm/dd/yyyy',
      icon,
      error,
      disabled,
      className,
      minDate,
      maxDate,
    },
    ref,
  ) => {
    const id = useId();
    const inputRef = useRef<HTMLInputElement>(null);
    const fpRef = useRef<flatpickr.Instance | null>(null);
    const isControlled = controlledValue !== undefined;

    useImperativeHandle(ref, () => ({
      input: inputRef.current,
      flatpickr: fpRef.current,
    }));

    const prevValueRef = useRef(controlledValue);

    useEffect(() => {
      if (!inputRef.current) return;

      fpRef.current = flatpickr(inputRef.current, {
        mode: 'single',
        static: true,
        monthSelectorType: 'static',
        dateFormat,
        defaultDate: isControlled ? undefined : defaultValue,
        minDate,
        maxDate,
        onChange(dates) {
          onChange?.(dates[0] ?? null);
        },
      });

      return () => {
        fpRef.current?.destroy();
        fpRef.current = null;
      };
    }, []);

    useEffect(() => {
      if (isControlled && fpRef.current && controlledValue !== prevValueRef.current) {
        prevValueRef.current = controlledValue;
        if (controlledValue) {
          fpRef.current.setDate(controlledValue, false);
        } else {
          fpRef.current.clear();
        }
      }
    }, [isControlled, controlledValue]);

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && <Label htmlFor={id}>{label}</Label>}

        <div className="relative">
          <input
            ref={inputRef}
            id={id}
            className={cn(
              'border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary w-full rounded-[7px] border-[1.5px] bg-transparent px-5 py-3 font-normal transition-colors outline-none',
              icon && 'pr-12',
              error && 'border-red-500 focus:border-red-500 dark:border-red-500',
              disabled && 'cursor-not-allowed opacity-50',
            )}
            placeholder={placeholder}
            data-class="flatpickr-right"
            disabled={disabled}
          />

          {icon && (
            <div className="text-dark-4 dark:text-dark-6 pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
              {icon}
            </div>
          )}
        </div>

        {error && <ErrorMessage error={error} />}
      </div>
    );
  },
);
DatePicker.displayName = 'DatePicker';

export { DatePicker, type DatePickerProps, type DatePickerRef };

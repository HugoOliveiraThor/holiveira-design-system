'use client';

import { forwardRef, useId, useRef, useState, useCallback, useEffect } from 'react';
import { cn } from '@holiveira/utils';
import { useClickOutside } from '@holiveira/hooks';
import { Label } from '../components/label';
import { ErrorMessage } from '../components/error-message';

interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectProps {
  label?: string;
  options: MultiSelectOption[];
  defaultValue?: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      label,
      options,
      defaultValue = [],
      value: controlledValue,
      onChange,
      placeholder = 'Select options',
      error,
      disabled,
      className,
    },
    ref,
  ) => {
    const id = useId();
    const listboxId = `${id}-listbox`;
    const isControlled = controlledValue !== undefined;

    const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
    const selectedValues = isControlled ? controlledValue : internalValue;

    const [isOpen, setIsOpen] = useState(false);
    const [focusIndex, setFocusIndex] = useState(-1);

    const containerRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
    const comboboxRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);

    const setValue = useCallback(
      (newValue: string[]) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [isControlled, onChange],
    );

    const toggleOption = useCallback(
      (optionValue: string) => {
        if (disabled) return;
        const next = selectedValues.includes(optionValue)
          ? selectedValues.filter((v) => v !== optionValue)
          : [...selectedValues, optionValue];
        setValue(next);
      },
      [disabled, selectedValues, setValue],
    );

    const removeOption = useCallback(
      (optionValue: string) => {
        if (disabled) return;
        setValue(selectedValues.filter((v) => v !== optionValue));
      },
      [disabled, selectedValues, setValue],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (!isOpen) {
          if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(true);
            setFocusIndex(0);
          }
          return;
        }

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            setFocusIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
            break;
          case 'ArrowUp':
            e.preventDefault();
            setFocusIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
            break;
          case 'Enter':
          case ' ':
            e.preventDefault();
            if (focusIndex >= 0) {
              toggleOption(options[focusIndex].value);
            }
            break;
          case 'Escape':
            e.preventDefault();
            setIsOpen(false);
            comboboxRef.current?.focus();
            break;
          case 'Tab':
            setIsOpen(false);
            break;
        }
      },
      [isOpen, options, focusIndex, toggleOption],
    );

    useEffect(() => {
      if (isOpen && focusIndex >= 0 && listboxRef.current) {
        const option = listboxRef.current.children[focusIndex] as HTMLElement;
        option?.scrollIntoView({ block: 'nearest' });
      }
    }, [isOpen, focusIndex]);

    const selectedItems = options.filter((o) => selectedValues.includes(o.value));

    return (
      <div className={cn('relative', className)} ref={ref}>
        {label && <Label htmlFor={id}>{label}</Label>}

        <div ref={containerRef} className="relative">
          <div
            ref={comboboxRef}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-disabled={disabled}
            tabIndex={0}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            className={cn(
              'border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 flex min-h-[42px] w-full cursor-pointer items-center rounded-[7px] border-[1.5px] bg-transparent px-3 py-2 transition-colors',
              error && 'border-red-500 focus:border-red-500 dark:border-red-500',
              disabled && 'cursor-not-allowed opacity-50',
            )}
          >
            <div className="flex flex-auto flex-wrap gap-1.5">
              {selectedItems.map((option) => (
                <span
                  key={option.value}
                  className="border-stroke bg-gray-2 dark:border-dark-3 dark:bg-dark inline-flex items-center gap-1 rounded-[5px] border-[.5px] px-2 py-0.5 text-sm font-medium"
                >
                  {option.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeOption(option.value);
                    }}
                    className="ml-0.5 cursor-pointer text-gray-400 hover:text-red-500"
                    aria-label={`Remove ${option.label}`}
                    tabIndex={-1}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.354 3.354a.5.5 0 0 0-.708-.708L6 5.293 3.354 2.646a.5.5 0 1 0-.708.708L5.293 6l-2.647 2.646a.5.5 0 0 0 .708.708L6 6.707l2.646 2.647a.5.5 0 0 0 .708-.708L6.707 6l2.647-2.646Z"
                      />
                    </svg>
                  </button>
                </span>
              ))}

              {selectedItems.length === 0 && (
                <span className="text-dark-5 dark:text-dark-6 px-1 text-sm">{placeholder}</span>
              )}
            </div>

            <button
              type="button"
              tabIndex={-1}
              className="text-dark-4 dark:text-dark-6 ml-2 shrink-0"
            >
              <svg
                className={cn('size-5 transition-transform', isOpen && 'rotate-180')}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.691 7.093a.75.75 0 0 1 1.06-.218L9.999 11.677l5.247-4.802a.75.75 0 1 1 .976 1.14l-5.813 5.317a.75.75 0 0 1-.976 0L3.62 8.015a.75.75 0 0 1 .07-1.06Z"
                />
              </svg>
            </button>
          </div>

          {isOpen && (
            <ul
              ref={listboxRef}
              id={listboxId}
              role="listbox"
              aria-multiselectable="true"
              className="dark:bg-dark-2 dark:shadow-card absolute top-full left-0 z-40 mt-1 max-h-64 w-full overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black/5"
            >
              {options.map((option, index) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    className={cn(
                      'border-stroke dark:border-dark-3 cursor-pointer border-b px-4 py-2.5 text-sm transition-colors last:border-b-0',
                      index === focusIndex && 'bg-primary/10 text-primary dark:bg-primary/20',
                      isSelected && 'border-l-primary text-primary border-l-2 pl-3.5',
                    )}
                    onClick={() => toggleOption(option.value)}
                    onMouseEnter={() => setFocusIndex(index)}
                  >
                    {option.label}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {error && <ErrorMessage error={error} />}
      </div>
    );
  },
);
MultiSelect.displayName = 'MultiSelect';

export { MultiSelect, type MultiSelectProps, type MultiSelectOption };

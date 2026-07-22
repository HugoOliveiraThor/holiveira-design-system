'use client';

import { cn } from '@holiveira/utils';
import { forwardRef, useId } from 'react';

/** @public */
type TextAreaProps = {
  label: string;
  active?: boolean;
  icon?: React.ReactNode;
  error?: string;
};

/**
 * Textarea with label, icon slot, and error state.
 * @public
 */
const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ label, placeholder, required, disabled, active, className, icon, error, ...props }, ref) => {
  const id = useId();

  return (
    <div className={cn(className)}>
      <label htmlFor={id} className="text-body-sm text-dark mb-3 block font-medium dark:text-white">
        {label}
      </label>

      <div className="relative mt-3 [&_svg]:pointer-events-none [&_svg]:absolute [&_svg]:top-5.5 [&_svg]:left-5.5">
        <textarea
          ref={ref}
          id={id}
          rows={6}
          placeholder={placeholder}
          className={cn(
            'border-stroke text-dark focus:border-primary disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary w-full rounded-lg border-[1.5px] bg-transparent px-5.5 py-3 transition outline-none disabled:cursor-default dark:text-white',
            icon && 'py-5 pr-5 pl-13',
            error && 'border-red focus:border-red',
          )}
          required={required}
          disabled={disabled}
          data-active={active || undefined}
          {...props}
        />

        {icon}
      </div>

      {error && <p className="text-body-xs text-red mt-1">{error}</p>}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export { TextArea, type TextAreaProps };

"use client"

import { forwardRef, useId } from "react"
import { cn } from "@holiveira/utils"

/** @public */
type TextAreaProps = {
  label: string
  active?: boolean
  icon?: React.ReactNode
  error?: string
}

/**
 * Textarea with label, icon slot, and error state.
 * @public
 */
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ label, placeholder, required, disabled, active, className, icon, error, ...props }, ref) => {
    const id = useId()

    return (
      <div className={cn(className)}>
        <label
          htmlFor={id}
          className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
        >
          {label}
        </label>

        <div className="relative mt-3 [&_svg]:pointer-events-none [&_svg]:absolute [&_svg]:top-5.5 [&_svg]:left-5.5">
          <textarea
            ref={ref}
            id={id}
            rows={6}
            placeholder={placeholder}
            className={cn(
              "w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark transition outline-none focus:border-primary disabled:cursor-default disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary",
              icon && "py-5 pr-5 pl-13",
              error && "border-red focus:border-red",
            )}
            required={required}
            disabled={disabled}
            data-active={active || undefined}
            {...props}
          />

          {icon}
        </div>

        {error && (
          <p className="mt-1 text-body-xs text-red">{error}</p>
        )}
      </div>
    )
  },
)

TextArea.displayName = "TextArea"

export { TextArea, type TextAreaProps }

"use client"

import { forwardRef, useId } from "react"
import { cn } from "@holiveira/utils"
import { CheckIcon, XIcon } from "@holiveira/icons"

/** @public */
type SwitchProps = {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  withIcon?: boolean
  background?: "dark" | "light"
  backgroundSize?: "sm" | "default"
  name?: string
  className?: string
}

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
    },
    ref,
  ) => {
    const id = useId()

    return (
      <label
        htmlFor={id}
        className={cn(
          "flex max-w-fit cursor-pointer select-none items-center",
          className,
        )}
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
          />
          <div
            className={cn("h-8 w-14 rounded-full bg-gray-3 dark:bg-[#5A616B]", {
              "h-5": backgroundSize === "sm",
              "bg-[#212B36] dark:bg-primary": background === "dark",
            })}
          />

          <div
            className={cn(
              "absolute left-1 top-1 flex size-6 items-center justify-center rounded-full bg-white shadow-switch-1 transition peer-checked:right-1 peer-checked:translate-x-full peer-checked:[&_.check-icon]:block peer-checked:[&_.x-icon]:hidden",
              {
                "-top-1 left-0 size-7 shadow-switch-2":
                  backgroundSize === "sm",
                "peer-checked:bg-primary peer-checked:dark:bg-white":
                  background !== "dark",
              },
            )}
          >
            {withIcon && (
              <>
                <CheckIcon className="check-icon hidden fill-white dark:fill-dark" />
                <XIcon className="x-icon" />
              </>
            )}
          </div>
        </div>
      </label>
    )
  },
)

Switch.displayName = "Switch"

export { Switch, type SwitchProps }

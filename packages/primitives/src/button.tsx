"use client"

import { forwardRef, type HTMLAttributes } from "react"
import { cva, cn } from "@holiveira/utils"
import type { VariantProps } from "@holiveira/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 text-center font-medium hover:bg-opacity-90 transition focus:outline-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        green: "bg-green text-white",
        dark: "bg-dark text-white dark:bg-white/10",
        outlinePrimary: "border border-primary hover:bg-primary/10 text-primary",
        outlineGreen: "border border-green hover:bg-green/10 text-green",
        outlineDark: "border border-dark hover:bg-dark/10 text-dark dark:hover:bg-white/10 dark:border-white/25 dark:text-white",
      },
      shape: {
        default: "",
        rounded: "rounded-[5px]",
        full: "rounded-full",
      },
      size: {
        default: "py-3.5 px-10 lg:px-8 xl:px-10",
        small: "py-[11px] px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      shape: "default",
      size: "default",
    },
  },
)

/** @public */
type ButtonProps = HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    label: string
    icon?: React.ReactNode
  }

/**
 * Button component with 6 variants, 3 shapes, and 2 sizes.
 * @public
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, icon, variant, shape, size, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, shape, size }), className)}
        {...props}
      >
        {icon && <span>{icon}</span>}
        {label}
      </button>
    )
  },
)

Button.displayName = "Button"

export { Button, type ButtonProps }

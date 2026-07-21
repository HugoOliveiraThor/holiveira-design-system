import type { LabelHTMLAttributes } from "react"
import { cn } from "@holiveira/utils"

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const Label = ({ className, children, ...props }: LabelProps) => {
  return (
    <label
      className={cn(
        "mb-1 block text-body-sm font-medium text-dark dark:text-white",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  )
}
Label.displayName = "Label"

export { Label, type LabelProps }

import type { ComponentProps } from "react"
import { Button } from "@holiveira/primitives"
import { cn } from "@holiveira/utils"

interface SubmitProps extends ComponentProps<typeof Button> {}

const Submit = ({ className, children, ...props }: SubmitProps) => {
  return (
    <button
      type="submit"
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary px-10 py-3.5 text-center font-medium text-white transition hover:bg-opacity-90 focus:outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
Submit.displayName = "Submit"

export { Submit, type SubmitProps }

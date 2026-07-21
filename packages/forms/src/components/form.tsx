import type { FormHTMLAttributes } from "react"
import { cn } from "@holiveira/utils"

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

const Form = ({ className, onSubmit, ...props }: FormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit?.(e)
  }

  return (
    <form
      className={cn("space-y-6", className)}
      onSubmit={handleSubmit}
      noValidate
      {...props}
    />
  )
}
Form.displayName = "Form"

export { Form, type FormProps }

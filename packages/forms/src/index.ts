/**
 * Form wrapper component.
 * Wraps native <form> with consistent styling and prevents default submit.
 * @public
 */
export { Form, type FormProps } from "./components/form"

/**
 * Composes Label + input + Description + ErrorMessage in a vertical stack.
 * @public
 */
export { Field, type FieldProps } from "./components/field"

/**
 * Accessible label associated with a form input via htmlFor.
 * @public
 */
export { Label, type LabelProps } from "./components/label"

/**
 * Descriptive text for a form field, linked via aria-describedby.
 * @public
 */
export { Description, type DescriptionProps } from "./components/description"

/**
 * Error message announcer with role="alert" and aria-live.
 * @public
 */
export { ErrorMessage, type ErrorMessageProps } from "./components/error-message"

/**
 * Submit button wrapping @holiveira/primitives Button with type="submit".
 * @public
 */
export { Submit, type SubmitProps } from "./components/submit"

/**
 * Multi-select form widget. forwardRef. Controlled + uncontrolled.
 * @public
 */
export { MultiSelect, type MultiSelectProps, type MultiSelectOption } from "./widgets/multi-select"

/**
 * Date picker form widget wrapping flatpickr. forwardRef. Controlled + uncontrolled.
 * @public
 */
export { DatePicker, type DatePickerProps } from "./widgets/date-picker"

/**
 * React Hook Form re-exports — useForm, useController, useFormContext.
 * @public
 */
export { useForm, useController, useFormContext } from "./hooks/use-form"
export type {
  UseFormProps,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
} from "react-hook-form"

/**
 * Zod resolver for react-hook-form. Calls schema.safeParse and maps issues to field errors.
 * @public
 */
export { zodResolver } from "./validators/zod"

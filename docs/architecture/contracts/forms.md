# Package Contract: @holiveira/forms

Level: 3 Category: Composition

## Purpose

Provide a form system integrating React Hook Form + Zod validation with themed form components.

## Responsibilities

- Provide `Form` wrapper with RHF integration
- Provide form field components (`Field`, `Label`, `Description`, `ErrorMessage`, `Submit`)
- Provide form widgets (`MultiSelect`, `DatePicker`)
- Provide Zod schema validation integration
- Provide React Hook Form utilities (`useForm`, `useController`, `useFormContext`)

## Allowed Dependencies

- `@holiveira/ui` (L3) — composite UI components
- `@holiveira/primitives` (L2) — base field components
- `@holiveira/hooks` (L2) — form-related hooks
- `@holiveira/utils` (L1) — shared utilities
- `@holiveira/types` (L0) — shared types

## Forbidden Dependencies

- `@holiveira/auth` (L4) — forms are presentation, not auth
- `@holiveira/charts` (L3) — unrelated concern
- Any application

## Public API

### Components

- `Form`, `FormProps` — Form wrapper with RHF integration
- `Field`, `FieldProps` — Composes Label + input + Description + ErrorMessage
- `Label`, `LabelProps` — Accessible label associated with a form input
- `Description`, `DescriptionProps` — Descriptive text for a form field
- `ErrorMessage`, `ErrorMessageProps` — Error message announcer with role="alert"
- `Submit`, `SubmitProps` — Submit button wrapping @holiveira/primitives Button

### Widgets

- `MultiSelect`, `MultiSelectProps`, `MultiSelectOption` — Multi-select form widget
- `DatePicker`, `DatePickerProps` — Date picker form widget wrapping flatpickr

### Hooks

- `useForm`, `useController`, `useFormContext` — React Hook Form re-exports
- `UseFormProps`, `UseFormReturn`, `FieldValues`, `SubmitHandler` — RHF type re-exports

### Validators

- `zodResolver` — Zod resolver for react-hook-form

## Internal API

- `_useFieldError`
- `_FieldContext`
- `_autoFocusHandler`

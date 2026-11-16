# Package Contract: @ho-dev/forms

Level: 3 Category: Composition

## Purpose

Provide form composition components, form widgets and the react-hook-form re-exports applications
use to wire validation.

## Responsibilities

- Provide `Form` wrapper: a plain `form` element that prevents the default submit
- Provide form field components (`Field`, `Label`, `Description`, `ErrorMessage`, `Submit`)
- Provide form widgets (`MultiSelect`, `DatePicker`)
- Re-export `zodResolver` for Zod-backed react-hook-form validation
- Provide React Hook Form utilities (`useForm`, `useController`, `useFormContext`)

## Allowed Dependencies

- `@ho-dev/ui` (L3) — composite UI components
- `@ho-dev/primitives` (L2) — base field components
- `@ho-dev/hooks` (L2) — form-related hooks
- `@ho-dev/utils` (L1) — shared utilities
- `@ho-dev/types` (L0) — shared types

## Forbidden Dependencies

- `@ho-dev/auth` (L4) — forms are presentation, not auth
- `@ho-dev/charts` (L3) — unrelated concern
- Any application

## Public API

### Components

- `Form`, `FormProps` — plain `form` wrapper that prevents the default submit
- `Field`, `FieldProps` — Composes Label + input + Description + ErrorMessage
- `Label`, `LabelProps` — Accessible label associated with a form input
- `Description`, `DescriptionProps` — Descriptive text for a form field
- `ErrorMessage`, `ErrorMessageProps` — Error message announcer with role="alert"
- `Submit`, `SubmitProps` — Submit button wrapping @ho-dev/primitives Button

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

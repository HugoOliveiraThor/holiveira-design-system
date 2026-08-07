# @ho-dev/forms

Form components with validation integration.

## Purpose

Form composition primitives (Form, Field, Label, Description, ErrorMessage, Submit) plus complex
widgets (MultiSelect, DatePicker) integrated with react-hook-form and Zod. Architectural role:
provides the official form composition contract for the framework.

## Installation

```bash
pnpm add @ho-dev/forms
```

Requires `react-hook-form`, `zod`, and `flatpickr`.

## Usage

```tsx
import { z } from 'zod';

import { Form, Field, Label, ErrorMessage, Submit, zodResolver } from '@ho-dev/forms';

const schema = z.object({ email: z.string().email() });

function MyForm() {
  return (
    <Form schema={schema} onSubmit={(data) => console.log(data)}>
      <Field name="email">
        <Label>Email</Label>
        <input />
        <ErrorMessage />
      </Field>
      <Submit />
    </Form>
  );
}
```

Import DatePicker styles:

```css
@import '@ho-dev/forms/date-picker-styles.css';
```

## Public API

| Export              | Kind      | Description                                |
| ------------------- | --------- | ------------------------------------------ |
| `Form`              | component | Form wrapper with RHF integration          |
| `FormProps`         | type      | Form component props                       |
| `Field`             | component | Field context provider                     |
| `FieldProps`        | type      | Field component props                      |
| `Label`             | component | Accessible label                           |
| `LabelProps`        | type      | Label component props                      |
| `Description`       | component | Field description text                     |
| `DescriptionProps`  | type      | Description component props                |
| `ErrorMessage`      | component | Validation error display                   |
| `ErrorMessageProps` | type      | ErrorMessage component props               |
| `Submit`            | component | Submit button                              |
| `SubmitProps`       | type      | Submit component props                     |
| `MultiSelect`       | component | Multi-select widget                        |
| `MultiSelectProps`  | type      | MultiSelect component props                |
| `MultiSelectOption` | type      | MultiSelect option type                    |
| `DatePicker`        | component | Date picker widget (flatpickr)             |
| `DatePickerProps`   | type      | DatePicker component props                 |
| `useForm`           | hook      | React Hook Form `useForm` re-export        |
| `useController`     | hook      | React Hook Form `useController` re-export  |
| `useFormContext`    | hook      | React Hook Form `useFormContext` re-export |
| `UseFormProps`      | type      | `useForm` options type                     |
| `UseFormReturn`     | type      | `useForm` return type                      |
| `FieldValues`       | type      | Field values generic type                  |
| `SubmitHandler`     | type      | Submit handler function type               |
| `zodResolver`       | function  | Zod resolver for react-hook-form           |

**CSS:** `@ho-dev/forms/date-picker-styles.css` — DatePicker flatpickr theme overrides.

## Peer Dependencies

| Package           | Version            |
| ----------------- | ------------------ |
| `flatpickr`       | ^4.0.0             |
| `react`           | ^19.0.0            |
| `react-dom`       | ^19.0.0            |
| `react-hook-form` | ^7.0.0             |
| `typescript`      | ^5.0.0             |
| `zod`             | ^3.0.0 \|\| ^4.0.0 |

## Bundle Size

| Budget             | Limit | Enforcement |
| ------------------ | ----- | ----------- |
| Tree-shaken (Form) | 10 KB | Warn        |
| Full package       | 41 KB | Warn        |

## Architecture Contract

**Dependency Level:** 3 — Composition.

**Owns:** Form composition components, widget implementations (MultiSelect, DatePicker), validation
integration (Zod resolver).

**Does not own:** Form state management (delegated to react-hook-form), business logic, validation
schemas (consumer responsibility), or demo form variants.

See `docs/architecture/contracts/forms.md` for ownership and dependency boundaries.

## Documentation

- **Storybook:**
  https://HugoOliveiraThor.github.io/holiveira-design-system/?path=/docs/components-forms
- [GitHub](https://github.com/HugoOliveiraThor/holiveira-design-system)
- **Contract:** `docs/architecture/contracts/forms.md`

## License

MIT — see [LICENSE](../../LICENSE).

## References

- `@ho-dev/primitives` — base component dependencies
- `@ho-dev/hooks` — interaction hooks
- `@ho-dev/utils` — utility functions

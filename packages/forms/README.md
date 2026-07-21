# @holiveira/forms

Form components with validation integration.

## Purpose

Form composition primitives (Form, Field, Label, Description, ErrorMessage, Submit) plus complex
widgets (MultiSelect, DatePicker) integrated with react-hook-form and Zod. Architectural role:
provides the official form composition contract for the framework.

## Installation

```bash
pnpm add @holiveira/forms
```

Requires `react-hook-form`, `zod`, and `flatpickr`.

## Usage

```tsx
import { Form, Field, Label, ErrorMessage, Submit } from '@holiveira/forms';
import { z } from 'zod';
import { zodResolver } from '@holiveira/forms';

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

## Public API

| Export         | Kind      | Description                         |
| -------------- | --------- | ----------------------------------- |
| `Form`         | component | Form container with validation      |
| `Field`        | component | Field context provider              |
| `Label`        | component | Accessible label                    |
| `Description`  | component | Field description text              |
| `ErrorMessage` | component | Validation error display            |
| `Submit`       | component | Submit button                       |
| `MultiSelect`  | component | Multi-select widget                 |
| `DatePicker`   | component | Date picker widget (flatpickr)      |
| `useForm`      | hook      | react-hook-form `useForm` re-export |
| `zodResolver`  | function  | Zod resolver for react-hook-form    |

**CSS:** `@holiveira/forms/date-picker-styles.css` — DatePicker flatpickr theme overrides.

## Architecture Contract

**Dependency Level:** 3 — Composition.

**Owns:** Form composition components, widget implementations (MultiSelect, DatePicker), validation
integration (Zod resolver).

**Does not own:** Form state management (delegated to react-hook-form), business logic, validation
schemas (consumer responsibility), or demo form variants.

See `docs/architecture/contracts/forms.md` for ownership and dependency boundaries.

## References

- `@holiveira/primitives` — base component dependencies
- `@holiveira/hooks` — interaction hooks
- `@holiveira/utils` — utility functions

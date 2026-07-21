# @holiveira/primitives

Accessible UI primitives.

## Purpose

Button, Alert, Skeleton, Checkbox, Radio, Switch, InputGroup, TextArea, Select, Table, and Dropdown components. Architectural role: foundational accessible component library for the design system.

## Installation

```bash
pnpm add @holiveira/primitives
```

## Usage

```tsx
import {
  Button,
  Alert,
  Table,
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from '@holiveira/primitives';

function MyComponent() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Alert variant="info">This is an informational message.</Alert>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
```

## Public API

| Export            | Kind      | Description                         |
| ----------------- | --------- | ----------------------------------- |
| `Button`          | component | Button with variant support (cva)   |
| `Alert`           | component | Alert banner with severity variants |
| `Skeleton`        | component | Loading skeleton placeholder        |
| `Checkbox`        | component | Accessible checkbox input           |
| `Radio`           | component | Accessible radio input              |
| `Switch`          | component | Toggle switch                       |
| `InputGroup`      | component | Input with label and error slot     |
| `TextArea`        | component | Multi-line text input               |
| `Select`          | component | Dropdown select                     |
| `Table`           | component | Table container                     |
| `TableHeader`     | component | Table header section                |
| `TableBody`       | component | Table body section                  |
| `TableFooter`     | component | Table footer section                |
| `TableRow`        | component | Table row                           |
| `TableHead`       | component | Table header cell                   |
| `TableCell`       | component | Table body cell                     |
| `Dropdown`        | component | Dropdown root (context provider)    |
| `DropdownContent` | component | Dropdown content panel              |
| `DropdownTrigger` | component | Dropdown trigger button             |
| `DropdownClose`   | component | Dropdown close trigger              |

## Architecture Contract

**Dependency Level:** 2 — Primitives.

**Owns:** Accessible UI primitive implementations, component variant definitions (cva), base component styling.

**Does not own:** Application-specific UI patterns, page-level compositions, business logic, or data display logic.

See `docs/architecture/contracts/primitives.md` for ownership and dependency boundaries.

## References

- `@holiveira/hooks` — interaction hooks
- `@holiveira/icons` — icon components
- `@holiveira/utils` — `cn()` and `cva()` utilities
- `@holiveira/theme` — theme tokens
- `@holiveira/types` — shared type definitions

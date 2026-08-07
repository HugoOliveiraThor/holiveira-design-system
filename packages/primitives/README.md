# @ho-dev/primitives

Accessible UI primitives.

## Purpose

Button, Alert, Skeleton, Checkbox, Radio, Switch, InputGroup, TextArea, Select, Table, and Dropdown
components. Architectural role: foundational accessible component library for the design system.

## Installation

```bash
pnpm add @ho-dev/primitives
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
} from '@ho-dev/primitives';

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

| Export            | Kind      | Description                                     |
| ----------------- | --------- | ----------------------------------------------- |
| `Button`          | component | Button with 6 variants, 3 shapes, 2 sizes (cva) |
| `ButtonProps`     | type      | Button component props                          |
| `Alert`           | component | Alert banner with 3 severity variants           |
| `AlertProps`      | type      | Alert component props                           |
| `Skeleton`        | component | Loading placeholder with pulse animation        |
| `SkeletonProps`   | type      | Skeleton component props                        |
| `Checkbox`        | component | Accessible checkbox input                       |
| `CheckboxProps`   | type      | Checkbox component props                        |
| `Radio`           | component | Accessible radio button                         |
| `RadioProps`      | type      | Radio component props                           |
| `Switch`          | component | Toggle switch                                   |
| `SwitchProps`     | type      | Switch component props                          |
| `InputGroup`      | component | Text input with label, icon, and error state    |
| `InputGroupProps` | type      | InputGroup component props                      |
| `TextArea`        | component | Multi-line text input                           |
| `TextAreaProps`   | type      | TextArea component props                        |
| `Select`          | component | Native select with typed items and placeholder  |
| `SelectProps`     | type      | Select component props                          |
| `Table`           | component | Table scroll wrapper                            |
| `TableHeader`     | component | Table header section                            |
| `TableBody`       | component | Table body section                              |
| `TableFooter`     | component | Table footer section                            |
| `TableRow`        | component | Table row                                       |
| `TableHead`       | component | Table header cell                               |
| `TableCell`       | component | Table body cell                                 |
| `Dropdown`        | component | Dropdown context container                      |
| `DropdownContent` | component | Dropdown content panel                          |
| `DropdownTrigger` | component | Dropdown trigger button                         |
| `DropdownClose`   | component | Dropdown dismiss element                        |

## Peer Dependencies

| Package      | Version |
| ------------ | ------- |
| `react`      | ^19.0.0 |
| `react-dom`  | ^19.0.0 |
| `typescript` | ^5.0.0  |

## Bundle Size

| Budget               | Limit | Enforcement |
| -------------------- | ----- | ----------- |
| Tree-shaken (Button) | 13 KB | Warn        |
| Full package         | 19 KB | Warn        |

## Architecture Contract

**Dependency Level:** 2 — Primitives.

**Owns:** Accessible UI primitive implementations, component variant definitions (cva), base
component styling.

**Does not own:** Application-specific UI patterns, page-level compositions, business logic, or data
display logic.

See `docs/architecture/contracts/primitives.md` for ownership and dependency boundaries.

## Documentation

- **Storybook:**
  https://HugoOliveiraThor.github.io/holiveira-design-system/?path=/docs/components-primitives
- [GitHub](https://github.com/HugoOliveiraThor/holiveira-design-system)
- **Contract:** `docs/architecture/contracts/primitives.md`

## License

MIT — see [LICENSE](../../LICENSE).

## References

- `@ho-dev/hooks` — interaction hooks
- `@ho-dev/icons` — icon components
- `@ho-dev/utils` — `cn()` and `cva()` utilities
- `@ho-dev/theme` — theme tokens
- `@ho-dev/types` — shared type definitions

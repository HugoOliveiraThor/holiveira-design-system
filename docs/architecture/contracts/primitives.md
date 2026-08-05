# Package Contract: @holiveira/primitives

Level: 2 Category: Primitives

## Purpose

Provide atomic, accessible UI primitives as the building blocks for all higher-level components.

## Responsibilities

- Expose low-level components (Button, Input, Select, etc.) extracted from the monolith
- Define component variants using `cva` from `@holiveira/utils`
- Ensure keyboard accessibility by default
- Support controlled and uncontrolled usage
- Use `forwardRef` and `displayName` on all components

## Migration Sources

Components extracted from the following monolith files:

- `src/components/ui-elements/button.tsx` → Button
- `src/components/ui-elements/alert/` → Alert
- `src/components/FormElements/InputGroup/` → InputGroup, TextAreaGroup
- `src/components/FormElements/checkbox.tsx` → Checkbox
- `src/components/FormElements/radio.tsx` → Radio
- `src/components/FormElements/select.tsx` → Select
- `src/components/FormElements/switch.tsx` → Switch
- `src/components/ui/skeleton.tsx` → Skeleton
- `src/components/ui/table.tsx` → Table (+ sub-components)
- `src/components/ui/dropdown.tsx` → Dropdown (+ sub-components)

## Non-Migration (Stay in Monolith)

- MultiSelect — tightly coupled to imperative DOM access; not extraction-worthy without rewrite
- FormElement variants (CheckboxOne–Five, SwitcherOne–Four) — hardcoded demos, not reusable

## Allowed Dependencies

- `@holiveira/hooks` (L2) — `useClickOutside` (used by Dropdown for click-away close)
- `@holiveira/icons` (L2) — icon components used by Alert, Checkbox, Select, Switch
- `@holiveira/theme` (L3) — `theme.css` peer dep (tailwind classes resolve)
- `@holiveira/tokens` (L1) — design token values
- `@holiveira/utils` (L1) — `cn()`, `cva`, `VariantProps`
- `@holiveira/types` (L0) — `SetStateActionType`

## Forbidden Dependencies

- `@holiveira/ui` (L3) — primitives are lower-level than UI
- `@holiveira/forms` (L3) — forms compose primitives, not the reverse
- `@holiveira/layouts` (L3) — layouts consume primitives
- `@holiveira/charts` (L3) — charts are a separate concern

## Public API

### Components

- `Button`, `ButtonProps`
- `buttonVariants`
- `Alert`, `AlertProps`
- `Skeleton`, `SkeletonProps`
- `InputGroup`, `InputGroupProps`
- `TextArea`, `TextAreaProps`
- `Checkbox`, `CheckboxProps`
- `Radio`, `RadioProps`
- `Select`, `SelectProps`
- `Switch`, `SwitchProps`
- `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`
- `Dropdown`, `DropdownContent`, `DropdownTrigger`, `DropdownClose`

## Internal API

- `packages/primitives/src/internal/` — reserved for internal helpers (empty until extracted)
- Monolith helpers not yet extracted: `_useButtonA11y`, `_mergeInputProps`, `_composeEventHandlers`

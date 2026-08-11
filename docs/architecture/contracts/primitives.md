# Package Contract: @ho-dev/primitives

Level: 2 Category: Primitives

## Purpose

Provide atomic, accessible UI primitives as the building blocks for all higher-level components.

## Responsibilities

- Expose low-level components (Button, Input, Select, etc.) extracted from the monolith
- Define component variants using `cva` from `@ho-dev/utils`
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
- TailAdmin `/avatars` page → Avatar, AvatarGroup (TailAdmin port)
- TailAdmin `/badge` page → Badge (TailAdmin port)
- TailAdmin `/links` page → Link (TailAdmin port)
- TailAdmin `/list` page → List, ListItem (TailAdmin port)
- TailAdmin `/progress-bar` page → Progress (TailAdmin port)
- TailAdmin `/spinners` page → Spinner (TailAdmin port)
- TailAdmin `/pagination` page → Pagination (TailAdmin port)
- TailAdmin `/notifications` page → NotificationBar (TailAdmin port)
- TailAdmin `/breadcrumb` page → Breadcrumb (TailAdmin port)
- TailAdmin `/modals` page → Modal, ModalCloseButton, ModalAlert (TailAdmin port)
- TailAdmin `/tabs` page → Tabs family (TailAdmin port)
- TailAdmin `/tooltips` page → Tooltip (TailAdmin port)

## Non-Migration (Stay in Monolith)

- MultiSelect — tightly coupled to imperative DOM access; not extraction-worthy without rewrite
- FormElement variants (CheckboxOne–Five, SwitcherOne–Four) — hardcoded demos, not reusable

## Allowed Dependencies

- `@ho-dev/hooks` (L2) — `useClickOutside` (used by Dropdown for click-away close)
- `@ho-dev/icons` (L2) — icon components used by Alert, Checkbox, Select, Switch
- `@ho-dev/theme` (L3) — `theme.css` peer dep (tailwind classes resolve)
- `@ho-dev/tokens` (L1) — design token values
- `@ho-dev/utils` (L1) — `cn()`, `cva`, `VariantProps`
- `@ho-dev/types` (L0) — `SetStateActionType`

## Forbidden Dependencies

- `@ho-dev/ui` (L3) — primitives are lower-level than UI
- `@ho-dev/forms` (L3) — forms compose primitives, not the reverse
- `@ho-dev/layouts` (L3) — layouts consume primitives
- `@ho-dev/charts` (L3) — charts are a separate concern

## Public API

### Components

- `Button`, `ButtonProps`
- `buttonVariants`
- `Alert`, `AlertProps`
- `alertVariants`
- `Avatar`, `AvatarProps`, `avatarVariants`, `avatarStatusVariants`
- `AvatarGroup`, `AvatarGroupProps`
- `Badge`, `BadgeProps`, `badgeVariants`
- `Link`, `LinkProps`, `linkVariants`
- `List`, `ListProps`, `ListItem`, `ListItemProps`
- `Progress`, `ProgressProps`, `progressVariants`
- `Spinner`, `SpinnerProps`, `spinnerVariants`
- `Pagination`, `PaginationProps`, `getPageItems`
- `NotificationBar`, `NotificationBarProps`, `notificationBarVariants`, `iconBoxVariants`
- `Breadcrumb`, `BreadcrumbProps`, `BreadcrumbItem`
- `Modal`, `ModalProps`, `modalVariants`, `ModalCloseButton`, `ModalCloseButtonProps`
- `ModalAlert`, `ModalAlertProps`
- `Tabs`, `TabsProps`, `TabsList`, `TabsListProps`, `TabsTrigger`, `TabsTriggerProps`,
  `TabsContent`, `TabsContentProps`
- `Tooltip`, `TooltipProps`, `tooltipVariants`, `tooltipArrow`
- `Skeleton`, `SkeletonProps`
- `InputGroup`, `InputGroupProps`
- `TextArea`, `TextAreaProps`
- `Checkbox`, `CheckboxProps` — `label` accepts `ReactNode` (composable labels, e.g. linked terms)
- `Radio`, `RadioProps`
- `Select`, `SelectProps`
- `Switch`, `SwitchProps`
- `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`
- `Dropdown`, `DropdownProps`, `DropdownContent`, `DropdownContentProps`, `DropdownTrigger`,
  `DropdownTriggerProps`, `DropdownClose`, `DropdownCloseProps`

## Internal API

- `packages/primitives/src/internal/` — reserved for internal helpers (empty until extracted)
- Monolith helpers not yet extracted: `_useButtonA11y`, `_mergeInputProps`, `_composeEventHandlers`

# @holiveira/ui

Composed UI component library.

## Purpose

Breadcrumb navigation, ShowcaseSection display, and Card component with variants. Architectural role: high-level composed components built on primitives.

## Installation

```bash
pnpm add @holiveira/ui
```

## Usage

```tsx
import { Breadcrumb, Card } from '@holiveira/ui';

function MyPage() {
  return (
    <div>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Settings' }]} />
      <Card variant="outlined">
        <p>Card content</p>
      </Card>
    </div>
  );
}
```

## Public API

| Export                 | Kind      | Description                            |
| ---------------------- | --------- | -------------------------------------- |
| `Breadcrumb`           | component | Navigation breadcrumb trail            |
| `BreadcrumbProps`      | type      | Breadcrumb component props             |
| `ShowcaseSection`      | component | Section container for showcase layouts |
| `ShowcaseSectionProps` | type      | ShowcaseSection props                  |
| `Card`                 | component | Card container with cva variants       |
| `cardVariants`         | function  | CVA variant definitions for Card       |
| `CardProps`            | type      | Card component props                   |

## Architecture Contract

**Dependency Level:** 3 — Composition.

**Owns:** Composed UI component implementations, cross-primitive composition patterns.

**Does not own:** Primitive components (delegated to `@holiveira/primitives`), layout components (delegated to `@holiveira/layouts`), or application-specific compositions.

See `docs/architecture/contracts/ui.md` for ownership and dependency boundaries.

## References

- `@holiveira/primitives` — base component dependencies
- `@holiveira/utils` — `cn()` and `cva()` utilities
- `@holiveira/types` — shared type definitions

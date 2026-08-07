# @ho-dev/ui

Composite UI components built on primitives for ready-to-use patterns.

## Purpose

Breadcrumb navigation, ShowcaseSection display, and Card component with variants. Architectural
role: high-level composed components built on `@ho-dev/primitives`.

## Installation

```bash
pnpm add @ho-dev/ui
```

## Usage

```tsx
import { Breadcrumb, Card } from '@ho-dev/ui';

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

## Peer Dependencies

| Package      | Version |
| ------------ | ------- |
| `next`       | ^15     |
| `react`      | ^19     |
| `react-dom`  | ^19     |
| `typescript` | ^5      |

## Architecture Contract

**Dependency Level:** 3 — Composition.

**Owns:** Composed UI component implementations, cross-primitive composition patterns.

**Does not own:** Primitive components (delegated to `@ho-dev/primitives`), layout components
(delegated to `@ho-dev/layouts`), or application-specific compositions.

Contract: `docs/architecture/contracts/ui.md`

## Documentation

- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system/?path=/docs/ui-breadcrumb--docs)
  — Breadcrumb
- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system/?path=/docs/ui-card--docs)
  — Card
- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system/?path=/docs/ui-showcasesection--docs)
  — ShowcaseSection
- [GitHub](https://github.com/HugoOliveiraThor/holiveira-design-system)
- Contract: `docs/architecture/contracts/ui.md`

## License

MIT

## References

- `@ho-dev/primitives` — base component dependencies
- `@ho-dev/utils` — `cn()` and `cva()` utilities
- `@ho-dev/types` — shared type definitions

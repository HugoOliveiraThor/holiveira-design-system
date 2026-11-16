# @ho-dev/ui

Composite UI components built on primitives for ready-to-use patterns.

## Purpose

PageHeader, ShowcaseSection, the Card parts and ButtonGroup. Architectural role: high-level composed
components built on `@ho-dev/primitives`.

## Installation

```bash
pnpm add @ho-dev/ui
```

## Usage

```tsx
import { Breadcrumb } from '@ho-dev/primitives';
import { Card, CardContent, CardTitle, ShowcaseSection } from '@ho-dev/ui';

function MyPage() {
  return (
    <ShowcaseSection title="Settings">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Settings' }]} />
      <Card variant="bordered">
        <CardTitle>Card title</CardTitle>
        <CardContent>
          <p>Card content</p>
        </CardContent>
      </Card>
    </ShowcaseSection>
  );
}
```

## Public API

| Export                 | Kind      | Description                                     |
| ---------------------- | --------- | ----------------------------------------------- |
| `PageHeader`           | component | Page header with a title and breadcrumb trail   |
| `PageHeaderProps`      | type      | PageHeader component props                      |
| `ShowcaseSection`      | component | Section container for showcase layouts          |
| `ShowcaseSectionProps` | type      | ShowcaseSection props                           |
| `Card`                 | component | Card container with cva variants                |
| `cardVariants`         | function  | CVA variant definitions for Card                |
| `CardProps`            | type      | Card component props                            |
| `CardImage`            | component | Card image with top or left orientation         |
| `CardImageProps`       | type      | CardImage component props                       |
| `CardTitle`            | component | Card title heading (h2, h3 or h4)               |
| `CardTitleProps`       | type      | CardTitle component props                       |
| `CardContent`          | component | Neutral card content container                  |
| `CardContentProps`     | type      | CardContent component props                     |
| `ButtonGroup`          | component | Joined button group composing primitive Buttons |
| `ButtonGroupProps`     | type      | ButtonGroup component props                     |

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

- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system/?path=/docs/primitives-breadcrumb--docs)
  — Breadcrumb (`@ho-dev/primitives`)
- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system/?path=/docs/ui-pageheader--docs)
  — PageHeader
- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system/?path=/docs/ui-buttongroup--docs)
  — ButtonGroup
- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system/?path=/docs/ui-card--docs)
  — Card
- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system/?path=/docs/ui-showcasesection--docs)
  — ShowcaseSection
- [Playground](https://HugoOliveiraThor.github.io/holiveira-design-system/playground/) — Full
  product screens composed from the packages
- [GitHub](https://github.com/HugoOliveiraThor/holiveira-design-system)
- Contract: `docs/architecture/contracts/ui.md`

## License

MIT

## References

- `@ho-dev/primitives` — base component dependencies
- `@ho-dev/utils` — `cn()` and `cva()` utilities
- `@ho-dev/types` — shared type definitions

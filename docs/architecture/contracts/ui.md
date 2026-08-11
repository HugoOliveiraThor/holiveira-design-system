# Package Contract: @ho-dev/ui

Level: 3 Category: Composition

## Purpose

Provide composite UI components that combine multiple primitives into ready-to-use patterns
(PageHeader, Card, ShowcaseSection, etc.).

## Responsibilities

- Compose primitives into higher-level patterns
- Provide dashboard breadcrumb with page title and navigation trail
- Provide Card container with variants (default, bordered, ghost)
- Provide generic section card with title header and padded content area

## Allowed Dependencies

- `@ho-dev/primitives` (L2) — atomic components
- `@ho-dev/theme` (L3) — theme context, `cn()`
- `@ho-dev/tokens` (L1) — design tokens
- `@ho-dev/utils` (L1) — shared utilities
- `@ho-dev/types` (L0) — shared types
- `@ho-dev/icons` (L2) — icon components

## Forbidden Dependencies

- `@ho-dev/forms` (L3) — forms compose UI, not the reverse
- `@ho-dev/auth` (L4) — UI must not depend on auth
- `@ho-dev/data` (L4) — UI must not depend on data layer

## Public API

- `PageHeader`, `PageHeaderProps` — page header with title heading and breadcrumb trail (renamed
  from Breadcrumb, existing dashboard breadcrumb header)
- `ShowcaseSection`, `ShowcaseSectionProps` — generic section card with title header and padded
  content
- `Card`, `cardVariants`, `CardProps` — card container with 3 variants: default, bordered, ghost
- `CardImage`, `CardImageProps` — card image with top/left orientation (TailAdmin port)
- `CardTitle`, `CardTitleProps` — card title heading (h2/h3/h4) (TailAdmin port)
- `CardContent`, `CardContentProps` — neutral card content container (TailAdmin port)
- `ButtonGroup`, `ButtonGroupProps` — joined button group composing primitives Button children

## Internal API

- `_useCardStyle`

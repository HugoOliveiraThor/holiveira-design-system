# Package Contract: @holiveira/ui

Level: 3 Category: Composition

## Purpose

Provide composite UI components that combine multiple primitives into ready-to-use patterns
(Breadcrumb, Card, ShowcaseSection, etc.).

## Responsibilities

- Compose primitives into higher-level patterns
- Provide dashboard breadcrumb with page title and navigation trail
- Provide Card container with variants (default, bordered, ghost)
- Provide generic section card with title header and padded content area

## Allowed Dependencies

- `@holiveira/primitives` (L2) — atomic components
- `@holiveira/theme` (L3) — theme context, `cn()`
- `@holiveira/tokens` (L1) — design tokens
- `@holiveira/utils` (L1) — shared utilities
- `@holiveira/types` (L0) — shared types
- `@holiveira/icons` (L2) — icon components

## Forbidden Dependencies

- `@holiveira/forms` (L3) — forms compose UI, not the reverse
- `@holiveira/auth` (L4) — UI must not depend on auth
- `@holiveira/data` (L4) — UI must not depend on data layer

## Public API

- `Breadcrumb`, `BreadcrumbProps` — dashboard breadcrumb with page title and navigation trail
- `ShowcaseSection`, `ShowcaseSectionProps` — generic section card with title header and padded
  content
- `Card`, `cardVariants`, `CardProps` — card container with 3 variants: default, bordered, ghost

## Internal API

- `_useCardStyle`

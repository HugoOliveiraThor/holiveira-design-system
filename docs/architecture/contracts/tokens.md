# Package Contract: @holiveira/tokens

Level: 1 Category: Foundation

## Purpose

Define the single source of truth for all visual primitives (colors, spacing, typography, shadows,
breakpoints).

## Responsibilities

- Generate CSS custom properties consumed by all packages
- Export TypeScript constants for programmatic access
- Provide design token naming convention

## Allowed Dependencies

- (none)

## Forbidden Dependencies

- Any framework package or application

## Public API

- CSS custom properties (`--color-*`, `--container-*`, `--text-*`, `--shadow-*`, `--breakpoint-*`,
  `--font-*`)
- TypeScript token objects (`colors`, `containers`, `breakpoints`, `fontFamily`, `text`, `shadows`)
- `TokenValue` type
- `ColorKey` type
- `Breakpoint` type

## Internal API

- (none — tokens have no internal surface)

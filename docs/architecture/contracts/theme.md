# Package Contract: @holiveira/theme

Level: 3 Category: Composition

## Purpose

Provide the Theme Engine — a runtime theme system that consumes Design Tokens and exposes theme
context to all components.

## Responsibilities

- Provide `ThemeProvider` component (wrapping next-themes with `attribute="class"`,
  `defaultTheme="light"`)
- Provide `useTheme` hook (re-exported from next-themes)
- Provide `theme.css` with base styles, border compatibility, and custom utilities
- Manage dark/light mode switching via `.dark` class toggle

## Excluded Responsibilities

- `cn()` — belongs in @holiveira/utils
- `cva`/`VariantProps` — belongs in the component layer (Step 10 decision)
- Theme toggle UI — belongs in @holiveira/layouts (Step 13)

## Allowed Dependencies

- `@holiveira/tokens` (L1) — token consumption via `tokens.css`
- `@holiveira/types` (L0) — shared types

## Forbidden Dependencies

- `@holiveira/utils` (L1) — theme has no need for JS utilities
- `@holiveira/primitives` (L2) — theme engine precedes primitives
- `@holiveira/ui` (L3) — must not depend on UI it themifies

## Public API

- `ThemeProvider` — "use client" wrapper with hardcoded defaults
- `useTheme` — re-export from next-themes
- `ThemeProviderProps` — props interface

## CSS Exports

- `theme.css` — `@import tokens.css` + base styles + utilities

## Internal API

None. All exports are public by design.

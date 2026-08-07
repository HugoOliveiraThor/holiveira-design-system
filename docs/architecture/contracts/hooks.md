# Package Contract: @ho-dev/hooks

Level: 2 Category: Primitives

## Purpose

Provide framework-agnostic React hooks for common patterns.

## Responsibilities

- Provide hooks for click outside detection (`useClickOutside`)
- Provide hooks for responsive design (`useIsMobile`)
- Provide hooks for focus management (`useFocusTrap`, `useFocusRestore`)
- Provide mobile breakpoint constant (`MOBILE_BREAKPOINT`)

## Allowed Dependencies

- `@ho-dev/types` (L0) — shared types
- `@ho-dev/utils` (L1) — utility functions (optional, for hook internals)

## Forbidden Dependencies

- `@ho-dev/primitives` (L2) — hooks are dependency-free by design
- `@ho-dev/theme` (L3) — hooks must not depend on theme
- Any application

## Public API

- `useClickOutside` — detects clicks outside a referenced element
- `useIsMobile` — returns boolean for mobile viewport detection
- `useFocusTrap` — traps Tab/Shift+Tab focus within a container element
- `useFocusRestore` — saves and restores previously focused element
- `MOBILE_BREAKPOINT` — mobile breakpoint constant (850px)

## Internal API

- `_useEventListener`
- `_useIsomorphicLayoutEffect`

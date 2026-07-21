# @holiveira/hooks

Shared React hooks.

## Purpose

Click-outside detection and mobile breakpoint query hooks. Architectural role: foundational hook
layer for interactive components.

## Installation

```bash
pnpm add @holiveira/hooks
```

## Usage

```tsx
import { useClickOutside, useIsMobile } from '@holiveira/hooks';

function MyComponent() {
  const ref = useClickOutside<HTMLDivElement>(() => console.log('clicked outside'));
  const isMobile = useIsMobile();

  return <div ref={ref}>{isMobile ? 'Mobile' : 'Desktop'}</div>;
}
```

## Public API

| Export              | Kind   | Description                                          |
| ------------------- | ------ | ---------------------------------------------------- |
| `useClickOutside`   | hook   | Calls callback when click occurs outside ref element |
| `useIsMobile`       | hook   | Returns boolean for mobile breakpoint (850px)        |
| `MOBILE_BREAKPOINT` | number | Mobile breakpoint value in pixels                    |

## Architecture Contract

**Dependency Level:** 2 — Primitives.

**Owns:** Shared hook implementations, interaction detection patterns.

**Does not own:** Component-specific state logic, data fetching hooks, or application-level state
management.

See `docs/architecture/contracts/hooks.md` for ownership and dependency boundaries.

## References

- `@holiveira/types` — shared type definitions

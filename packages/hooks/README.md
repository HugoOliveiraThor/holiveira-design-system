# @ho-dev/hooks

Shared React hooks for interaction detection and focus management.

## Purpose

Click-outside detection, mobile breakpoint query, and focus management hooks. Architectural role:
foundational hook layer for interactive components.

## Installation

```bash
pnpm add @ho-dev/hooks
```

## Usage

```tsx
import { useClickOutside, useFocusTrap, useIsMobile } from '@ho-dev/hooks';

function MyComponent() {
  const ref = useClickOutside<HTMLDivElement>(() => console.log('clicked outside'));
  const isMobile = useIsMobile();
  useFocusTrap(ref);

  return <div ref={ref}>{isMobile ? 'Mobile' : 'Desktop'}</div>;
}
```

## Public API

| Export              | Kind     | Description                                          |
| ------------------- | -------- | ---------------------------------------------------- |
| `useClickOutside`   | hook     | Calls callback when click occurs outside ref element |
| `useIsMobile`       | hook     | Returns boolean for mobile breakpoint (850px)        |
| `useFocusTrap`      | hook     | Traps Tab/Shift+Tab focus within a container element |
| `useFocusRestore`   | hook     | Saves and restores previously focused element        |
| `MOBILE_BREAKPOINT` | constant | Mobile breakpoint value in pixels (850)              |

## Peer Dependencies

| Package      | Version |
| ------------ | ------- |
| `react`      | ^19     |
| `typescript` | ^5      |

## Architecture Contract

**Dependency Level:** 2 — Primitives.

**Owns:** Shared hook implementations, interaction detection patterns, focus management.

**Does not own:** Component-specific state logic, data fetching hooks, or application-level state
management.

Contract: `docs/architecture/contracts/hooks.md`

## Documentation

- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system)
- [GitHub](https://github.com/HugoOliveiraThor/holiveira-design-system)
- Contract: `docs/architecture/contracts/hooks.md`

## License

MIT

## References

- `@ho-dev/types` — shared type definitions
- `@ho-dev/utils` — utility functions (optional hook internals)

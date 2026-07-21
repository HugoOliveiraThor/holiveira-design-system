# @holiveira/constants

Shared constants.

## Purpose

Route definitions, query key factories, storage keys, and numeric constants. Architectural role:
single source of truth for cross-package constant values.

## Installation

```bash
pnpm add @holiveira/constants
```

## Usage

```ts
import {
  ROUTES,
  ROUTE_PATTERNS,
  queryKeyFactory,
  STORAGE_KEYS,
  PAGE_SIZE,
} from '@holiveira/constants';

// Route constants
console.log(ROUTES.AUTH.SIGN_IN); // "/auth/sign-in"

// Route patterns for matching
if (ROUTE_PATTERNS.AUTH.test(pathname)) {
  // auth route
}

// Query key factory (TanStack Query)
const userKeys = queryKeyFactory('users');
queryClient.invalidateQueries({ queryKey: userKeys.lists });

// Numeric constants
console.log(PAGE_SIZE); // 10
console.log(TOAST_DURATION); // 5000
console.log(MOBILE_BREAKPOINT); // 850
```

## Public API

| Export                | Description                                  |
| --------------------- | -------------------------------------------- |
| `ROUTES`              | Object tree of all route paths               |
| `ROUTE_PATTERNS`      | RegExp patterns and path arrays for matching |
| `queryKeyFactory`     | Generic TanStack Query key factory           |
| `STORAGE_KEYS`        | localStorage/sessionStorage key constants    |
| `EVENTS`              | Custom event name constants                  |
| `PAGE_SIZE`           | Default pagination page size (10)            |
| `DEBOUNCE_MS`         | Default debounce delay (300ms)               |
| `TOAST_DURATION`      | Default toast display duration (5000ms)      |
| `MOBILE_BREAKPOINT`   | Mobile breakpoint in px (850)                |
| `MAX_FILE_SIZE`       | Max file upload size in bytes (1MB)          |
| `MIN_PASSWORD_LENGTH` | Minimum password length (8)                  |

## Architecture Contract

**Dependency Level:** 0 — Core.

**Owns:** Shared constant definitions, route path tree, query key factory pattern, storage key
conventions.

**Does not own:** Business logic, configuration values, or environment-specific constants.

See `docs/architecture/contracts/constants.md` for ownership and dependency boundaries.

## References

None — Level 0 package with no internal dependencies.

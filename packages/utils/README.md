# @holiveira/utils

Shared utility functions.

## Purpose

Class name merging (`cn`), component variants (`cva`), string formatting, object utilities, and timing functions (debounce, throttle). Architectural role: foundation utility layer for all packages.

## Installation

```bash
pnpm add @holiveira/utils
```

## Usage

```ts
import { cn, cva, debounce } from '@holiveira/utils';

// Class name merging
cn('px-4 py-2', isActive && 'bg-primary'); // "px-4 py-2 bg-primary"

// Component variants
const button = cva(['px-4', 'py-2'], { variants: { size: { sm: 'text-sm', lg: 'text-lg' } } });

// Debounced handler
const handleSearch = debounce((query: string) => fetchResults(query), 300);
```

## Public API

| Export           | Kind     | Description                                        |
| ---------------- | -------- | -------------------------------------------------- |
| `cn`             | function | Tailwind class name merger (clsx + tailwind-merge) |
| `cva`            | function | Class-variance-authority re-export                 |
| `VariantProps`   | type     | CVA variant props type                             |
| `slugify`        | function | String to URL-safe slug                            |
| `compactFormat`  | function | Compact number formatting                          |
| `standardFormat` | function | Standard number formatting                         |
| `pick`           | function | Pick keys from object                              |
| `omit`           | function | Omit keys from object                              |
| `merge`          | function | Deep object merge                                  |
| `isDefined`      | function | Non-nullish check                                  |
| `isPlainObject`  | function | Plain object check                                 |
| `assertDefined`  | function | Runtime assertion for defined values               |
| `debounce`       | function | Debounced function wrapper                         |
| `throttle`       | function | Throttled function wrapper                         |

## Architecture Contract

**Dependency Level:** 1 — Foundation.

**Owns:** Shared utility functions, class name composition, variant pattern infrastructure.

**Does not own:** UI components, business logic, framework-specific utilities, or application-level helpers.

See `docs/architecture/contracts/utils.md` for ownership and dependency boundaries.

## References

- `@holiveira/types` — shared type definitions

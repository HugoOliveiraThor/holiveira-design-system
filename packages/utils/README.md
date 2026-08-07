# @ho-dev/utils

Foundation utility library for class name composition, object manipulation, and timing functions.

## Purpose

Class name merging (`cn`), component variants (`cva`), string formatting, object utilities, and
timing functions (debounce, throttle). Architectural role: foundation utility layer for all
packages.

## Installation

```bash
pnpm add @ho-dev/utils
```

## Usage

```tsx
import { cn, cva, debounce } from '@ho-dev/utils';

// Class name merging
cn('px-4 py-2', isActive && 'bg-primary');

// Component variants
const button = cva(['px-4 py-2'], {
  variants: { size: { sm: 'text-sm', lg: 'text-lg' } },
});

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
| `compactFormat`  | function | Compact number formatting (e.g. 1.2K)              |
| `standardFormat` | function | Standard number formatting with separators         |
| `pick`           | function | Pick keys from object                              |
| `omit`           | function | Omit keys from object                              |
| `merge`          | function | Deep object merge                                  |
| `isDefined`      | function | Non-nullish type guard                             |
| `isPlainObject`  | function | Plain object type guard                            |
| `assertDefined`  | function | Runtime assertion for defined values               |
| `debounce`       | function | Debounced function wrapper                         |
| `throttle`       | function | Throttled function wrapper                         |

## Peer Dependencies

| Package      | Version |
| ------------ | ------- |
| `typescript` | ^5      |

## Architecture Contract

**Dependency Level:** 1 — Foundation.

**Owns:** Shared utility functions, class name composition (`cn`), variant pattern infrastructure
(`cva`), object manipulation, timing utilities.

**Does not own:** UI components, business logic, framework-specific utilities, locale-aware
formatting (`formatDate`, `formatCurrency` — owned by `@ho-dev/i18n`), or application-level helpers.

Contract: `docs/architecture/contracts/utils.md`

## Documentation

- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system)
- [GitHub](https://github.com/HugoOliveiraThor/holiveira-design-system)
- Contract: `docs/architecture/contracts/utils.md`

## License

MIT

## References

- `@ho-dev/types` — shared type definitions
- `@ho-dev/i18n` — locale-aware formatting (moved from utils)

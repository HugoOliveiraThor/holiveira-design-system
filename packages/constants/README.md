# @ho-dev/constants

Application constants.

## Purpose

Route definitions, query key factories, storage keys, and numeric constants. Architectural role:
single source of truth for cross-package constant values.

## Installation

```bash
pnpm add @ho-dev/constants
```

## Public API

| Export                | Kind     | Description                            |
| --------------------- | -------- | -------------------------------------- |
| `ROUTES`              | object   | Route path tree                        |
| `ROUTE_PATTERNS`      | object   | Path matching patterns                 |
| `queryKeyFactory`     | function | TanStack Query key factory             |
| `STORAGE_KEYS`        | object   | Storage key constants                  |
| `EVENTS`              | object   | Custom event name constants            |
| `PAGE_SIZE`           | number   | Default pagination page size           |
| `DEBOUNCE_MS`         | number   | Default debounce delay in milliseconds |
| `TOAST_DURATION`      | number   | Default toast display duration in ms   |
| `MOBILE_BREAKPOINT`   | number   | Mobile breakpoint in pixels            |
| `MAX_FILE_SIZE`       | number   | Maximum upload size in bytes           |
| `MIN_PASSWORD_LENGTH` | number   | Minimum password length                |

## Architecture Contract

**Dependency Level:** 1 — Foundation. **Owns:** Shared constant definitions, route path tree, query
key factory pattern, storage key conventions. **Does not own:** Business logic, configuration
values, or environment-specific constants. Contract: `docs/architecture/contracts/constants.md`

## Documentation

- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system)
- [Playground](https://HugoOliveiraThor.github.io/holiveira-design-system/playground/) — Full
  product screens composed from the packages
- [GitHub](https://github.com/HugoOliveiraThor/holiveira-design-system)
- Contract: `docs/architecture/contracts/constants.md`

## License

MIT

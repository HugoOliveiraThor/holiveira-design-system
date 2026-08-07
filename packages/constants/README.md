# @ho-dev/constants

Application constants.

## Purpose

Route definitions, query key factories, storage keys, and numeric constants. Architectural role:
single source of truth for cross-package constant values.

## Installation

```bash
pnpm add @ho-dev/constants
```

## Architecture Contract

**Dependency Level:** 1 — Foundation. **Owns:** Shared constant definitions, route path tree, query
key factory pattern, storage key conventions. **Does not own:** Business logic, configuration
values, or environment-specific constants. Contract: `docs/architecture/contracts/constants.md`

## Documentation

- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system)
- [GitHub](https://github.com/HugoOliveiraThor/holiveira-design-system)
- Contract: `docs/architecture/contracts/constants.md`

## License

MIT

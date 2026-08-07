# @ho-dev/config

Application configuration utilities.

## Purpose

Environment variable access, typed config objects per domain, and runtime environment helpers.
Architectural role: foundation-level configuration layer with zero runtime dependencies.

## Installation

```bash
pnpm add @ho-dev/config
```

## Architecture Contract

**Dependency Level:** 1 — Foundation. **Owns:** Typed config contracts, environment variable access
patterns, runtime environment detection. **Does not own:** Environment variable values, runtime
state validation beyond env access, or package-specific configuration. Contract:
`docs/architecture/contracts/config.md`

## Documentation

- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system)
- [GitHub](https://github.com/HugoOliveiraThor/holiveira-design-system)
- Contract: `docs/architecture/contracts/config.md`

## License

MIT

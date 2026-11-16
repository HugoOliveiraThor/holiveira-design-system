# @ho-dev/config

Application configuration utilities.

## Purpose

Environment variable access, typed config objects per domain, and runtime environment helpers.
Architectural role: foundation-level configuration layer with zero runtime dependencies.

## Installation

```bash
pnpm add @ho-dev/config
```

## Public API

| Export              | Kind     | Description                                  |
| ------------------- | -------- | -------------------------------------------- |
| `appConfig`         | object   | Application-level settings                   |
| `authConfig`        | object   | Authentication configuration                 |
| `apiConfig`         | object   | API client configuration                     |
| `dbConfig`          | object   | Database connection settings                 |
| `defineConfig`      | function | Helper to create a typed environment schema  |
| `getEnv`            | function | Read an env var with an optional default     |
| `requireEnv`        | function | Read a required env var, throws when missing |
| `isDev`             | boolean  | True when `NODE_ENV` is `development`        |
| `isProd`            | boolean  | True when `NODE_ENV` is `production`         |
| `isTest`            | boolean  | True when `NODE_ENV` is `test`               |
| `AppConfig`         | type     | Shape of `appConfig`                         |
| `AuthConfig`        | type     | Shape of `authConfig`                        |
| `ApiConfig`         | type     | Shape of `apiConfig`                         |
| `DbConfig`          | type     | Shape of `dbConfig`                          |
| `ConfigSchema`      | type     | Environment variable contract type           |
| `ConfigSchemaEntry` | type     | A single schema entry                        |

## Architecture Contract

**Dependency Level:** 1 — Foundation. **Owns:** Typed config contracts, environment variable access
patterns, runtime environment detection. **Does not own:** Environment variable values, runtime
state validation beyond env access, or package-specific configuration. Contract:
`docs/architecture/contracts/config.md`

## Documentation

- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system)
- [Playground](https://HugoOliveiraThor.github.io/holiveira-design-system/playground/) — Full
  product screens composed from the packages
- [GitHub](https://github.com/HugoOliveiraThor/holiveira-design-system)
- Contract: `docs/architecture/contracts/config.md`

## License

MIT

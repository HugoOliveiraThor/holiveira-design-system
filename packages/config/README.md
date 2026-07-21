# @holiveira/config

Application configuration utilities.

## Purpose

Environment variable access, typed config objects per domain, and runtime environment helpers.
Architectural role: foundation-level configuration layer with zero runtime dependencies.

## Installation

```bash
pnpm add @holiveira/config
```

## Usage

```ts
import { appConfig, authConfig, dbConfig, isDev, requireEnv } from '@holiveira/config';

// Typed config objects
console.log(appConfig.url);
console.log(authConfig.secret);

// Environment helpers
if (isDev) {
  console.log('Running in development mode');
}

// Low-level env access
const apiKey = requireEnv('API_KEY');
```

## Public API

### Config objects

| Export       | Type         | Description                  |
| ------------ | ------------ | ---------------------------- |
| `appConfig`  | `AppConfig`  | Application-level settings   |
| `authConfig` | `AuthConfig` | Authentication configuration |
| `apiConfig`  | `ApiConfig`  | API client configuration     |
| `dbConfig`   | `DbConfig`   | Database connection settings |

### Helpers

| Export       | Description                                  |
| ------------ | -------------------------------------------- |
| `getEnv`     | Safely read an env var with optional default |
| `requireEnv` | Read a required env var — throws if missing  |
| `isDev`      | `true` when `NODE_ENV === "development"`     |
| `isProd`     | `true` when `NODE_ENV === "production"`      |
| `isTest`     | `true` when `NODE_ENV === "test"`            |

### Schema

| Export         | Description                                   |
| -------------- | --------------------------------------------- |
| `ConfigSchema` | Type for describing environment var contracts |
| `defineConfig` | Helper to create a typed config schema        |

### Types

| Export       | Description           |
| ------------ | --------------------- |
| `AppConfig`  | Shape of `appConfig`  |
| `AuthConfig` | Shape of `authConfig` |
| `ApiConfig`  | Shape of `apiConfig`  |
| `DbConfig`   | Shape of `dbConfig`   |

## Architecture Contract

**Dependency Level:** 0 — Core.

**Owns:** Typed config contracts, environment variable access patterns, runtime environment
detection.

**Does not own:** Environment variable values, runtime state validation beyond env access, or
package-specific configuration.

See `docs/architecture/contracts/config.md` for ownership and dependency boundaries.

## References

None — Level 0 package with no internal dependencies.

# Package Contract: @ho-dev/config

Level: 0 Category: Core

## Purpose

Provide centralized configuration for all packages, including environment variables and runtime
settings.

## Responsibilities

- Define configuration schema
- Load and validate environment variables
- Provide typed config objects per domain (auth, api, database, app)

## Allowed Dependencies

- (none)

## Forbidden Dependencies

- Any package or application

## Public API

### Config Objects

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

| Export              | Description                                   |
| ------------------- | --------------------------------------------- |
| `ConfigSchema`      | Type for describing environment var contracts |
| `ConfigSchemaEntry` | Type for a single config schema entry         |
| `defineConfig`      | Helper to create a typed config schema        |

### Types

| Export       | Description           |
| ------------ | --------------------- |
| `AppConfig`  | Shape of `appConfig`  |
| `AuthConfig` | Shape of `authConfig` |
| `ApiConfig`  | Shape of `apiConfig`  |
| `DbConfig`   | Shape of `dbConfig`   |

## Internal API

| Export            | Description                                                         |
| ----------------- | ------------------------------------------------------------------- |
| `_validateConfig` | Validates a ConfigSchema against process.env — returns errors array |
| `_loadDotEnv`     | _Deferred; no real requirement yet_                                 |

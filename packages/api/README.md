# @holiveira/api

HTTP client and API integration patterns.

## Purpose

Provides a typed API client factory with error handling, request/response interceptors, and status code constants. Architectural role: abstracts HTTP transport for service-layer packages.

## Installation

```bash
pnpm add @holiveira/api
```

## Usage

```ts
import { createApiClient } from '@holiveira/api';

const client = createApiClient({ baseUrl: 'https://api.example.com' });

const response = await client.get('/users');
// response is typed as ApiResponse<T>
```

## Public API

| Export            | Kind     | Description                            |
| ----------------- | -------- | -------------------------------------- |
| `createApiClient` | function | Factory for typed API client instances |
| `ApiResponse`     | type     | Generic response wrapper               |
| `ApiError`        | class    | Structured API error class             |
| `HttpMethod`      | type     | Union of HTTP method strings           |
| `StatusCode`      | object   | HTTP status code constants             |
| `ApiConfig`       | type     | Client configuration type              |

## Architecture Contract

**Dependency Level:** 4 — Services.

**Owns:** HTTP client infrastructure, response types, error classes.

**Does not own:** API route definitions, authentication token management, data caching, or request validation schemas.

See `docs/architecture/contracts/api.md` for ownership and dependency boundaries.

## References

- `@holiveira/config` — `ApiConfig` type integration
- `@holiveira/types` — shared type foundation

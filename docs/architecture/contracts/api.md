# Package Contract: @holiveira/api

Level: 4 Category: Services

## Purpose

HTTP infrastructure — a typed fetch-based API client with error handling, timeout, and retry. Pure
TypeScript, zero external runtime dependencies. No database, no auth, no React, no Next.js, no
business endpoints.

## Responsibilities

- Provide a typed HTTP client factory (`createApiClient`)
- Provide structured API response types (discriminated union via `ok`)
- Provide `ApiError` class with factory methods for common error patterns
- Handle request timeout via `AbortController`
- Support linear and exponential backoff retry strategies

## Allowed Dependencies

- None — api has zero framework dependencies

## Forbidden Dependencies

- Any @holiveira/\* package — api is a standalone HTTP client
- Any database package
- Any auth package
- Any UI package
- Any application

## Public API

- `createApiClient` (factory function)
- `ApiResponse<T>` (discriminated union: `{ ok: true; data: T } | { ok: false; error: ApiError }`)
- `ApiError` (class with 6 factory methods: unauthorized, forbidden, notFound, validation,
  serverError, networkError)
- `HttpMethod` (union type: GET | POST | PUT | PATCH | DELETE)
- `StatusCode` (const object: 200, 201, 204, 400, 401, 403, 404, 409, 422, 429, 500, 503)
- `ApiConfig` (interface: baseUrl, headers, timeout, retry)

## Internal API

- `buildUrl` — URL construction helper
- `parseErrorBody` — response body → ApiError parsing
- `request` — core fetch wrapper with timeout, retry, JSON serialization

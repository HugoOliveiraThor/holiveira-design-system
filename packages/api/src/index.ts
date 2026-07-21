/** @public — Creates a typed HTTP client with configurable base URL, headers, timeout, and retry */
export { createApiClient } from "./client";

/** @public — Discriminated union of successful (ok: true) and error (ok: false) API responses */
export type { ApiResponse } from "./types";

/** @public — Structured HTTP error with status code, machine-readable code, and optional details */
export { ApiError } from "./types";

/** @public — HTTP method union: GET, POST, PUT, PATCH, DELETE */
export type { HttpMethod } from "./types";

/** @public — HTTP status code constants (200, 201, 204, 400, 401, 403, 404, 409, 422, 429, 500, 503) */
export { StatusCode } from "./types";

/** @public — Configuration type for createApiClient: baseUrl, headers, timeout, retry */
export type { ApiConfig } from "./types";

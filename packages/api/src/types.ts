export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const StatusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export type StatusCode = (typeof StatusCode)[keyof typeof StatusCode];

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static unauthorized(message = 'Unauthorized'): ApiError {
    return new ApiError(StatusCode.UNAUTHORIZED, 'UNAUTHORIZED', message);
  }

  static forbidden(message = 'Forbidden'): ApiError {
    return new ApiError(StatusCode.FORBIDDEN, 'FORBIDDEN', message);
  }

  static notFound(message = 'Not Found'): ApiError {
    return new ApiError(StatusCode.NOT_FOUND, 'NOT_FOUND', message);
  }

  static validation(details?: unknown): ApiError {
    return new ApiError(StatusCode.UNPROCESSABLE, 'VALIDATION_ERROR', 'Validation failed', details);
  }

  static serverError(message = 'Internal Server Error'): ApiError {
    return new ApiError(StatusCode.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR', message);
  }

  static networkError(message = 'Network Error'): ApiError {
    return new ApiError(0, 'NETWORK_ERROR', message);
  }
}

export interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  timeout?: number;
  retry?: {
    maxAttempts: number;
    backoff: 'linear' | 'exponential';
  };
}

export type ApiResponse<T> =
  { ok: true; data: T; status: number; headers: Headers } | { ok: false; error: ApiError };

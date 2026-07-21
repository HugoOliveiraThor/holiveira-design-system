import type { ApiConfig, ApiResponse, HttpMethod } from './types';
import { ApiError } from './types';

interface ApiClient {
  get<T>(path: string): Promise<ApiResponse<T>>;
  post<T>(path: string, body?: unknown): Promise<ApiResponse<T>>;
  put<T>(path: string, body?: unknown): Promise<ApiResponse<T>>;
  patch<T>(path: string, body?: unknown): Promise<ApiResponse<T>>;
  delete<T>(path: string): Promise<ApiResponse<T>>;
}

function buildUrl(baseUrl: string, path: string): string {
  const base = baseUrl.replace(/\/+$/, '');
  const p = path.replace(/^\/+/, '');
  return `${base}/${p}`;
}

async function parseErrorBody(response: Response): Promise<ApiError> {
  try {
    const body = (await response.json()) as {
      message?: string;
      code?: string;
      details?: unknown;
    };
    return new ApiError(
      response.status,
      body.code ?? 'UNKNOWN_ERROR',
      body.message ?? response.statusText,
      body.details,
    );
  } catch {
    try {
      const text = await response.text();
      return new ApiError(response.status, 'UNKNOWN_ERROR', text || response.statusText);
    } catch {
      return new ApiError(response.status, 'UNKNOWN_ERROR', response.statusText);
    }
  }
}

async function request<T>(
  baseUrl: string,
  path: string,
  method: HttpMethod,
  defaultHeaders: Record<string, string>,
  body?: unknown,
  config?: ApiConfig,
): Promise<ApiResponse<T>> {
  const url = buildUrl(baseUrl, path);
  const headers: Record<string, string> = { ...defaultHeaders };

  if (body !== undefined && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const controller = new AbortController();
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  if (config?.timeout) {
    timeoutId = setTimeout(() => controller.abort(), config.timeout);
  }

  const doFetch = (): Promise<Response> =>
    fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

  const fetchWithRetry = async (attempts = 0): Promise<Response> => {
    try {
      const response = await doFetch();

      if (response.status >= 500 && config?.retry && attempts < config.retry.maxAttempts - 1) {
        const delay =
          config.retry.backoff === 'exponential' ? 500 * 2 ** (attempts + 1) : 500 * (attempts + 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchWithRetry(attempts + 1);
      }

      return response;
    } catch (error) {
      if (config?.retry && attempts < config.retry.maxAttempts - 1) {
        const delay =
          config.retry.backoff === 'exponential' ? 500 * 2 ** (attempts + 1) : 500 * (attempts + 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchWithRetry(attempts + 1);
      }

      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new ApiError(0, 'TIMEOUT', 'Request timed out');
      }

      throw ApiError.networkError(error instanceof Error ? error.message : String(error));
    }
  };

  try {
    const response = await fetchWithRetry();
    clearTimeout(timeoutId);

    if (!response.ok) {
      return { ok: false, error: await parseErrorBody(response) };
    }

    if (response.status === 204) {
      return {
        ok: true,
        data: undefined as T,
        status: response.status,
        headers: response.headers,
      };
    }

    const data = (await response.json()) as T;
    return {
      ok: true,
      data,
      status: response.status,
      headers: response.headers,
    };
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof ApiError) {
      return { ok: false, error };
    }

    return {
      ok: false,
      error: ApiError.networkError(String(error)),
    };
  }
}

export function createApiClient(config: ApiConfig): ApiClient {
  const defaultHeaders = config.headers ?? {};

  return {
    get<T>(path: string): Promise<ApiResponse<T>> {
      return request<T>(config.baseUrl, path, 'GET', defaultHeaders, undefined, config);
    },
    post<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
      return request<T>(config.baseUrl, path, 'POST', defaultHeaders, body, config);
    },
    put<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
      return request<T>(config.baseUrl, path, 'PUT', defaultHeaders, body, config);
    },
    patch<T>(path: string, body?: unknown): Promise<ApiResponse<T>> {
      return request<T>(config.baseUrl, path, 'PATCH', defaultHeaders, body, config);
    },
    delete<T>(path: string): Promise<ApiResponse<T>> {
      return request<T>(config.baseUrl, path, 'DELETE', defaultHeaders, undefined, config);
    },
  };
}

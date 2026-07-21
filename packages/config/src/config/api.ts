/** Shape of the API client configuration object. */
export interface ApiConfig {
  /** Base URL for API requests (defaults to `NEXT_PUBLIC_APP_URL`). */
  baseUrl: string
}

/** Typed API configuration object using lazy getters. */
export const apiConfig: ApiConfig = {
  get baseUrl() {
    return process.env.NEXT_PUBLIC_APP_URL ?? ""
  },
}

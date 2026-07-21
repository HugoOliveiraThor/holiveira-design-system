/** Returns `true` when `NODE_ENV` is set to `"development"`. */
export const isDev = process.env.NODE_ENV === "development"

/** Returns `true` when `NODE_ENV` is set to `"production"`. */
export const isProd = process.env.NODE_ENV === "production"

/** Returns `true` when `NODE_ENV` is set to `"test"`. */
export const isTest = process.env.NODE_ENV === "test"

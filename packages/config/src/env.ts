/** Safely read an env var, returning `defaultValue` when the variable is not set. */
export function getEnv(key: string, defaultValue?: string): string | undefined {
  return process.env[key] ?? defaultValue;
}

/** Read a required env var — throws if the variable is missing or empty. */
export function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`[@holiveira/config] Environment variable "${key}" is required but not set.`);
  }
  return value;
}

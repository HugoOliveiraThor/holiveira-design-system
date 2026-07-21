import type { ConfigSchema } from '../schema';

export function _validateConfig(schema: ConfigSchema): string[] {
  const errors: string[] = [];

  for (const [key, entry] of Object.entries(schema)) {
    if (entry.required) {
      const value = process.env[key];
      if (!value) {
        errors.push(`[@holiveira/config] Missing required environment variable: "${key}"`);
      }
    }
  }

  return errors;
}

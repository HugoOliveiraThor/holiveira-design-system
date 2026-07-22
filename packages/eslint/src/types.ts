export type Config = {
  plugins?: Record<string, unknown>;
  rules?: Record<string, unknown>;
  languageOptions?: Record<string, unknown>;
  linterOptions?: Record<string, unknown>;
  settings?: Record<string, unknown>;
  files?: string[];
  ignores?: string[];
};

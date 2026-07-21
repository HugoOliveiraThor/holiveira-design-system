import { vi } from "vitest";

export type MockHeaders = ReturnType<typeof mockHeaders>;

export function mockHeaders(
  entries?: Record<string, string>
): Headers {
  const headers = new Headers();
  if (entries) {
    for (const [key, value] of Object.entries(entries)) {
      headers.set(key, value);
    }
  }
  return headers;
}

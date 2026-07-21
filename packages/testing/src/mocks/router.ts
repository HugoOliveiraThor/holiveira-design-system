import { vi } from 'vitest';

export interface MockRouter {
  push: ReturnType<typeof vi.fn>;
  replace: ReturnType<typeof vi.fn>;
  back: ReturnType<typeof vi.fn>;
  forward: ReturnType<typeof vi.fn>;
  refresh: ReturnType<typeof vi.fn>;
  prefetch: ReturnType<typeof vi.fn>;
  pathname: string;
  query: Record<string, string | string[] | undefined>;
  asPath: string;
}

export function mockRouter(overrides?: Partial<MockRouter>): MockRouter {
  return {
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
    ...overrides,
  };
}

export type MockSearchParams = ReturnType<typeof mockSearchParams>;

export function mockSearchParams(params?: Record<string, string>): URLSearchParams {
  const searchParams = new URLSearchParams();
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      searchParams.set(key, value);
    }
  }
  return searchParams;
}

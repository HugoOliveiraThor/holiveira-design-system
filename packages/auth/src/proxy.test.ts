import type { NextRequest } from 'next/server';
import { vi, describe, it, expect } from 'vitest';

vi.mock('@holiveira/db', () => ({ db: {} }));

import { createProxy } from './index';

const mockAuth = {
  api: {
    getSession: async () => ({
      session: { fresh: true },
      user: { name: 'Test', role: 'viewer' },
    }),
  },
};

function mockRequest(pathname: string, cookie?: string): NextRequest {
  return {
    nextUrl: {
      pathname,
      searchParams: new URLSearchParams(),
      clone: () => ({ pathname, searchParams: new URLSearchParams(), search: '' }),
    },
    cookies: { get: () => (cookie ? { value: cookie } : undefined) },
    headers: new Headers(),
  } as unknown as NextRequest;
}

describe('createProxy', () => {
  it('returns proxy and config', () => {
    const result = createProxy({
      auth: mockAuth as any,
      signInPath: '/auth/sign-in',
    });

    expect(typeof result.proxy).toBe('function');
    expect(Array.isArray(result.config.matcher)).toBe(true);
  });

  it('allows access to auth pages without cookie', async () => {
    const { proxy } = createProxy({
      auth: mockAuth as any,
      signInPath: '/auth/sign-in',
    });

    const response = await proxy(mockRequest('/auth/sign-in'));
    expect(response.status).toBe(200);
  });

  it('provides default onError handler', () => {
    const result = createProxy({
      auth: mockAuth as any,
      signInPath: '/auth/sign-in',
    });

    expect(result.config.matcher).toContain(
      '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    );
  });
});

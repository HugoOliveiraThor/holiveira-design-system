import type { MockSessionOptions } from "../types";

export interface MockSession {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    emailVerified: boolean | null;
  };
  session: {
    expiresAt: Date;
    token: string;
    fresh: boolean;
  };
}

export const mockSession: MockSession = {
  user: {
    id: "mock-user-id",
    name: "Test User",
    email: "test@example.com",
    image: null,
    emailVerified: null,
  },
  session: {
    expiresAt: new Date("2099-12-31"),
    token: "mock-session-token",
    fresh: true,
  },
};

export function createMockSession(
  options?: MockSessionOptions
): MockSession {
  return {
    user: {
      id: "mock-user-id",
      name: "Test User",
      email: "test@example.com",
      image: null,
      emailVerified: null,
      ...options?.user,
    },
    session: {
      expiresAt: new Date("2099-12-31"),
      token: "mock-session-token",
      fresh: true,
      ...options?.session,
    },
  };
}

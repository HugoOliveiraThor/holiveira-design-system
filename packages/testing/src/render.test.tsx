import React from 'react';
import { describe, it, expect } from 'vitest';

import { renderWithProviders, mockSession, createMockSession } from './index';

describe('renderWithProviders', () => {
  it('renders children with a provider', () => {
    function SimpleProvider({ children }: { children: React.ReactNode }) {
      return <div data-testid="provider">{children}</div>;
    }

    const { container } = renderWithProviders(<span>content</span>, {
      providers: [SimpleProvider],
    });

    const provider = container.querySelector('[data-testid="provider"]');
    expect(provider).toBeInTheDocument();
    expect(provider).toHaveTextContent('content');
  });

  it('renders children without providers', () => {
    const { container } = renderWithProviders(<span>standalone</span>, {
      providers: [],
    });

    expect(container).toHaveTextContent('standalone');
  });
});

describe('mockSession', () => {
  it('exports a default session object', () => {
    expect(mockSession.user.name).toBe('Test User');
    expect(mockSession.user.email).toBe('test@example.com');
  });
});

describe('createMockSession', () => {
  it('creates a session with default values', () => {
    const session = createMockSession();
    expect(session.user.name).toBe('Test User');
    expect(session.session.expiresAt).toBeInstanceOf(Date);
  });

  it('allows overriding user properties', () => {
    const session = createMockSession({ user: { name: 'Custom' } });
    expect(session.user.name).toBe('Custom');
  });

  it('allows overriding session properties', () => {
    const session = createMockSession({ session: { fresh: true } });
    expect(session.session.fresh).toBe(true);
  });
});

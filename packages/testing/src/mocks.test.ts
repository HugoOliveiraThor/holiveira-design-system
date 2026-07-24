import { describe, it, expect } from 'vitest';

import { mockRouter, mockSearchParams } from './index';

describe('mockRouter', () => {
  it('returns a router with default values', () => {
    const router = mockRouter();
    expect(router.pathname).toBe('/');
    expect(router.query).toEqual({});
  });

  it('allows overriding defaults', () => {
    const router = mockRouter({ pathname: '/dashboard' });
    expect(router.pathname).toBe('/dashboard');
  });

  it('provides mock functions for navigation', () => {
    const router = mockRouter();
    expect(typeof router.push).toBe('function');
    expect(typeof router.replace).toBe('function');
    expect(typeof router.back).toBe('function');
  });
});

describe('mockSearchParams', () => {
  it('returns empty params when no input', () => {
    const params = mockSearchParams();
    expect(params.toString()).toBe('');
  });

  it('creates params from a record', () => {
    const params = mockSearchParams({ q: 'test', page: '1' });
    expect(params.get('q')).toBe('test');
    expect(params.get('page')).toBe('1');
  });
});

import { describe, it, expect } from 'vitest';

import {
  PAGE_SIZE,
  DEBOUNCE_MS,
  TOAST_DURATION,
  MOBILE_BREAKPOINT,
  MAX_FILE_SIZE,
  MIN_PASSWORD_LENGTH,
  queryKeyFactory,
  ROUTES,
  ROUTE_PATTERNS,
  STORAGE_KEYS,
} from './index';

describe('ROUTES', () => {
  it('has a HOME route', () => {
    expect(ROUTES.HOME).toBe('/');
  });

  it('has auth routes', () => {
    expect(ROUTES.AUTH.SIGN_IN).toBe('/auth/sign-in');
    expect(ROUTES.AUTH.SIGN_UP).toBe('/auth/sign-up');
  });

  it('has dashboard route', () => {
    expect(ROUTES.DASHBOARD).toBeDefined();
    expect(typeof ROUTES.DASHBOARD).toBe('string');
  });
});

describe('ROUTE_PATTERNS', () => {
  it('matches auth routes', () => {
    expect('/auth/sign-in').toMatch(ROUTE_PATTERNS.AUTH);
    expect('/auth/sign-up').toMatch(ROUTE_PATTERNS.AUTH);
  });

  it('does not match non-auth routes', () => {
    expect('/dashboard').not.toMatch(ROUTE_PATTERNS.AUTH);
  });
});

describe('queryKeyFactory', () => {
  const factory = queryKeyFactory('users');

  it('generates all key', () => {
    expect(factory.all).toEqual(['users']);
  });

  it('generates lists key', () => {
    expect(factory.lists).toEqual(['users', 'list']);
  });

  it('generates filtered list key', () => {
    expect(factory.list({ role: 'admin' })).toEqual(['users', 'list', { role: 'admin' }]);
  });

  it('generates details key', () => {
    expect(factory.details).toEqual(['users', 'detail']);
  });

  it('generates detail key with id', () => {
    expect(factory.detail('123')).toEqual(['users', 'detail', '123']);
  });
});

describe('STORAGE_KEYS', () => {
  it('has a theme key', () => {
    expect(STORAGE_KEYS.THEME).toBe('theme');
  });
});

describe('constants', () => {
  it('PAGE_SIZE is 10', () => {
    expect(PAGE_SIZE).toBe(10);
  });

  it('DEBOUNCE_MS is 300', () => {
    expect(DEBOUNCE_MS).toBe(300);
  });

  it('TOAST_DURATION is 5000', () => {
    expect(TOAST_DURATION).toBe(5000);
  });

  it('MOBILE_BREAKPOINT is 850', () => {
    expect(MOBILE_BREAKPOINT).toBe(850);
  });

  it('MAX_FILE_SIZE is 1 MB', () => {
    expect(MAX_FILE_SIZE).toBe(1_048_576);
  });

  it('MIN_PASSWORD_LENGTH is 8', () => {
    expect(MIN_PASSWORD_LENGTH).toBe(8);
  });
});

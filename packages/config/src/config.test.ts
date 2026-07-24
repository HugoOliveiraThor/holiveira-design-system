import { describe, it, expect } from 'vitest';

import { defineConfig, getEnv, requireEnv, isDev, isProd, isTest } from './index';

describe('defineConfig', () => {
  it('returns the schema unchanged', () => {
    const schema = { MY_VAR: { type: 'string' as const } };
    expect(defineConfig(schema)).toBe(schema);
  });
});

describe('getEnv', () => {
  it('returns undefined for unset env var without default', () => {
    expect(getEnv('UNSET_VAR_12345')).toBeUndefined();
  });

  it('returns default when env var is not set', () => {
    expect(getEnv('UNSET_VAR_12345', 'fallback')).toBe('fallback');
  });

  it('returns the env var value when set', () => {
    process.env.TEST_MY_VAR = 'hello';
    expect(getEnv('TEST_MY_VAR')).toBe('hello');
    delete process.env.TEST_MY_VAR;
  });
});

describe('requireEnv', () => {
  it('throws for unset env var', () => {
    expect(() => requireEnv('UNSET_REQUIRED_VAR')).toThrow();
  });

  it('returns the value when set', () => {
    process.env.TEST_REQUIRED_VAR = 'required-value';
    expect(requireEnv('TEST_REQUIRED_VAR')).toBe('required-value');
    delete process.env.TEST_REQUIRED_VAR;
  });
});

describe('environment flags', () => {
  it('isDev is false when running in test environment', () => {
    expect(isDev).toBe(false);
  });

  it('isProd is false when running in test environment', () => {
    expect(isProd).toBe(false);
  });

  it('isTest is true when running in test environment', () => {
    expect(isTest).toBe(true);
  });
});

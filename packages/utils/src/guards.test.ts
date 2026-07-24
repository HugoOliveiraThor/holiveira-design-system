import { describe, it, expect } from 'vitest';

import { isDefined, isPlainObject, assertDefined } from './index';

describe('isDefined', () => {
  it('returns true for a string', () => {
    expect(isDefined('hello')).toBe(true);
  });

  it('returns true for zero', () => {
    expect(isDefined(0)).toBe(true);
  });

  it('returns true for empty string', () => {
    expect(isDefined('')).toBe(true);
  });

  it('returns false for null', () => {
    expect(isDefined(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isDefined(undefined)).toBe(false);
  });
});

describe('isPlainObject', () => {
  it('returns true for a literal object', () => {
    expect(isPlainObject({})).toBe(true);
  });

  it('returns true for an object with properties', () => {
    expect(isPlainObject({ a: 1 })).toBe(true);
  });

  it('returns false for an array', () => {
    expect(isPlainObject([])).toBe(false);
  });

  it('returns false for null', () => {
    expect(isPlainObject(null)).toBe(false);
  });

  it('returns false for a class instance', () => {
    expect(isPlainObject(new Date())).toBe(false);
  });

  it('returns false for a string', () => {
    expect(isPlainObject('hello')).toBe(false);
  });
});

describe('assertDefined', () => {
  it('passes for a defined value', () => {
    expect(() => assertDefined('hello')).not.toThrow();
  });

  it('passes for zero', () => {
    expect(() => assertDefined(0)).not.toThrow();
  });

  it('throws for null', () => {
    expect(() => assertDefined(null)).toThrow('Expected value to be defined');
  });

  it('throws for undefined', () => {
    expect(() => assertDefined(undefined)).toThrow('Expected value to be defined');
  });

  it('includes the name in the error message', () => {
    expect(() => assertDefined(null, 'myVar')).toThrow('Expected "myVar" to be defined');
  });
});

import { describe, it, expect } from 'vitest';

import { pick, omit, merge } from './index';

describe('pick', () => {
  it('picks specified keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });

  it('returns empty object for empty key array', () => {
    expect(pick({ a: 1 }, [])).toEqual({});
  });

  it('ignores keys not in the object', () => {
    expect(pick({ a: 1 }, ['b'])).toEqual({});
  });
});

describe('omit', () => {
  it('omits specified keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj, ['a', 'c'])).toEqual({ b: 2 });
  });

  it('returns the same object when no keys omitted', () => {
    expect(omit({ a: 1 }, [])).toEqual({ a: 1 });
  });

  it('ignores keys not in the object', () => {
    expect(omit({ a: 1 }, ['b'])).toEqual({ a: 1 });
  });
});

describe('merge', () => {
  it('merges two objects', () => {
    expect(merge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  it('overrides target keys with source keys', () => {
    expect(merge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
  });

  it('handles empty target', () => {
    expect(merge({}, { a: 1 })).toEqual({ a: 1 });
  });

  it('handles empty source', () => {
    expect(merge({ a: 1 }, {})).toEqual({ a: 1 });
  });
});

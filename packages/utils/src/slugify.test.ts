import { describe, it, expect } from 'vitest';

import { slugify } from './index';

describe('slugify', () => {
  it('converts to lowercase', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('replaces spaces with hyphens', () => {
    expect(slugify('a b c')).toBe('a-b-c');
  });

  it('handles single word', () => {
    expect(slugify('hello')).toBe('hello');
  });

  it('handles empty string', () => {
    expect(slugify('')).toBe('');
  });
});

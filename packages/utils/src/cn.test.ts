import { describe, it, expect } from 'vitest';

import { cn } from './index';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('handles conditional classes with falsy values', () => {
    expect(cn('px-4', false && 'hidden', 'py-2')).toBe('px-4 py-2');
  });

  it('handles conditional classes with truthy values', () => {
    expect(cn('px-4', true && 'text-center', 'py-2')).toBe('px-4 text-center py-2');
  });

  it('deduplicates conflicting Tailwind classes', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6');
  });

  it('handles empty input', () => {
    expect(cn()).toBe('');
  });

  it('handles clsx class array syntax', () => {
    expect(cn(['px-4', 'py-2'])).toBe('px-4 py-2');
  });
});

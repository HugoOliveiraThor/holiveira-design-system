import { describe, it, expect } from 'vitest';

import { formatDate } from './index';

describe('formatDate', () => {
  it('formats a Date object with default locale', () => {
    const date = new Date(2026, 0, 15);
    const result = formatDate(date);
    expect(result).toContain('2026');
  });

  it('formats a string date', () => {
    const result = formatDate('2026-01-15');
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('formats a timestamp number', () => {
    const timestamp = new Date(2026, 5, 15).getTime();
    const result = formatDate(timestamp);
    expect(typeof result).toBe('string');
  });

  it('applies custom format options', () => {
    const date = new Date(2026, 6, 15);
    const result = formatDate(date, { year: 'numeric', month: 'long', day: 'numeric' });
    expect(result).toContain('2026');
  });
});

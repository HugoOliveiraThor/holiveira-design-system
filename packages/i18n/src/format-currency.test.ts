import { describe, it, expect } from 'vitest';

import { formatCurrency } from './index';

describe('formatCurrency', () => {
  it('formats USD by default', () => {
    const result = formatCurrency(100);
    expect(result).toContain('100');
  });

  it('formats EUR with locale', () => {
    const result = formatCurrency(100, { locale: 'de-DE', currency: 'EUR' });
    expect(result).toContain('100');
  });

  it('handles zero', () => {
    const result = formatCurrency(0);
    expect(typeof result).toBe('string');
  });

  it('handles decimal values', () => {
    const result = formatCurrency(99.99);
    expect(typeof result).toBe('string');
  });
});

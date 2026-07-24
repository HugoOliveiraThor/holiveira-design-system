import { describe, it, expect } from 'vitest';

import { compactFormat, standardFormat } from './index';

describe('compactFormat', () => {
  it('formats hundreds as-is', () => {
    expect(compactFormat(500)).toBe('500');
  });

  it('formats thousands as K', () => {
    expect(compactFormat(1500)).toBe('1.5K');
  });

  it('formats millions as M', () => {
    expect(compactFormat(2_500_000)).toBe('2.5M');
  });

  it('handles zero', () => {
    expect(compactFormat(0)).toBe('0');
  });

  it('handles negative numbers', () => {
    const result = compactFormat(-1000);
    expect(result).toContain('1');
  });
});

describe('standardFormat', () => {
  it('formats integer with two decimal places', () => {
    expect(standardFormat(100)).toBe('100.00');
  });

  it('formats decimal with rounding', () => {
    expect(standardFormat(1234.567)).toBe('1,234.57');
  });

  it('handles zero', () => {
    expect(standardFormat(0)).toBe('0.00');
  });

  it('handles large numbers with grouping', () => {
    expect(standardFormat(1_000_000)).toBe('1,000,000.00');
  });
});

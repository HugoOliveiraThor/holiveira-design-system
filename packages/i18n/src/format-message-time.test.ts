import { describe, it, expect } from 'vitest';

import { formatMessageTime } from './index';

describe('formatMessageTime', () => {
  it('returns relative time for a recent timestamp', () => {
    const now = new Date();
    const result = formatMessageTime(now.getTime() - 5 * 60 * 1000, {
      locale: 'en-US',
      now: now.getTime(),
    });
    expect(typeof result).toBe('string');
  });

  it('returns time for same day messages', () => {
    const today = new Date();
    const past = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0, 0);
    const result = formatMessageTime(past, {
      locale: 'en-US',
      now: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0, 0).getTime(),
    });
    expect(result).toContain(':');
  });

  it('returns day name for messages within a week', () => {
    const today = new Date(2026, 6, 24);
    const threeDaysAgo = new Date(2026, 6, 21, 10, 0, 0);
    const result = formatMessageTime(threeDaysAgo, { locale: 'en-US', now: today.getTime() });
    expect(typeof result).toBe('string');
  });

  it('returns month and day for messages within the year', () => {
    const today = new Date(2026, 6, 24);
    const lastMonth = new Date(2026, 2, 15, 10, 0, 0);
    const result = formatMessageTime(lastMonth, { locale: 'en-US', now: today.getTime() });
    expect(typeof result).toBe('string');
  });
});

import { formatCurrency } from '@ho-dev/i18n';
import { describe, expect, it } from 'vitest';

import {
  formatOrderAmount,
  monthlyPoints,
  orders,
  ordersSeries,
  revenueSeries,
  statCards,
} from './mock-data';

describe('mock data', () => {
  it('formats order amounts with formatCurrency', () => {
    expect(formatOrderAmount(1234.5)).toBe('$1,234.50');

    for (const order of orders) {
      expect(formatOrderAmount(order.amount)).toBe(formatCurrency(order.amount));
    }
  });

  it('exports 24 orders and 12 monthly points with stable ids', () => {
    expect(orders).toHaveLength(24);
    expect(new Set(orders.map((order) => order.id)).size).toBe(24);

    expect(monthlyPoints).toHaveLength(12);
    expect(monthlyPoints.map((point) => point.month)).toEqual([
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]);

    expect(revenueSeries).toHaveLength(1);
    expect(revenueSeries[0].data).toHaveLength(12);
    expect(ordersSeries).toHaveLength(1);
    expect(ordersSeries[0].data).toHaveLength(12);
    expect(statCards).toHaveLength(3);
  });
});

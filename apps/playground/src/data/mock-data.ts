import type { ChartSeries } from '@ho-dev/charts';
import { formatCurrency } from '@ho-dev/i18n';

export type OrderStatus = 'paid' | 'pending' | 'refunded';

export interface Order {
  id: string;
  customer: string;
  email: string;
  status: OrderStatus;
  amount: number;
  placedAt: string;
}

export interface MonthlyPoint {
  month: string;
  revenue: number;
  orders: number;
}

export interface StatCard {
  id: string;
  label: string;
  value: string;
  change: string;
}

/** Formats an order amount with the design system currency helper. */
export function formatOrderAmount(amount: number): string {
  return formatCurrency(amount);
}

export const orders: Order[] = [
  {
    id: 'order-01',
    customer: 'Acme Studio',
    email: 'billing@acme.studio',
    status: 'paid',
    amount: 1240.5,
    placedAt: '2026-10-02',
  },
  {
    id: 'order-02',
    customer: 'Northwind Labs',
    email: 'ap@northwind.dev',
    status: 'pending',
    amount: 860,
    placedAt: '2026-10-04',
  },
  {
    id: 'order-03',
    customer: 'Globex Corp',
    email: 'finance@globex.co',
    status: 'paid',
    amount: 2410.75,
    placedAt: '2026-10-05',
  },
  {
    id: 'order-04',
    customer: 'Initech',
    email: 'accounts@initech.io',
    status: 'refunded',
    amount: 320,
    placedAt: '2026-10-07',
  },
  {
    id: 'order-05',
    customer: 'Umbrella Health',
    email: 'billing@umbrella.health',
    status: 'paid',
    amount: 5175.2,
    placedAt: '2026-10-09',
  },
  {
    id: 'order-06',
    customer: 'Stark Industries',
    email: 'purchasing@stark.industries',
    status: 'paid',
    amount: 9840,
    placedAt: '2026-10-11',
  },
  {
    id: 'order-07',
    customer: 'Wayne Enterprises',
    email: 'invoices@wayne.enterprises',
    status: 'pending',
    amount: 1425.9,
    placedAt: '2026-10-12',
  },
  {
    id: 'order-08',
    customer: 'Cyberdyne Systems',
    email: 'billing@cyberdyne.systems',
    status: 'paid',
    amount: 2760,
    placedAt: '2026-10-14',
  },
  {
    id: 'order-09',
    customer: 'Soylent Foods',
    email: 'ap@soylent.foods',
    status: 'refunded',
    amount: 190.4,
    placedAt: '2026-10-15',
  },
  {
    id: 'order-10',
    customer: 'Hooli',
    email: 'billing@hooli.com',
    status: 'paid',
    amount: 6320.1,
    placedAt: '2026-10-17',
  },
  {
    id: 'order-11',
    customer: 'Pied Piper',
    email: 'finance@piedpiper.dev',
    status: 'pending',
    amount: 480,
    placedAt: '2026-10-18',
  },
  {
    id: 'order-12',
    customer: 'Vandelay Imports',
    email: 'accounts@vandelay.imports',
    status: 'paid',
    amount: 1180.25,
    placedAt: '2026-10-20',
  },
  {
    id: 'order-13',
    customer: 'Wonka Industries',
    email: 'billing@wonka.industries',
    status: 'paid',
    amount: 3560,
    placedAt: '2026-10-21',
  },
  {
    id: 'order-14',
    customer: 'Gringotts Bank',
    email: 'treasury@gringotts.bank',
    status: 'pending',
    amount: 7990.45,
    placedAt: '2026-10-23',
  },
  {
    id: 'order-15',
    customer: 'Duff Beverages',
    email: 'ap@duff.beer',
    status: 'refunded',
    amount: 640.8,
    placedAt: '2026-10-24',
  },
  {
    id: 'order-16',
    customer: 'Monarch Solutions',
    email: 'billing@monarch.solutions',
    status: 'paid',
    amount: 2210,
    placedAt: '2026-10-26',
  },
  {
    id: 'order-17',
    customer: 'Black Mesa Research',
    email: 'purchasing@blackmesa.research',
    status: 'paid',
    amount: 4480.6,
    placedAt: '2026-10-27',
  },
  {
    id: 'order-18',
    customer: 'Aperture Science',
    email: 'accounts@aperture.science',
    status: 'pending',
    amount: 1035,
    placedAt: '2026-10-29',
  },
  {
    id: 'order-19',
    customer: 'Tyrell Corp',
    email: 'billing@tyrell.corp',
    status: 'paid',
    amount: 6125.35,
    placedAt: '2026-10-30',
  },
  {
    id: 'order-20',
    customer: 'Massive Dynamic',
    email: 'finance@massivedynamic.com',
    status: 'paid',
    amount: 3880,
    placedAt: '2026-11-01',
  },
  {
    id: 'order-21',
    customer: 'Oscorp',
    email: 'ap@oscorp.biz',
    status: 'refunded',
    amount: 275.5,
    placedAt: '2026-11-02',
  },
  {
    id: 'order-22',
    customer: 'Blue Sun',
    email: 'billing@bluesun.co',
    status: 'pending',
    amount: 1570.2,
    placedAt: '2026-11-04',
  },
  {
    id: 'order-23',
    customer: 'Weyland-Yutani',
    email: 'accounts@weyland-yutani.com',
    status: 'paid',
    amount: 8300,
    placedAt: '2026-11-05',
  },
  {
    id: 'order-24',
    customer: 'Sirius Cybernetics',
    email: 'billing@sirius.cybernetics',
    status: 'paid',
    amount: 2045.9,
    placedAt: '2026-11-06',
  },
];

export const monthlyPoints: MonthlyPoint[] = [
  { month: 'Jan', revenue: 68400, orders: 82 },
  { month: 'Feb', revenue: 72150, orders: 88 },
  { month: 'Mar', revenue: 79900, orders: 95 },
  { month: 'Apr', revenue: 74600, orders: 90 },
  { month: 'May', revenue: 83450, orders: 101 },
  { month: 'Jun', revenue: 90200, orders: 108 },
  { month: 'Jul', revenue: 96100, orders: 116 },
  { month: 'Aug', revenue: 92500, orders: 112 },
  { month: 'Sep', revenue: 104300, orders: 124 },
  { month: 'Oct', revenue: 112850, orders: 132 },
  { month: 'Nov', revenue: 121400, orders: 141 },
  { month: 'Dec', revenue: 128450, orders: 148 },
];

export const statCards: StatCard[] = [
  { id: 'revenue', label: 'Total revenue', value: formatOrderAmount(128450), change: '+12.4%' },
  { id: 'orders', label: 'Orders', value: '24', change: '+4.1%' },
  { id: 'customers', label: 'Active customers', value: '1,204', change: '+2.6%' },
];

export const revenueSeries: ChartSeries[] = [
  {
    name: 'Revenue',
    data: monthlyPoints.map((point) => ({ x: point.month, y: point.revenue })),
  },
];

export const ordersSeries: ChartSeries[] = [
  {
    name: 'Orders',
    data: monthlyPoints.map((point) => ({ x: point.month, y: point.orders })),
  },
];

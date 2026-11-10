'use client';

import { AreaChart, BarChart } from '@ho-dev/charts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ho-dev/primitives';
import { Card, CardTitle } from '@ho-dev/ui';

import {
  formatOrderAmount,
  orders as defaultOrders,
  ordersSeries,
  revenueSeries,
  statCards,
} from '../../data/mock-data';
import type { Order } from '../../data/mock-data';

export interface DashboardViewProps {
  orders?: Order[];
}

/** Static charts keep visual snapshots deterministic. */
const staticChartOptions = { chart: { animations: { enabled: false } } };

export function DashboardView({ orders = defaultOrders }: DashboardViewProps) {
  return (
    <div className="space-y-6">
      <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-3">
        {statCards.map((card) => (
          <Card key={card.id}>
            <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
            <p className="text-dark mt-2 text-2xl font-semibold dark:text-white">{card.value}</p>
            <p className="text-green mt-1 text-sm font-medium">{card.change}</p>
          </Card>
        ))}
      </section>

      <section aria-label="Performance charts" className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardTitle as="h2">Revenue by month</CardTitle>
          <AreaChart
            series={revenueSeries}
            label="Monthly revenue"
            apexOptions={staticChartOptions}
          />
        </Card>
        <Card>
          <CardTitle as="h2">Orders by month</CardTitle>
          <BarChart series={ordersSeries} label="Monthly orders" apexOptions={staticChartOptions} />
        </Card>
      </section>

      <Card>
        <CardTitle as="h2">Recent orders</CardTitle>
        <Table aria-label="Recent orders" className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>No orders yet.</TableCell>
              </TableRow>
            ) : (
              orders.slice(0, 5).map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell className="capitalize">{order.status}</TableCell>
                  <TableCell>{formatOrderAmount(order.amount)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

DashboardView.displayName = 'DashboardView';

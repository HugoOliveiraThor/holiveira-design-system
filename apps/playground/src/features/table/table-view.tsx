'use client';

import {
  InputGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ho-dev/primitives';
import { Card, CardTitle } from '@ho-dev/ui';

import { useMemo, useState } from 'react';

import { formatOrderAmount, orders as defaultOrders } from '../../data/mock-data';
import type { Order } from '../../data/mock-data';

type SortKey = 'customer' | 'status' | 'amount' | 'placedAt';
type SortDirection = 'ascending' | 'descending';

export interface TableViewProps {
  orders?: Order[];
}

export function TableView({ orders = defaultOrders }: TableViewProps) {
  const [filter, setFilter] = useState('');
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('ascending');

  const visibleRows = useMemo(() => {
    const term = filter.trim().toLowerCase();
    const filtered = term
      ? orders.filter((order) =>
          [
            order.customer,
            order.email,
            order.status,
            formatOrderAmount(order.amount),
            order.placedAt,
          ]
            .join(' ')
            .toLowerCase()
            .includes(term),
        )
      : orders;

    if (!sortKey) {
      return filtered;
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === 'amount') {
        return a.amount - b.amount;
      }
      return String(a[sortKey]).localeCompare(String(b[sortKey]));
    });

    return sortDirection === 'descending' ? sorted.reverse() : sorted;
  }, [filter, orders, sortKey, sortDirection]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((current) => (current === 'ascending' ? 'descending' : 'ascending'));
      return;
    }

    setSortKey(key);
    setSortDirection('ascending');
  };

  const ariaSort = (key: SortKey) => (sortKey === key ? sortDirection : 'none');

  return (
    <Card>
      <CardTitle as="h2">Orders</CardTitle>

      <div className="mt-4 max-w-sm">
        <InputGroup
          label="Filter orders"
          placeholder="Search customer, status or amount"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>

      <Table aria-label="Orders" className="mt-4 whitespace-nowrap">
        <TableHeader>
          <TableRow>
            <TableHead aria-sort={ariaSort('customer')}>
              <button
                type="button"
                className="font-medium hover:underline"
                onClick={() => toggleSort('customer')}
              >
                Customer
              </button>
            </TableHead>
            <TableHead aria-sort={ariaSort('status')}>
              <button
                type="button"
                className="font-medium hover:underline"
                onClick={() => toggleSort('status')}
              >
                Status
              </button>
            </TableHead>
            <TableHead aria-sort={ariaSort('amount')}>
              <button
                type="button"
                className="font-medium hover:underline"
                onClick={() => toggleSort('amount')}
              >
                Amount
              </button>
            </TableHead>
            <TableHead aria-sort={ariaSort('placedAt')}>
              <button
                type="button"
                className="font-medium hover:underline"
                onClick={() => toggleSort('placedAt')}
              >
                Placed
              </button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No orders match your filter.
              </TableCell>
            </TableRow>
          ) : (
            visibleRows.map((order) => (
              <TableRow key={order.id} data-testid="order-row">
                <TableCell>{order.customer}</TableCell>
                <TableCell className="capitalize">{order.status}</TableCell>
                <TableCell>{formatOrderAmount(order.amount)}</TableCell>
                <TableCell>{order.placedAt}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

TableView.displayName = 'TableView';

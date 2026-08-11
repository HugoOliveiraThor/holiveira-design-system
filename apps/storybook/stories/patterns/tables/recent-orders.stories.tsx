import { FilterIcon, TrashIcon } from '@ho-dev/icons';
import {
  Badge,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ho-dev/primitives';
import { Card, CardTitle } from '@ho-dev/ui';

import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';

type Order = {
  id: string;
  customer: string;
  email: string;
  initials: string;
  product: string;
  value: string;
  date: string;
  status: string;
};

const initialOrders: Order[] = [
  {
    id: 'DE124321',
    customer: 'John Doe',
    email: 'johndoe@gmail.com',
    initials: 'JD',
    product: 'Software License',
    value: '$18,50.34',
    date: '2024-06-15',
    status: 'Complete',
  },
  {
    id: 'DE124322',
    customer: 'Jane Smith',
    email: 'janesmith@gmail.com',
    initials: 'JS',
    product: 'Cloud Hosting',
    value: '$12,99.00',
    date: '2024-06-18',
    status: 'Pending',
  },
  {
    id: 'DE124323',
    customer: 'Michael Brown',
    email: 'michaelbrown@gmail.com',
    initials: 'MB',
    product: 'Web Domain',
    value: '$9,50.00',
    date: '2024-06-20',
    status: 'Cancel',
  },
  {
    id: 'DE124324',
    customer: 'Alice Johnson',
    email: 'alicejohnson@gmail.com',
    initials: 'AJ',
    product: 'SSL Certificate',
    value: '$2,30.45',
    date: '2024-06-25',
    status: 'Pending',
  },
  {
    id: 'DE124325',
    customer: 'Robert Lee',
    email: 'robertlee@gmail.com',
    initials: 'RL',
    product: 'Premium Support',
    value: '$15,20.00',
    date: '2024-06-30',
    status: 'Complete',
  },
];

function BadgeFor({ status }: { status: string }) {
  const variant = status === 'Complete' ? 'success' : status === 'Pending' ? 'warning' : 'error';
  return <Badge variant={variant}>{status}</Badge>;
}

function RecentOrdersStory() {
  const [orders, setOrders] = useState(initialOrders);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const selectAllRef = useRef<HTMLInputElement>(null);
  const allSelected = selected.size === orders.length && orders.length > 0;
  const someSelected = selected.size > 0 && !allSelected;

  useEffect(() => {
    if (selectAllRef.current) selectAllRef.current.indeterminate = someSelected;
  }, [someSelected]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(orders.map((o) => o.id)));
  }

  function remove(id: string) {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  return (
    <Card className="w-full">
      <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
        <CardTitle>Recent Orders</CardTitle>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <FilterIcon size={20} /> Filter
          </Button>
          <Button variant="outline" size="sm">
            See all
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                label=""
                checked={allSelected}
                ref={selectAllRef}
                onChange={toggleAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Deal ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Product/Service</TableHead>
            <TableHead>Deal Value</TableHead>
            <TableHead>Close Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} data-state={selected.has(order.id) ? 'selected' : undefined}>
              <TableCell>
                <Checkbox
                  label=""
                  checked={selected.has(order.id)}
                  onChange={() => toggle(order.id)}
                  aria-label={`Select ${order.id}`}
                />
              </TableCell>
              <TableCell className="font-medium text-gray-800 dark:text-white/90">
                {order.id}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="bg-error-100 text-error-600 flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium">
                    {order.initials}
                  </div>
                  <div>
                    <span className="block font-medium text-gray-700 dark:text-gray-400">
                      {order.customer}
                    </span>
                    <span className="block text-gray-500 dark:text-gray-400">{order.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.value}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <BadgeFor status={order.status} />
              </TableCell>
              <TableCell>
                <button
                  type="button"
                  onClick={() => remove(order.id)}
                  aria-label={`Delete ${order.id}`}
                >
                  <TrashIcon className="hover:text-error-500 dark:hover:text-error-500 cursor-pointer text-gray-700 dark:text-gray-400" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

const meta: Meta = {
  title: 'Patterns/Tables/Recent Orders',
  tags: [],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <RecentOrdersStory />,
};

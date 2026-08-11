import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ho-dev/primitives';
import { Card, CardTitle } from '@ho-dev/ui';

import type { Meta, StoryObj } from '@storybook/react';

const rows = [
  { product: 'TailGrids', category: 'UI Kits', value: '$12,499' },
  { product: 'GrayGrids', category: 'Templates', value: '$5,498' },
  { product: 'Uideck', category: 'Templates', value: '$4,621' },
  { product: 'FormBold', category: 'SaaS', value: '$13,843' },
  { product: 'NextAdmin', category: 'Templates', value: '$7,523' },
];

const meta: Meta = {
  title: 'Patterns/Tables/Recent Orders Simple',
  tags: [],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Card className="w-full">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800">
        <CardTitle>Recent Orders</CardTitle>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Products</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>CR</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.product}>
              <TableCell className="font-medium text-gray-800 dark:text-white/90">
                {row.product}
              </TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-500">
                  {row.product[0]}
                </div>
              </TableCell>
              <TableCell>Dashboard</TableCell>
              <TableCell className="text-success-600">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  ),
};

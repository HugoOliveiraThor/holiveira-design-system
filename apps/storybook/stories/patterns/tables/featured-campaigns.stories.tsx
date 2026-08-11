import { MoreIcon } from '@ho-dev/icons';
import {
  Avatar,
  Badge,
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ho-dev/primitives';
import { Card, CardTitle } from '@ho-dev/ui';

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const rows = [
  {
    user: 'Wilson Gouse',
    campaign: 'Grow your brand by...',
    sub: 'Ads campaign',
    status: 'Success',
  },
  {
    user: 'Wilson Gouse',
    campaign: 'Make Better Ideas...',
    sub: 'Ads campaign',
    status: 'Pending',
  },
  {
    user: 'Wilson Gouse',
    campaign: 'Increase your website tra...',
    sub: 'Ads campaign',
    status: 'Success',
  },
];

function BadgeFor({ status }: { status: string }) {
  const variant = status === 'Success' ? 'success' : 'warning';
  return <Badge variant={variant}>{status}</Badge>;
}

function HeaderMenu() {
  const [open, setOpen] = useState(false);
  return (
    <Dropdown isOpen={open} setIsOpen={setOpen}>
      <DropdownTrigger aria-label="Campaign actions">
        <MoreIcon size={24} className="text-gray-400" />
      </DropdownTrigger>
      <DropdownContent className="w-40">
        <button
          type="button"
          className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
        >
          View More
        </button>
        <button
          type="button"
          className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
        >
          Delete
        </button>
      </DropdownContent>
    </Dropdown>
  );
}

const meta: Meta = {
  title: 'Patterns/Tables/Featured Campaigns',
  tags: [],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Card className="w-full">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800">
        <CardTitle>Featured Campaigns</CardTitle>
        <HeaderMenu />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Products</TableHead>
            <TableHead>Campaign</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center gap-[18px]">
                  <Avatar name={row.user} />
                  <span>{row.user}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-500">
                    {row.sub[0]}
                  </div>
                  <div className="truncate">
                    <p className="truncate font-medium text-gray-700 dark:text-gray-400">
                      {row.campaign}
                    </p>
                    <span className="text-gray-500 dark:text-gray-400">{row.sub}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <BadgeFor status={row.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  ),
};

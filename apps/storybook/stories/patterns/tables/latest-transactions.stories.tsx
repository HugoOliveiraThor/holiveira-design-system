import { MoreIcon, SearchIcon } from '@ho-dev/icons';
import {
  Badge,
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  InputGroup,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ho-dev/primitives';
import { Card, CardTitle } from '@ho-dev/ui';

import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';

type Txn = {
  id: number;
  name: string;
  date: string;
  price: string;
  category: string;
  status: string;
};

const allTxns: Txn[] = Array.from({ length: 13 }, (_, i) => ({
  id: i,
  name: `Transaction ${i + 1}`,
  date: 'Nov 23, 01:00 PM',
  price: '$2,567.88',
  category: 'Finance',
  status: i % 3 === 0 ? 'Failed' : i % 2 === 0 ? 'Success' : 'Pending',
}));

const PAGE_SIZE = 5;

function BadgeFor({ status }: { status: string }) {
  const variant = status === 'Success' ? 'success' : status === 'Pending' ? 'warning' : 'error';
  return <Badge variant={variant}>{status}</Badge>;
}

function RowActions() {
  const [open, setOpen] = useState(false);
  return (
    <Dropdown isOpen={open} setIsOpen={setOpen}>
      <DropdownTrigger aria-label="Row actions">
        <MoreIcon size={24} />
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

function LatestTransactionsStory() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const filtered = useMemo(
    () => allTxns.filter((t) => t.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const rows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <Card className="w-full">
      <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
        <CardTitle>Latest Transactions</CardTitle>
        <InputGroup
          label=""
          name="search"
          type="text"
          placeholder="Search..."
          icon={<SearchIcon size={20} />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-[300px]"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((txn) => (
            <TableRow key={txn.id}>
              <TableCell className="font-medium text-gray-800 dark:text-white/90">
                {txn.name}
              </TableCell>
              <TableCell>{txn.date}</TableCell>
              <TableCell>{txn.price}</TableCell>
              <TableCell>{txn.category}</TableCell>
              <TableCell>
                <BadgeFor status={txn.status} />
              </TableCell>
              <TableCell>
                <RowActions />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="border-t border-gray-200 px-6 py-4 dark:border-white/[0.05]">
        <Pagination page={safePage} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </Card>
  );
}

const meta: Meta = {
  title: 'Patterns/Tables/Latest Transactions',
  tags: [],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <LatestTransactionsStory />,
};

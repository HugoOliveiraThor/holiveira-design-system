import { SearchIcon } from '@ho-dev/icons';
import {
  Avatar,
  InputGroup,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@ho-dev/primitives';
import { Card, CardTitle } from '@ho-dev/ui';

import type { Meta, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';

import {
  EntriesSummary,
  ShowEntriesSelect,
  SortableTableHead,
  compareBy,
  nextSort,
  users,
  type SortState,
} from './data-table';

function DataTable2Story() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState<SortState>(null);

  const filtered = useMemo(
    () => users.filter((u) => u.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  const sorted = useMemo(
    () => (sort ? [...filtered].sort(compareBy(sort.key, sort.dir)) : filtered),
    [filtered, sort],
  );
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const rows = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <Card className="w-full">
      <div className="border-b border-gray-100 px-6 py-5 dark:border-gray-800">
        <CardTitle>Data Table 2</CardTitle>
      </div>
      <div className="flex flex-col gap-3 border-b border-gray-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
        <ShowEntriesSelect
          value={pageSize}
          onChange={(n) => {
            setPageSize(n);
            setPage(1);
          }}
        />
        <InputGroup
          label=""
          name="search"
          type="text"
          placeholder="Search..."
          icon={<SearchIcon size={20} />}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          className="w-full sm:w-[300px]"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <SortableTableHead
              label="User"
              sortKey="name"
              sort={sort}
              onSort={(k) => setSort(nextSort(sort, k))}
            />
            <SortableTableHead
              label="Position"
              sortKey="position"
              sort={sort}
              onSort={(k) => setSort(nextSort(sort, k))}
            />
            <SortableTableHead
              label="Office"
              sortKey="office"
              sort={sort}
              onSort={(k) => setSort(nextSort(sort, k))}
            />
            <SortableTableHead
              label="Age"
              sortKey="age"
              sort={sort}
              onSort={(k) => setSort(nextSort(sort, k))}
            />
            <SortableTableHead
              label="Start Date"
              sortKey="startDate"
              sort={sort}
              onSort={(k) => setSort(nextSort(sort, k))}
            />
            <SortableTableHead
              label="Salary"
              sortKey="salary"
              sort={sort}
              onSort={(k) => setSort(nextSort(sort, k))}
            />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((u) => (
            <TableRow key={u.id}>
              <TableCell className="whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <Avatar name={u.name} alt={u.name} size="md" />
                  <span className="font-medium text-gray-800 dark:text-white/90">{u.name}</span>
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap text-gray-800 dark:text-gray-400/90">
                {u.position}
              </TableCell>
              <TableCell className="whitespace-nowrap text-gray-800 dark:text-gray-400/90">
                {u.office}
              </TableCell>
              <TableCell className="whitespace-nowrap text-gray-800 dark:text-gray-400/90">
                {u.age}
              </TableCell>
              <TableCell className="whitespace-nowrap text-gray-800 dark:text-gray-400/90">
                {u.startDate}
              </TableCell>
              <TableCell className="whitespace-nowrap text-gray-800 dark:text-gray-400/90">
                {u.salary}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col gap-3 border-t border-gray-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.05]">
        <Pagination
          page={safePage}
          totalPages={totalPages}
          onPageChange={setPage}
          showMobileInfo={false}
          className="px-0 py-0"
        />
        <EntriesSummary page={safePage} pageSize={pageSize} total={sorted.length} />
      </div>
    </Card>
  );
}

const meta: Meta = {
  title: 'Patterns/Tables/Data Table 2',
  tags: [],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <DataTable2Story />,
};

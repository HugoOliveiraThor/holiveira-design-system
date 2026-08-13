import { DownloadIcon, PencilSquareIcon, SearchIcon, TrashIcon } from '@ho-dev/icons';
import {
  Badge,
  Button,
  Checkbox,
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
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  EntriesSummary,
  ShowEntriesSelect,
  SortableTableHead,
  compareBy,
  nextSort,
  users,
  type SortState,
  type UserRow,
} from './data-table';

function StatusBadge({ status }: { status: UserRow['status'] }) {
  const variant = status === 'Hired' ? 'success' : status === 'In Progress' ? 'warning' : 'error';
  return <Badge variant={variant}>{status}</Badge>;
}

function DataTable3Story() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sort, setSort] = useState<SortState>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const selectAllRef = useRef<HTMLInputElement>(null);

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

  const allSelected = sorted.length > 0 && selected.size === sorted.length;
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
    setSelected(allSelected ? new Set() : new Set(sorted.map((u) => u.id)));
  }

  return (
    <Card className="w-full">
      <div className="border-b border-gray-100 px-6 py-5 dark:border-gray-800">
        <CardTitle>Data Table 3</CardTitle>
      </div>
      <div className="flex flex-col gap-3 border-b border-gray-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
        <ShowEntriesSelect
          value={pageSize}
          onChange={(n) => {
            setPageSize(n);
            setPage(1);
          }}
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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
          <Button variant="outline" size="sm">
            <DownloadIcon size={20} /> Download
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <SortableTableHead
              label="User"
              sortKey="name"
              sort={sort}
              onSort={(k) => setSort(nextSort(sort, k))}
              leading={
                <Checkbox
                  label=""
                  checked={allSelected}
                  ref={selectAllRef}
                  onChange={toggleAll}
                  aria-label="Select all"
                />
              }
            />
            <SortableTableHead
              label="Position"
              sortKey="position"
              sort={sort}
              onSort={(k) => setSort(nextSort(sort, k))}
            />
            <SortableTableHead
              label="Salary"
              sortKey="salary"
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
              label="Status"
              sortKey="status"
              sort={sort}
              onSort={(k) => setSort(nextSort(sort, k))}
            />
            <TableHead className="whitespace-nowrap">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-400">Action</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((u) => (
            <TableRow key={u.id} data-state={selected.has(u.id) ? 'selected' : undefined}>
              <TableCell>
                <div className="flex gap-3">
                  <div className="mt-1">
                    <Checkbox
                      label=""
                      checked={selected.has(u.id)}
                      onChange={() => toggle(u.id)}
                      aria-label={`Select ${u.name}`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">{u.name}</p>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{u.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap text-gray-800 dark:text-gray-400/90">
                {u.position}
              </TableCell>
              <TableCell className="whitespace-nowrap text-gray-800 dark:text-white/90">
                {u.salary}
              </TableCell>
              <TableCell className="whitespace-nowrap text-gray-800 dark:text-white/90">
                {u.office}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <StatusBadge status={u.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Delete ${u.name}`}
                    className="hover:text-error-500 dark:hover:text-error-500 text-gray-500 dark:text-gray-400"
                  >
                    <TrashIcon size={20} />
                  </button>
                  <button
                    type="button"
                    aria-label={`Edit ${u.name}`}
                    className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                  >
                    <PencilSquareIcon size={20} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col gap-3 border-t border-gray-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.05]">
        <EntriesSummary page={safePage} pageSize={pageSize} total={sorted.length} />
        <div className="flex justify-center">
          <Pagination
            page={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
            showMobileInfo={false}
            className="px-0 py-0"
          />
        </div>
      </div>
    </Card>
  );
}

const meta: Meta = {
  title: 'Patterns/Tables/Data Table 3',
  tags: [],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <DataTable3Story />,
};

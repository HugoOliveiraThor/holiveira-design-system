import { ChevronDownIcon } from '@ho-dev/icons';
import { TableHead } from '@ho-dev/primitives';
import { cn } from '@ho-dev/utils';

import type { ReactNode } from 'react';

export type UserRow = {
  id: string;
  name: string;
  email: string;
  position: string;
  office: string;
  age: number;
  startDate: string;
  salary: string;
  status: 'Hired' | 'In Progress' | 'Pending';
};

export const users: UserRow[] = [
  {
    id: 'u1',
    name: 'Abram Schleifer',
    email: 'demoemail@gmail.com',
    position: 'Sales Assistant',
    office: 'Edinburgh',
    age: 57,
    startDate: '25 Apr, 2027',
    salary: '$89,500',
    status: 'Hired',
  },
  {
    id: 'u2',
    name: 'Charlotte Anderson',
    email: 'demoemail@gmail.com',
    position: 'Marketing Manager',
    office: 'London',
    age: 42,
    startDate: '12 Mar, 2025',
    salary: '$105,000',
    status: 'In Progress',
  },
  {
    id: 'u3',
    name: 'Ethan Brown',
    email: 'demoemail@gmail.com',
    position: 'Software Engineer',
    office: 'San Francisco',
    age: 30,
    startDate: '01 Jan, 2024',
    salary: '$120,000',
    status: 'Hired',
  },
  {
    id: 'u4',
    name: 'Isabella Davis',
    email: 'demoemail@gmail.com',
    position: 'UI/UX Designer',
    office: 'Austin',
    age: 29,
    startDate: '18 Jul, 2025',
    salary: '$92,000',
    status: 'In Progress',
  },
  {
    id: 'u5',
    name: 'James Wilson',
    email: 'demoemail@gmail.com',
    position: 'Data Analyst',
    office: 'Chicago',
    age: 28,
    startDate: '20 Sep, 2025',
    salary: '$80,000',
    status: 'Pending',
  },
  {
    id: 'u6',
    name: 'Liam Moore',
    email: 'demoemail@gmail.com',
    position: 'DevOps Engineer',
    office: 'Boston',
    age: 33,
    startDate: '30 Oct, 2024',
    salary: '$115,000',
    status: 'Hired',
  },
  {
    id: 'u7',
    name: 'Mia Garcia',
    email: 'demoemail@gmail.com',
    position: 'Content Strategist',
    office: 'Denver',
    age: 27,
    startDate: '12 Dec, 2027',
    salary: '$70,000',
    status: 'Pending',
  },
  {
    id: 'u8',
    name: 'Olivia Johnson',
    email: 'demoemail@gmail.com',
    position: 'HR Specialist',
    office: 'Los Angeles',
    age: 40,
    startDate: '08 Nov, 2026',
    salary: '$75,000',
    status: 'Hired',
  },
  {
    id: 'u9',
    name: 'Sophia Martinez',
    email: 'demoemail@gmail.com',
    position: 'Product Manager',
    office: 'New York',
    age: 35,
    startDate: '15 Jun, 2026',
    salary: '$95,000',
    status: 'In Progress',
  },
  {
    id: 'u10',
    name: 'William Smith',
    email: 'demoemail@gmail.com',
    position: 'Financial Analyst',
    office: 'Seattle',
    age: 38,
    startDate: '03 Feb, 2026',
    salary: '$88,000',
    status: 'Hired',
  },
];

export type SortState = { key: keyof UserRow; dir: 'asc' | 'desc' } | null;

export function compareBy(key: keyof UserRow, dir: 'asc' | 'desc') {
  return (a: UserRow, b: UserRow) => {
    const av = a[key];
    const bv = b[key];
    const cmp =
      typeof av === 'number' && typeof bv === 'number'
        ? av - bv
        : String(av).localeCompare(String(bv));
    return dir === 'asc' ? cmp : -cmp;
  };
}

export function nextSort(current: SortState, key: keyof UserRow): SortState {
  if (current?.key !== key) return { key, dir: 'asc' };
  if (current.dir === 'asc') return { key, dir: 'desc' };
  return null;
}

function SortCaret({ active, direction }: { active: boolean; direction: 'up' | 'down' }) {
  return (
    <svg
      width="8"
      height="5"
      viewBox="0 0 8 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn('shrink-0', active ? 'text-primary' : 'text-gray-300 dark:text-gray-700')}
    >
      {direction === 'up' ? (
        <path
          fill="currentColor"
          d="M4.41.585a.5.5 0 0 0-.82 0L1.05 4.213A.5.5 0 0 0 1.46 5h5.08a.5.5 0 0 0 .41-.787z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M4.41 4.415a.5.5 0 0 1-.82 0L1.05.787A.5.5 0 0 1 1.46 0h5.08a.5.5 0 0 1 .41.787z"
        />
      )}
    </svg>
  );
}

export function SortableTableHead({
  label,
  sortKey,
  sort,
  onSort,
  leading,
}: {
  label: string;
  sortKey: keyof UserRow;
  sort: SortState;
  onSort: (key: keyof UserRow) => void;
  leading?: ReactNode;
}) {
  const active = sort?.key === sortKey;
  return (
    <TableHead className="whitespace-nowrap">
      <div className="flex items-center gap-3">
        {leading}
        <button
          type="button"
          onClick={() => onSort(sortKey)}
          className="flex items-center justify-between gap-1"
        >
          <span className="text-xs font-medium text-gray-700 dark:text-gray-400">{label}</span>
          <span className="flex flex-col gap-0.5">
            <SortCaret active={active && sort?.dir === 'asc'} direction="up" />
            <SortCaret active={active && sort?.dir === 'desc'} direction="down" />
          </span>
        </button>
      </div>
    </TableHead>
  );
}

export function EntriesSummary({
  page,
  pageSize,
  total,
}: {
  page: number;
  pageSize: number;
  total: number;
}) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  return (
    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
      Showing {from} to {to} of {total} entries
    </p>
  );
}

const PAGE_SIZE_OPTIONS = [5, 8, 10];

export function ShowEntriesSelect({
  value,
  onChange,
}: {
  value: number;
  onChange: (pageSize: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500 dark:text-gray-400">Show</span>
      <div className="relative z-20 bg-transparent">
        <select
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="shadow-theme-xs h-9 w-full appearance-none rounded-lg border border-gray-300 bg-transparent py-2 pr-8 pl-3 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
        >
          {PAGE_SIZE_OPTIONS.map((n) => (
            <option key={n} value={n} className="text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              {n}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
          <ChevronDownIcon size={16} />
        </span>
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">entries</span>
    </div>
  );
}

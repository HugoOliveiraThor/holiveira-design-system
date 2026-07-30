import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';

import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from './table';

const meta: Meta<typeof Table> = {
  title: 'Primitives/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    'aria-label': {
      description: 'Accessible label describing the table content.',
      control: { type: 'text' },
    },
    children: {
      description:
        'Table content composed with TableHeader, TableBody, TableRow, TableHead, TableCell.',
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer' },
];

export const FullComposition: Story = {
  render: () => (
    <Table aria-label="Users table">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>3 users total</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <Table aria-label="Empty table">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="text-center text-neutral-500">
            No data available
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithSelection: Story = {
  render: () => (
    <Table aria-label="Selectable table">
      <TableHeader>
        <TableRow>
          <TableHead>
            <input type="checkbox" aria-label="Select all" />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <input type="checkbox" aria-label={`Select ${row.name}`} />
            </TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Sorted: Story = {
  render: () => (
    <Table aria-label="Sorted table">
      <TableHeader>
        <TableRow>
          <TableHead className="cursor-pointer">
            Name <span className="text-neutral-400">&#9650;</span>
          </TableHead>
          <TableHead className="cursor-pointer">
            Email <span className="text-neutral-400">&#9650;</span>
          </TableHead>
          <TableHead className="cursor-pointer">
            Role <span className="text-neutral-400">&#9660;</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Loading: Story = {
  render: () => (
    <Table aria-label="Loading table" aria-busy="true">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3].map((i) => (
          <TableRow key={i}>
            <TableCell>
              <div className="dark:bg-dark-3 h-4 w-24 animate-pulse rounded bg-neutral-200" />
            </TableCell>
            <TableCell>
              <div className="dark:bg-dark-3 h-4 w-36 animate-pulse rounded bg-neutral-200" />
            </TableCell>
            <TableCell>
              <div className="dark:bg-dark-3 h-4 w-16 animate-pulse rounded bg-neutral-200" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Table aria-label="Users table">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('table renders data rows', async () => {
      const rows = canvas.queryAllByRole('row');
      await expect(rows.length).toBeGreaterThan(1);
    });

    await step('click column header to sort', async () => {
      const header = canvas.getByRole('columnheader', { name: /name/i });
      await userEvent.click(header);
    });
  },
};

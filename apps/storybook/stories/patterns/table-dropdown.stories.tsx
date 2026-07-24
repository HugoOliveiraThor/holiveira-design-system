import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@holiveira/primitives';

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer' },
];

function TableWithActions() {
  return (
    <div className="space-y-6">
      <h2 className="text-dark text-xl font-bold dark:text-white">Users</h2>

      <Table aria-label="Users table">
        <TableHeader>
          <TableRow>
            <TableHead>
              <input type="checkbox" className="size-4" />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <input type="checkbox" className="size-4" />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    row.role === 'Admin'
                      ? 'bg-primary/10 text-primary'
                      : row.role === 'Editor'
                        ? 'bg-green/10 text-green'
                        : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {row.role}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => alert(`Edit ${row.name}`)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => alert(`Delete ${row.name}`)}
                  >
                    Delete
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const meta: Meta = {
  title: 'Patterns/Table + Dropdown',
  tags: [],
};

export default meta;
type Story = StoryObj;

export const Example: Story = {
  render: () => <TableWithActions />,
};

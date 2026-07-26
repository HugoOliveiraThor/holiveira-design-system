import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from './test-utils';

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './index';

afterEach(cleanup);

describe('Table', () => {
  it('renders with header and body', () => {
    const { getByRole } = render(
      <Table aria-label="Test table">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const table = getByRole('table', { name: /test table/i });
    expect(table).toBeVisible();
    expect(table).toHaveTextContent('Name');
    expect(table).toHaveTextContent('John');
  });

  it('renders with accessible label', () => {
    const { getByRole } = render(
      <Table aria-label="Users">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );
    expect(getByRole('table', { name: /users/i })).toBeVisible();
  });
});

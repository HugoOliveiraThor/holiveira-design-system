import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { TableView } from './table-view';

afterEach(cleanup);

function renderedRows() {
  return screen.getAllByTestId('order-row');
}

describe('TableView', () => {
  it('sorts ascending then descending', () => {
    render(<TableView />);

    expect(renderedRows()).toHaveLength(24);

    fireEvent.click(screen.getByRole('button', { name: 'Amount' }));
    expect(screen.getByRole('columnheader', { name: 'Amount' })).toHaveAttribute(
      'aria-sort',
      'ascending',
    );
    expect(renderedRows()[0]).toHaveTextContent('Soylent Foods');
    expect(renderedRows()[23]).toHaveTextContent('Stark Industries');

    fireEvent.click(screen.getByRole('button', { name: 'Amount' }));
    expect(screen.getByRole('columnheader', { name: 'Amount' })).toHaveAttribute(
      'aria-sort',
      'descending',
    );
    expect(renderedRows()[0]).toHaveTextContent('Stark Industries');
    expect(renderedRows()[23]).toHaveTextContent('Soylent Foods');
  });

  it('filters rows by visible text', () => {
    render(<TableView />);

    fireEvent.change(screen.getByLabelText('Filter orders'), {
      target: { value: 'refunded' },
    });

    const rows = renderedRows();
    expect(rows).toHaveLength(4);
    for (const row of rows) {
      expect(row).toHaveTextContent('refunded');
    }
    expect(screen.queryByText('Acme Studio')).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Filter orders'), { target: { value: 'acme' } });
    expect(renderedRows()).toHaveLength(1);
    expect(renderedRows()[0]).toHaveTextContent('Acme Studio');
  });

  it('shows an empty state when nothing matches', () => {
    render(<TableView />);

    fireEvent.change(screen.getByLabelText('Filter orders'), {
      target: { value: 'no-such-order' },
    });

    const table = screen.getByRole('table', { name: 'Orders' });
    expect(within(table).getByText('No orders match your filter.')).toBeVisible();
    expect(screen.queryAllByTestId('order-row')).toHaveLength(0);
  });
});

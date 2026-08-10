import { cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from './test-utils';

import { getPageItems, Pagination } from './index';

afterEach(cleanup);

describe('getPageItems', () => {
  it('builds window for page 1 of 10', () => {
    expect(getPageItems(1, 10)).toEqual([1, 2, '...', 10]);
  });

  it('builds window for a middle page', () => {
    expect(getPageItems(5, 10)).toEqual([1, '...', 4, 5, 6, '...', 10]);
  });

  it('builds window for last page', () => {
    expect(getPageItems(10, 10)).toEqual([1, '...', 9, 10]);
  });

  it('returns all pages when totalPages is small', () => {
    expect(getPageItems(2, 3)).toEqual([1, 2, 3]);
  });
});

describe('Pagination', () => {
  it('renders prev/next buttons and page numbers', () => {
    const { getByRole, getAllByRole } = render(
      <Pagination page={1} totalPages={10} onPageChange={() => {}} />,
    );
    expect(getAllByRole('button').length).toBeGreaterThanOrEqual(3);
    expect(getByRole('button', { name: /previous/i })).toBeVisible();
    expect(getByRole('button', { name: /next/i })).toBeVisible();
  });

  it('marks active page with bg-primary', () => {
    const { getByRole } = render(<Pagination page={3} totalPages={10} onPageChange={() => {}} />);
    const active = getByRole('button', { name: '3' });
    expect(active.className).toContain('bg-primary');
    expect(active).toHaveAttribute('aria-current', 'page');
  });

  it('disables prev on first page', () => {
    const { getByRole } = render(<Pagination page={1} totalPages={10} onPageChange={() => {}} />);
    expect(getByRole('button', { name: /previous/i })).toBeDisabled();
  });

  it('disables next on last page', () => {
    const { getByRole } = render(<Pagination page={10} totalPages={10} onPageChange={() => {}} />);
    expect(getByRole('button', { name: /next/i })).toBeDisabled();
  });

  it('calls onPageChange with next page', () => {
    const onPageChange = vi.fn();
    const { getByRole } = render(
      <Pagination page={1} totalPages={10} onPageChange={onPageChange} />,
    );
    fireEvent.click(getByRole('button', { name: /next/i }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with clicked page number', () => {
    const onPageChange = vi.fn();
    const { getByRole } = render(
      <Pagination page={1} totalPages={10} onPageChange={onPageChange} />,
    );
    fireEvent.click(getByRole('button', { name: '2' }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('omits number trail with showNumbers false', () => {
    const { queryByRole } = render(
      <Pagination page={1} totalPages={10} onPageChange={() => {}} showNumbers={false} />,
    );
    expect(queryByRole('button', { name: '2' })).toBeNull();
  });

  it('omits mobile info with showMobileInfo false', () => {
    const { queryByText } = render(
      <Pagination page={1} totalPages={10} onPageChange={() => {}} showMobileInfo={false} />,
    );
    expect(queryByText('Page 1 of 10')).toBeNull();
  });
});

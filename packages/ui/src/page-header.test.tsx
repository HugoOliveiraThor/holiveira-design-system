import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from './test-utils';

import { PageHeader } from './index';

afterEach(cleanup);

describe('PageHeader', () => {
  it('renders title in h2', () => {
    const { getByRole } = render(<PageHeader title="Settings" />);
    expect(getByRole('heading', { level: 2, name: /settings/i })).toBeVisible();
  });

  it('renders navigation landmark', () => {
    const { getByRole } = render(<PageHeader title="Settings" />);
    expect(getByRole('navigation', { name: /breadcrumb/i })).toBeVisible();
  });

  it('defaults to Dashboard / title trail', () => {
    const { getByRole, getAllByText } = render(<PageHeader title="Profile" />);
    expect(getByRole('link', { name: /dashboard/i })).toBeVisible();
    expect(getAllByText('Profile')).toHaveLength(2);
  });

  it('renders provided breadcrumb items', () => {
    const { getByRole, getAllByText } = render(
      <PageHeader
        title="Analytics"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Analytics' }]}
      />,
    );
    expect(getByRole('link', { name: /home/i })).toBeVisible();
    expect(getAllByText('Analytics')).toHaveLength(2);
  });
});

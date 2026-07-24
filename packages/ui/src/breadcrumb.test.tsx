import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from './test-utils';

import { Breadcrumb } from './index';

afterEach(cleanup);

describe('Breadcrumb', () => {
  it('renders with page name', () => {
    const { getAllByText } = render(<Breadcrumb pageName="Settings" />);
    expect(getAllByText('Settings')).toHaveLength(2);
  });

  it('renders navigation landmark', () => {
    const { getByRole } = render(<Breadcrumb pageName="Settings" />);
    expect(getByRole('navigation', { name: /breadcrumb/i })).toBeVisible();
  });

  it('renders home link', () => {
    const { getByRole } = render(<Breadcrumb pageName="Profile" />);
    expect(getByRole('link', { name: /dashboard/i })).toBeVisible();
  });
});

import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { AppShell } from './app-shell';

afterEach(cleanup);

describe('AppShell', () => {
  it('renders the app shell with sidebar and header', () => {
    render(
      <AppShell title="Dashboard" activePath="/">
        <p>Dashboard content</p>
      </AppShell>,
    );

    const sidebar = screen.getByRole('complementary', { name: 'Main navigation' });
    expect(within(sidebar).getByRole('navigation', { name: 'Sidebar' })).toBeVisible();

    const header = screen.getByRole('banner');
    expect(within(header).getByText('Dashboard')).toBeVisible();

    expect(screen.getByRole('main')).toHaveTextContent('Dashboard content');
    expect(screen.getByRole('heading', { level: 2, name: 'Dashboard' })).toBeVisible();
  });

  it('marks the active sidebar destination', () => {
    render(
      <AppShell title="Forms" activePath="/forms">
        <p>Form content</p>
      </AppShell>,
    );

    const nav = screen.getByRole('navigation', { name: 'Sidebar' });
    const active = within(nav).getByRole('link', { name: 'Forms' });
    const inactive = within(nav).getByRole('link', { name: 'Dashboard' });

    expect(active).toHaveAttribute('aria-current', 'page');
    expect(active).toHaveClass('text-primary');
    expect(inactive).not.toHaveAttribute('aria-current');
    expect(inactive).not.toHaveClass('text-primary');
  });
});

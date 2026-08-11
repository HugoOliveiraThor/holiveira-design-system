import { Sidebar, SidebarProvider } from '@ho-dev/layouts';
import { PageHeader } from '@ho-dev/ui';

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const navItems = [
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Settings', href: '#settings' },
];

function SidebarBreadcrumbLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-[400px]">
        <Sidebar logo={<div className="text-lg font-bold">HO Design System</div>}>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800"
                onClick={(e) => e.preventDefault()}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </Sidebar>

        <main className="flex-1 p-6">
          <PageHeader title="Dashboard" />
          <div className="rounded-lg border-2 border-dashed border-neutral-300 p-12 text-center text-neutral-500">
            Main content area
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

const meta: Meta = {
  title: 'Patterns/Sidebar + Breadcrumb',
  tags: [],
};

export default meta;
type Story = StoryObj;

export const Layout: Story = {
  render: () => <SidebarBreadcrumbLayout />,
};

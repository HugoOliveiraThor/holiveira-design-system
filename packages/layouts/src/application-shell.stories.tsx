import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Header, HeaderToggle } from './header';
import { Sidebar } from './sidebar';
import { SidebarProvider } from './sidebar-context';

function SidebarDecorator(Story: () => JSX.Element) {
  return (
    <SidebarProvider>
      <div className="flex h-[600px]">
        <Story />
      </div>
    </SidebarProvider>
  );
}

const navItems = [
  { label: 'Dashboard', icon: '&#9679;' },
  { label: 'Analytics', icon: '&#9679;' },
  { label: 'Settings', icon: '&#9679;' },
];

const meta: Meta<typeof Header> = {
  title: 'Layouts/Application Shell',
  component: Header,
  tags: ['autodocs'],
  decorators: [SidebarDecorator],
  argTypes: {
    children: {
      description: 'Content rendered inside the header section of the shell.',
      control: false,
    },
    className: {
      description: 'Additional CSS classes for the header element.',
      control: 'text',
      table: { defaultValue: { summary: 'undefined' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <Sidebar logo={<div className="text-lg font-bold">Holiveira</div>}>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={(e) => e.preventDefault()}
            >
              <span dangerouslySetInnerHTML={{ __html: item.icon }} />
              {item.label}
            </a>
          ))}
        </nav>
      </Sidebar>

      <div className="flex flex-1 flex-col">
        <Header>
          <HeaderToggle />
        </Header>

        <main className="flex-1 p-6">
          <div className="rounded-lg border-2 border-dashed border-neutral-300 p-12 text-center text-neutral-500">
            Main content area
          </div>
        </main>
      </div>
    </>
  ),
};

export const MobileView: Story = {
  render: () => (
    <>
      <Sidebar logo={<div className="text-lg font-bold">Holiveira</div>}>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={(e) => e.preventDefault()}
            >
              <span dangerouslySetInnerHTML={{ __html: item.icon }} />
              {item.label}
            </a>
          ))}
        </nav>
      </Sidebar>

      <div className="flex flex-1 flex-col">
        <Header>
          <HeaderToggle />
        </Header>

        <main className="flex-1 p-6">
          <div className="rounded-lg border-2 border-dashed border-neutral-300 p-12 text-center text-neutral-500">
            Main content area
          </div>
        </main>
      </div>
    </>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'xsm',
    },
  },
};

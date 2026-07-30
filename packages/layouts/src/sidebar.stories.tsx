import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import React from 'react';

import { Sidebar } from './sidebar';
import { SidebarProvider, useSidebarContext } from './sidebar-context';

function SidebarDecorator(Story: () => JSX.Element) {
  return (
    <SidebarProvider>
      <div className="flex min-h-[400px]">
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

function NavItems() {
  return (
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
  );
}

const meta: Meta<typeof Sidebar> = {
  title: 'Layouts/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  decorators: [SidebarDecorator],
  args: {
    logo: <div className="text-lg font-bold">Holiveira</div>,
    children: <NavItems />,
  },
  argTypes: {
    logo: {
      description: 'Logo or branding element rendered at the top of the sidebar.',
      control: false,
    },
    children: {
      description: 'Navigation items and content within the sidebar.',
      control: false,
    },
    className: {
      description: 'Additional CSS classes for the sidebar container.',
      control: 'text',
      table: { defaultValue: { summary: 'undefined' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Expanded: Story = {};

export const Collapsed: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider defaultCollapsed={true}>
        <div className="flex min-h-[400px]">
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
};

export const MobileOverlay: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'xsm',
    },
  },
};

export const WithNavigationItems: Story = {};

function ToggleStory({ children }: { children: React.ReactNode }) {
  const { collapsed, setCollapsed } = useSidebarContext();
  return (
    <div className="relative flex min-h-[400px]">
      {children}
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-2 right-2 z-50 rounded-md border px-2 py-1 text-sm"
      >
        {collapsed ? 'Expand' : 'Collapse'}
      </button>
    </div>
  );
}

export const Interactive: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider defaultCollapsed={true}>
        <div className="flex min-h-[400px]">
          <ToggleStory>
            <Story />
          </ToggleStory>
        </div>
      </SidebarProvider>
    ),
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Sidebar starts collapsed', async () => {
      const sidebar = canvas.getByRole('complementary');
      await expect(sidebar).toHaveAttribute('aria-hidden', 'true');
    });

    await step('Click expand button', async () => {
      const toggle = canvas.getByRole('button', { name: /expand|collapse/i });
      await userEvent.click(toggle);
      const sidebar = canvas.getByRole('complementary');
      await expect(sidebar).toHaveAttribute('aria-hidden', 'false');
    });
  },
};

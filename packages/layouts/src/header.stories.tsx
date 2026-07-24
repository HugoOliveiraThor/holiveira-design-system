import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import React from 'react';

import { Header, HeaderToggle, HeaderActions } from './header';
import { SidebarProvider } from './sidebar-context';

function SidebarDecorator(Story: () => JSX.Element) {
  return (
    <SidebarProvider>
      <Story />
    </SidebarProvider>
  );
}

const meta: Meta<typeof Header> = {
  title: 'Layouts/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [SidebarDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CompoundComposition: Story = {
  render: () => (
    <Header>
      <HeaderToggle />
      <HeaderActions>
        <span className="text-sm text-neutral-500">John Doe</span>
      </HeaderActions>
    </Header>
  ),
};

export const ToggleInteraction: Story = {
  render: () => (
    <Header>
      <HeaderToggle />
      <HeaderActions>
        <span className="text-sm text-neutral-500">Notifications</span>
      </HeaderActions>
    </Header>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Toggle button is visible on mobile', async () => {
      const toggle = canvas.getByRole('button', { name: /toggle sidebar/i });
      await expect(toggle).toBeVisible();
    });
  },
};

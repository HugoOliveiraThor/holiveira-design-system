import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';

import { Breadcrumb } from './breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  args: {
    pageName: 'Default Page',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleLevel: Story = {
  args: {
    pageName: 'Dashboard',
  },
};

export const Nested: Story = {
  args: {
    pageName: 'Settings / Profile',
  },
};

export const LongPaths: Story = {
  args: {
    pageName: 'A very long page name that spans multiple lines in the breadcrumb layout',
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <span aria-hidden="true">&#9733;</span>
      <Breadcrumb {...args} />
    </div>
  ),
  args: {
    pageName: 'Favorites',
  },
};

export const Interactive: Story = {
  args: {
    pageName: 'Interactive',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Breadcrumb is visible with page name', async () => {
      const heading = canvas.getByText('Interactive');
      await expect(heading).toBeVisible();
    });

    await step('Navigation link is present', async () => {
      const link = canvas.getByRole('link', { name: /dashboard/i });
      await expect(link).toBeVisible();
    });

    await step('Current page is marked with aria-current', async () => {
      const current = canvas.getByText('Interactive');
      const listItem = current.closest('li');
      await expect(listItem).toHaveAttribute('aria-current', 'page');
    });
  },
};

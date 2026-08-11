import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';

import { PageHeader } from './page-header';

const meta: Meta<typeof PageHeader> = {
  title: 'UI/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  args: {
    title: 'Default Page',
  },
  argTypes: {
    title: {
      description: 'Page title rendered as the h2 heading.',
      control: { type: 'text' },
    },
    breadcrumb: {
      description: 'Optional breadcrumb trail items. Defaults to "Dashboard / {title}".',
      control: false,
    },
    className: {
      description: 'Additional CSS classes.',
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleLevel: Story = {
  args: {
    title: 'Dashboard',
  },
};

export const Nested: Story = {
  args: {
    title: 'Profile',
    breadcrumb: [
      { label: 'Dashboard', href: '/' },
      { label: 'Settings', href: '/settings' },
      { label: 'Profile' },
    ],
  },
};

export const LongPaths: Story = {
  args: {
    title: 'A very long page name that spans multiple lines in the page header layout',
  },
};

export const WithTrail: Story = {
  render: (args) => <PageHeader {...args} />,
  args: {
    title: 'Analytics',
    breadcrumb: [{ label: 'Dashboard', href: '/' }, { label: 'Analytics' }],
  },
};

export const Interactive: Story = {
  args: {
    title: 'Interactive',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('PageHeader is visible with page name', async () => {
      const heading = canvas.getByRole('heading', { name: /interactive/i });
      await expect(heading).toBeVisible();
    });

    await step('Navigation link is present', async () => {
      const link = canvas.getByRole('link', { name: /dashboard/i });
      await expect(link).toBeVisible();
    });

    await step('Current page is marked with aria-current', async () => {
      const current = canvas
        .getByRole('navigation', { name: /breadcrumb/i })
        .getByText('Interactive');
      const listItem = current.closest('li');
      await expect(listItem).toHaveAttribute('aria-current', 'page');
    });
  },
};

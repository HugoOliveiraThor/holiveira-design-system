import { BellIcon, HomeIcon, PieChartIcon, UserIcon } from '@ho-dev/icons';

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

function TabsDemo(props: Partial<React.ComponentProps<typeof Tabs>>) {
  const [tab, setTab] = useState('overview');
  return (
    <Tabs value={tab} onValueChange={setTab} {...props}>
      <TabsList {...props}>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="notification">Notification</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="customers">Customers</TabsTrigger>
      </TabsList>
      <div className="pt-4">
        {['overview', 'notification', 'analytics', 'customers'].map((t) => (
          <TabsContent key={t} value={t}>
            <h3 className="mb-1 text-xl font-medium text-gray-800 dark:text-white/90">
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t.charAt(0).toUpperCase() + t.slice(1)} ipsum dolor sit amet consectetur.
            </p>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}

function TabsWithIconsDemo(props: Partial<React.ComponentProps<typeof Tabs>>) {
  const [tab, setTab] = useState('overview');
  const icons = {
    overview: HomeIcon,
    notification: BellIcon,
    analytics: PieChartIcon,
    customers: UserIcon,
  };
  return (
    <Tabs value={tab} onValueChange={setTab} {...props}>
      <TabsList variant="underline">
        {(['overview', 'notification', 'analytics', 'customers'] as const).map((t) => {
          const Icon = icons[t];
          return (
            <TabsTrigger key={t} value={t}>
              <Icon size={20} />
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </TabsTrigger>
          );
        })}
      </TabsList>
      <div className="pt-4">
        {['overview', 'notification', 'analytics', 'customers'].map((t) => (
          <TabsContent key={t} value={t}>
            <h3 className="mb-1 text-xl font-medium text-gray-800 dark:text-white/90">
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t.charAt(0).toUpperCase() + t.slice(1)} ipsum dolor sit amet consectetur.
            </p>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}

const meta: Meta<typeof Tabs> = {
  title: 'Primitives/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'Active tab value (controlled).',
      control: { type: 'text' },
    },
    orientation: {
      description: 'Layout direction.',
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      table: { defaultValue: { summary: 'horizontal' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800">
      <TabsDemo {...args} />
    </div>
  ),
};

export const Underline: Story = {
  render: (args) => (
    <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
      <TabsDemo {...args} variant="underline" />
    </div>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
      <TabsWithIconsDemo {...args} />
    </div>
  ),
};

export const WithBadge: Story = {
  render: (args) => (
    <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
      <Tabs {...args} value="overview" onValueChange={() => {}}>
        <TabsList variant="underline">
          <TabsTrigger value="overview">
            Overview
            <span className="bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-center text-xs font-medium">
              8
            </span>
          </TabsTrigger>
          <TabsTrigger value="notification">Notification</TabsTrigger>
          <TabsTrigger value="analytics">
            Analytics
            <span className="bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-center text-xs font-medium">
              4
            </span>
          </TabsTrigger>
          <TabsTrigger value="customers">
            Customers
            <span className="bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-center text-xs font-medium">
              12
            </span>
          </TabsTrigger>
        </TabsList>
        <div className="pt-4">
          <TabsContent value="overview">
            <p className="text-sm text-gray-500 dark:text-gray-400">Overview content.</p>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
        <Tabs {...args} value="overview" onValueChange={() => {}} orientation="vertical">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="notification">Notification</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>
          <div className="flex-1">
            <TabsContent value="overview">
              <h3 className="mb-1 text-xl font-medium text-gray-800 dark:text-white/90">
                Overview
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Overview content.</p>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  ),
};

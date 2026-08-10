import { HomeIcon } from '@ho-dev/icons';

import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumb } from './breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Primitives/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  args: {
    items: [{ label: 'Home', href: '#' }, { label: 'Ui Kits', href: '#' }, { label: 'Avatar' }],
  },
  argTypes: {
    divider: {
      description: 'Divider style between items.',
      control: { type: 'select' },
      options: ['slash', 'chevron', 'dot'],
      table: { defaultValue: { summary: 'slash' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [{ label: 'Home', href: '#' }, { label: 'Ui Kits' }],
  },
};

export const Nested: Story = {
  args: {
    items: [{ label: 'Home', href: '#' }, { label: 'Ui Kits', href: '#' }, { label: 'Avatar' }],
  },
};

export const WithIcons: Story = {
  args: {
    items: [{ label: 'Home', href: '#', icon: <HomeIcon size={16} /> }, { label: 'Ui Kits' }],
  },
};

export const ChevronDivider: Story = {
  args: {
    divider: 'chevron',
    items: [{ label: 'Home', href: '#' }, { label: 'Ui Kits' }],
  },
};

export const ChevronNested: Story = {
  args: {
    divider: 'chevron',
    items: [{ label: 'Home', href: '#' }, { label: 'Ui Kits', href: '#' }, { label: 'Button' }],
  },
};

export const DotDivider: Story = {
  args: {
    divider: 'dot',
    items: [{ label: 'Home', href: '#' }, { label: 'Ui Kits' }],
  },
};

export const DotNested: Story = {
  args: {
    divider: 'dot',
    items: [{ label: 'Home', href: '#' }, { label: 'Ui Kits', href: '#' }, { label: 'Button' }],
  },
};

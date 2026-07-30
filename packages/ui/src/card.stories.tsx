import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    children: 'Card content goes here.',
    className: 'p-6',
  },
  argTypes: {
    variant: {
      description: 'Card visual variant.',
      control: { type: 'select' },
      options: ['default', 'bordered', 'ghost'],
      table: { defaultValue: { summary: 'default' } },
    },
    children: {
      description: 'Content inside the card.',
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

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'This is a default card with shadow and background.',
  },
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    children: 'This card has a visible border.',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'This card has no background or shadow (ghost variant).',
  },
};

export const WithImage: Story = {
  render: (args) => (
    <Card {...args}>
      <div className="space-y-4">
        <div className="dark:bg-dark-3 flex h-40 items-center justify-center rounded-lg bg-neutral-100">
          <span className="text-neutral-400">Image placeholder</span>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Card with Image</h3>
          <p className="text-neutral-500">
            A card layout that includes an image placeholder at the top.
          </p>
        </div>
      </div>
    </Card>
  ),
  args: {
    variant: 'default',
  },
};

export const WithChildren: Story = {
  render: (args) => (
    <Card {...args}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-neutral-500">
          This card contains multiple children elements including a title, description, and action
          button.
        </p>
        <button className="bg-primary rounded-md px-4 py-2 text-white">Action</button>
      </div>
    </Card>
  ),
  args: {
    variant: 'default',
  },
};

export const Clickable: Story = {
  render: (args) => (
    <button type="button" onClick={() => alert('Card clicked')} className="w-full text-left">
      <Card {...args} />
    </button>
  ),
  args: {
    variant: 'bordered',
    children: 'Click this card to trigger an action.',
  },
};

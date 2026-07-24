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

import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from './skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Primitives/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Shape variant of the skeleton placeholder.',
      control: { type: 'select' },
      options: ['circle', 'rectangle', 'text'],
      table: { defaultValue: { summary: 'text' } },
    },
    width: {
      description: 'Custom width override (CSS value, e.g. `100px`, `50%`).',
      control: { type: 'text' },
    },
    height: {
      description: 'Custom height override (CSS value, e.g. `20px`).',
      control: { type: 'text' },
    },
    className: {
      description: 'Additional CSS classes.',
      control: false,
    },
    'aria-hidden': {
      description: 'Hides the skeleton from assistive technology.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'true' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'h-4 w-full',
  },
};

export const Circle: Story = {
  render: () => <Skeleton className="size-12 rounded-full" />,
};

export const Rectangle: Story = {
  args: {
    className: 'h-32 w-full',
  },
};

export const Text: Story = {
  render: () => (
    <div className="space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  ),
};

export const MultipleLines: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  ),
};

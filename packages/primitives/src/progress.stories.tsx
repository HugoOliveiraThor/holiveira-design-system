import type { Meta, StoryObj } from '@storybook/react';

import { Progress } from './progress';

const meta: Meta<typeof Progress> = {
  title: 'Primitives/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: {
    value: 55,
  },
  argTypes: {
    value: {
      description: 'Progress value 0-100.',
      control: { type: 'number' },
    },
    size: {
      description: 'Bar height.',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      table: { defaultValue: { summary: 'md' } },
    },
    shape: {
      description: 'Border shape.',
      control: { type: 'select' },
      options: ['default', 'rounded'],
      table: { defaultValue: { summary: 'rounded' } },
    },
    label: {
      description: 'Percentage label placement.',
      control: { type: 'select' },
      options: ['none', 'outside', 'inside'],
      table: { defaultValue: { summary: 'none' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-[320px] space-y-5">
      <Progress {...args} value={55} />
      <Progress {...args} value={85} />
      <Progress {...args} value={35} />
    </div>
  ),
};

export const MultipleSizes: Story = {
  render: (args) => (
    <div className="w-full max-w-[320px] space-y-4">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Progress key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const OutsideLabel: Story = {
  render: (args) => (
    <div className="w-full max-w-[320px] space-y-5">
      <Progress {...args} value={40} label="outside" />
      <Progress {...args} value={70} label="outside" />
      <Progress {...args} value={30} label="outside" />
    </div>
  ),
};

export const InsideLabel: Story = {
  render: (args) => (
    <div className="w-full max-w-[320px] space-y-5">
      <Progress {...args} value={40} label="inside" />
      <Progress {...args} value={70} label="inside" />
      <Progress {...args} value={30} label="inside" />
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';
import { Spinner } from './spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Primitives/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'Spinner size.',
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      table: { defaultValue: { summary: 'md' } },
    },
    color: {
      description: 'Arc color.',
      control: { type: 'select' },
      options: ['primary', 'white', 'gray'],
      table: { defaultValue: { summary: 'primary' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Spinner key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      {(['primary', 'white', 'gray'] as const).map((color) => (
        <div key={color} className={color === 'white' ? 'bg-primary rounded-lg p-4' : ''}>
          <Spinner {...args} color={color} />
        </div>
      ))}
    </div>
  ),
};

export const WithButton: Story = {
  render: (args) => (
    <div className="flex items-center gap-5">
      <Button>
        <Spinner {...args} color="white" size="xs" />
        Loading...
      </Button>
      <Button variant="outline">
        <Spinner {...args} size="xs" />
        Loading...
      </Button>
    </div>
  ),
};

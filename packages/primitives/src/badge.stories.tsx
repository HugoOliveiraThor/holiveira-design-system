import { CheckIcon, CloseIcon } from '@ho-dev/icons';

import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Color variant.',
      control: { type: 'select' },
      options: ['primary', 'success', 'error', 'warning', 'info', 'light', 'dark'],
      table: { defaultValue: { summary: 'primary' } },
    },
    fill: {
      description: 'Fill style (light = tinted bg, solid = full color).',
      control: { type: 'select' },
      options: ['light', 'solid'],
      table: { defaultValue: { summary: 'light' } },
    },
    iconPosition: {
      description: 'Icon placement.',
      control: { type: 'select' },
      options: ['left', 'right'],
      table: { defaultValue: { summary: 'left' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LightBackground: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['primary', 'success', 'error', 'warning', 'info', 'light', 'dark'] as const).map(
        (variant) => (
          <Badge key={variant} variant={variant}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Badge>
        ),
      )}
    </div>
  ),
};

export const SolidBackground: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['primary', 'success', 'error', 'warning', 'info', 'light', 'dark'] as const).map(
        (variant) => (
          <Badge key={variant} variant={variant} fill="solid">
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Badge>
        ),
      )}
    </div>
  ),
};

export const WithLeftIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['primary', 'success', 'error', 'warning', 'info', 'light', 'dark'] as const).map(
        (variant) => (
          <Badge key={variant} variant={variant} icon={<CheckIcon size={12} />}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Badge>
        ),
      )}
    </div>
  ),
};

export const WithRightIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['primary', 'success', 'error', 'warning', 'info', 'light', 'dark'] as const).map(
        (variant) => (
          <Badge
            key={variant}
            variant={variant}
            icon={<CloseIcon size={12} />}
            iconPosition="right"
          >
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Badge>
        ),
      )}
    </div>
  ),
};

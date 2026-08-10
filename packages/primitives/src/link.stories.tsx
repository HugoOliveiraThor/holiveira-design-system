import type { Meta, StoryObj } from '@storybook/react';

import { Link } from './link';

const meta: Meta<typeof Link> = {
  title: 'Primitives/Link',
  component: Link,
  tags: ['autodocs'],
  args: {
    href: '#',
    children: 'Link text',
  },
  argTypes: {
    variant: {
      description: 'Color variant.',
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'error', 'warning', 'info', 'light', 'dark'],
      table: { defaultValue: { summary: 'default' } },
    },
    underline: {
      description: 'Adds an underline to the link text.',
      control: { type: 'boolean' },
    },
    opacity: {
      description: 'Text opacity level.',
      control: { type: 'select' },
      options: [10, 25, 50, 75, 100],
      table: { defaultValue: { summary: '100' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ColoredLinks: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {(
        ['default', 'primary', 'success', 'error', 'warning', 'info', 'light', 'dark'] as const
      ).map((variant) => (
        <Link key={variant} {...args} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)} link
        </Link>
      ))}
    </div>
  ),
};

export const WithUnderline: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {(
        ['default', 'primary', 'success', 'error', 'warning', 'info', 'light', 'dark'] as const
      ).map((variant) => (
        <Link key={variant} {...args} variant={variant} underline>
          {variant.charAt(0).toUpperCase() + variant.slice(1)} link
        </Link>
      ))}
    </div>
  ),
};

export const Opacity: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {([10, 25, 50, 75, 100] as const).map((opacity) => (
        <Link key={opacity} {...args} opacity={opacity}>
          Link opacity {opacity}
        </Link>
      ))}
    </div>
  ),
};

export const OpacityHover: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {([10, 25, 50, 75, 100] as const).map((opacity) => (
        <Link
          key={opacity}
          {...args}
          className="hover:text-gray-500 dark:hover:text-gray-400"
          opacity={opacity}
        >
          Link opacity {opacity}
        </Link>
      ))}
    </div>
  ),
};

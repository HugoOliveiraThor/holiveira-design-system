import type { Meta, StoryObj } from '@storybook/react';

import { Alert } from './alert';

const meta: Meta<typeof Alert> = {
  title: 'Primitives/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Severity variant controlling border, background, and icon color.',
      control: { type: 'select' },
      options: ['success', 'warning', 'error', 'info'],
      table: { defaultValue: { summary: 'info' } },
    },
    title: {
      description: 'Bold heading displayed above the message.',
      control: { type: 'text' },
    },
    description: {
      description: 'Content of the alert message.',
      control: { type: 'text' },
    },
    link: {
      description: 'Optional "Learn more" link rendered below the description.',
      control: { type: 'object' },
    },
    className: {
      description: 'Additional CSS classes for custom styling.',
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Informational notice',
    description: 'Here is some useful information for you.',
  },
};

export const WithLink: Story = {
  args: {
    variant: 'success',
    title: 'Success Message',
    description: 'You can insert a description for the message here.',
    link: { label: 'Learn more', href: '#' },
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success Message',
    description: 'You can insert a description for the message here.',
    link: { label: 'Learn more', href: '#' },
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning Message',
    description: 'You can insert a description for the message here.',
    link: { label: 'Learn more', href: '#' },
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error Message',
    description: 'You can insert a description for the message here.',
    link: { label: 'Learn more', href: '#' },
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Info Message',
    description: 'You can insert a description for the message here.',
    link: { label: 'Learn more', href: '#' },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      {(
        [
          { variant: 'success', title: 'Success Message' },
          { variant: 'warning', title: 'Warning Message' },
          { variant: 'error', title: 'Error Message' },
          { variant: 'info', title: 'Info Message' },
        ] as const
      ).map(({ variant, title }) => (
        <div key={variant}>
          <Alert
            variant={variant}
            title={title}
            description="You can insert a description for the message here. The text relates to the action that has been performed."
          />
          <div className="mt-4">
            <Alert
              variant={variant}
              title={title}
              description="You can insert a description for the message here."
              link={{ label: 'Learn more', href: '#' }}
            />
          </div>
        </div>
      ))}
    </div>
  ),
};

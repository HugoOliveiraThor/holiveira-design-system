import type { Meta, StoryObj } from '@storybook/react';

import { Field } from './field';

const meta: Meta<typeof Field> = {
  title: 'Forms/Field',
  component: Field,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Label text displayed above the field.',
      control: 'text',
      table: { defaultValue: { summary: 'undefined' } },
    },
    description: {
      description: 'Descriptive text displayed below the field.',
      control: 'text',
      table: { defaultValue: { summary: 'undefined' } },
    },
    error: {
      description: 'Error message displayed when validation fails.',
      control: 'text',
      table: { defaultValue: { summary: 'undefined' } },
    },
    children: {
      description: 'Content rendered inside the field container.',
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
  render: (args) => (
    <Field {...args}>
      <input
        className="border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none"
        placeholder="Enter value..."
      />
    </Field>
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <Field {...args}>
      <input
        className="border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none"
        placeholder="Enter value..."
      />
    </Field>
  ),
  args: {
    label: 'Full Name',
  },
};

export const WithDescription: Story = {
  render: (args) => (
    <Field {...args}>
      <input
        className="border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none"
        placeholder="Enter value..."
      />
    </Field>
  ),
  args: {
    label: 'Full Name',
    description: 'Enter your first and last name.',
  },
};

export const WithError: Story = {
  render: (args) => (
    <Field {...args}>
      <input
        className="border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none"
        defaultValue="invalid"
      />
    </Field>
  ),
  args: {
    label: 'Email',
    description: 'Must be a valid email address.',
    error: 'Please enter a valid email.',
  },
};

export const Required: Story = {
  render: (args) => (
    <Field {...args}>
      <input
        className="border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none"
        placeholder="Enter value..."
        required
      />
    </Field>
  ),
  args: {
    label: 'Name *',
  },
};

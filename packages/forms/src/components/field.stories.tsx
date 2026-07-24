import type { Meta, StoryObj } from '@storybook/react';

import { Field } from './field';

const meta: Meta<typeof Field> = {
  title: 'Forms/Field',
  component: Field,
  tags: ['autodocs'],
  args: {
    label: 'Field Label',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ComposedField: Story = {
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

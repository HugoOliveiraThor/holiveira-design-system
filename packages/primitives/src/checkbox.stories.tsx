import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';

import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    label: 'Checkbox label',
  },
  argTypes: {
    label: {
      description: 'Text displayed next to the checkbox.',
      control: { type: 'text' },
    },
    disabled: {
      description: 'Prevents user interaction.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    defaultChecked: {
      description: 'Initial checked state (uncontrolled).',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    checked: {
      description: 'Controlled checked state.',
      control: { type: 'boolean' },
    },
    withIcon: {
      description: 'Icon style to show when checked.',
      control: { type: 'select' },
      options: ['check', 'x'],
    },
    withBg: {
      description: 'Toggles background fill style.',
      control: { type: 'boolean' },
    },
    minimal: {
      description: 'Compact minimal style.',
      control: { type: 'boolean' },
    },
    radius: {
      description: 'Border radius variant.',
      control: { type: 'select' },
      options: ['default', 'md'],
    },
    onChange: {
      description:
        'Callback fired when checked state changes. Receives `React.ChangeEvent<HTMLInputElement>`.',
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: {
    label: 'Unchecked checkbox',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate checkbox',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const WithError: Story = {
  render: (args) => (
    <div>
      <Checkbox {...args} />
      <p className="text-red text-body-xs mt-1">You must accept the terms to continue.</p>
    </div>
  ),
  args: {
    label: 'I accept the terms',
  },
};

export const Interactive: Story = {
  args: {
    label: 'Toggle me',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await step('Checkbox starts unchecked', async () => {
      await expect(checkbox).not.toBeChecked();
    });

    await step('Click to check', async () => {
      await userEvent.click(checkbox);
      await expect(checkbox).toBeChecked();
    });

    await step('Click to uncheck', async () => {
      await userEvent.click(checkbox);
      await expect(checkbox).not.toBeChecked();
    });
  },
};

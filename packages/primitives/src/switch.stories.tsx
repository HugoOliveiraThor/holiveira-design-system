import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';

import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    defaultChecked: {
      description: 'Initial checked state (uncontrolled).',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    checked: {
      description: 'Controlled checked state.',
      control: { type: 'boolean' },
    },
    disabled: {
      description: 'Prevents user interaction.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    withIcon: {
      description: 'Shows check/x icons inside the toggle.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    background: {
      description: 'Background color variant of the track.',
      control: { type: 'select' },
      options: ['dark', 'light'],
      table: { defaultValue: { summary: 'dark' } },
    },
    backgroundSize: {
      description: 'Size variant of the switch track.',
      control: { type: 'select' },
      options: ['sm', 'default'],
      table: { defaultValue: { summary: 'default' } },
    },
    onChange: {
      description:
        'Callback fired when the switch is toggled. Receives `React.ChangeEvent<HTMLInputElement>`.',
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const On: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Disabled switch cannot be toggled', async () => {
      const toggle = canvas.getByRole('checkbox');
      await expect(toggle).toBeDisabled();
    });
  },
};

export const WithLabel: Story = {
  render: () => (
    <label className="flex items-center gap-3">
      <Switch />
      <span className="text-body-sm font-medium">Enable notifications</span>
    </label>
  ),
};

export const Interactive: Story = {
  args: {
    defaultChecked: false,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const switchInput = canvas.getByRole('checkbox');

    await step('Switch starts off', async () => {
      await expect(switchInput).not.toBeChecked();
    });

    await step('Toggle on', async () => {
      await userEvent.click(switchInput);
      await expect(switchInput).toBeChecked();
    });

    await step('Toggle off', async () => {
      await userEvent.click(switchInput);
      await expect(switchInput).not.toBeChecked();
    });
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';

import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  component: Switch,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {
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

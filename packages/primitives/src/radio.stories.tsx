import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';

import { Radio } from './radio';

const meta: Meta<typeof Radio> = {
  title: 'Primitives/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: {
    label: 'Radio option',
    name: 'radio-group',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: {
    label: 'Selected option',
    defaultChecked: true,
  },
};

export const Unselected: Story = {
  args: {
    label: 'Unselected option',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
};

export const RadioGroup: Story = {
  render: () => (
    <div className="space-y-3">
      <Radio label="Option A" name="group" value="a" defaultChecked />
      <Radio label="Option B" name="group" value="b" />
      <Radio label="Option C" name="group" value="c" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-3">
      <Radio label="First option" name="interactive" value="first" />
      <Radio label="Second option" name="interactive" value="second" />
      <Radio label="Third option" name="interactive" value="third" />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const radios = canvas.getAllByRole('radio');

    await step('First radio can be selected', async () => {
      await userEvent.click(radios[0]);
      await expect(radios[0]).toBeChecked();
    });

    await step('Select second radio, first becomes unchecked', async () => {
      await userEvent.click(radios[1]);
      await expect(radios[1]).toBeChecked();
      await expect(radios[0]).not.toBeChecked();
    });

    await step('Select third radio, second becomes unchecked', async () => {
      await userEvent.click(radios[2]);
      await expect(radios[2]).toBeChecked();
      await expect(radios[1]).not.toBeChecked();
    });
  },
};

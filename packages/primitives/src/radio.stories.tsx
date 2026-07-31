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
  argTypes: {
    label: {
      description: 'Text displayed next to the radio button.',
      control: { type: 'text' },
      table: { defaultValue: { summary: 'undefined' } },
    },
    value: {
      description: 'Value submitted with the form data.',
      control: { type: 'text' },
      table: { defaultValue: { summary: 'undefined' } },
    },
    name: {
      description: 'Group name that links radio buttons together.',
      control: { type: 'text' },
      table: { defaultValue: { summary: 'undefined' } },
    },
    variant: {
      description: 'Visual style of the radio indicator.',
      control: { type: 'select' },
      options: ['dot', 'circle'],
      table: { defaultValue: { summary: 'dot' } },
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
      table: { defaultValue: { summary: 'undefined' } },
    },
    minimal: {
      description: 'Compact minimal style.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    onChange: {
      description:
        'Callback fired when the selected option changes. Receives `React.ChangeEvent<HTMLInputElement>`.',
      control: false,
    },
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

export const Default: Story = {
  args: {
    label: 'Unselected option',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Disabled radio cannot be selected', async () => {
      const radio = canvas.getByRole('radio');
      await expect(radio).toBeDisabled();
    });
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

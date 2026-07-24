import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';

import { Select } from './select';

const items = [
  { value: 'option-1', label: 'Option 1' },
  { value: 'option-2', label: 'Option 2' },
  { value: 'option-3', label: 'Option 3' },
];

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    label: 'Select an option',
    items,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Choose one...',
  },
};

export const WithPrefixIcon: Story = {
  args: {
    label: 'Country',
    items: [
      { value: 'br', label: 'Brazil' },
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
    ],
    prefixIcon: <span>&#127758;</span>,
  },
};

export const WithError: Story = {
  args: {
    label: 'Category',
    placeholder: 'Select category',
    error: 'Please select a category',
  },
};

export const Interactive: Story = {
  args: {
    label: 'Choose',
    items: [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
      { value: 'c', label: 'Option C' },
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');

    await step('Select is visible', async () => {
      await expect(select).toBeVisible();
    });

    await step('Select an option', async () => {
      await userEvent.selectOptions(select, 'a');
      await expect(select).toHaveValue('a');
    });
  },
};

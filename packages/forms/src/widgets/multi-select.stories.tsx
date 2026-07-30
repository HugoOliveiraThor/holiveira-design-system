import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect, waitFor } from '@storybook/test';
import React from 'react';

import { MultiSelect } from './multi-select';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
];

const meta: Meta<typeof MultiSelect> = {
  title: 'Forms/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  args: {
    label: 'Frameworks',
    options,
    placeholder: 'Select frameworks...',
  },
  argTypes: {
    options: {
      description: 'Array of selectable options.',
      control: 'object',
      table: { defaultValue: { summary: '[]' } },
    },
    value: {
      description: 'Controlled selected values.',
      control: 'object',
      table: { defaultValue: { summary: 'undefined' } },
    },
    onChange: {
      description: 'Callback fired when selection changes.',
      control: false,
    },
    placeholder: {
      description: 'Placeholder text when no options are selected.',
      control: 'text',
      table: { defaultValue: { summary: 'Select options' } },
    },
    disabled: {
      description: 'Disables the multi-select.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    searchable: {
      description: 'Enables search/filter within the dropdown.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    label: {
      description: 'Label text displayed above the multi-select.',
      control: 'text',
      table: { defaultValue: { summary: 'undefined' } },
    },
    error: {
      description: 'Error message displayed below the multi-select.',
      control: 'text',
      table: { defaultValue: { summary: 'undefined' } },
    },
    className: {
      description: 'Additional CSS classes.',
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelection: Story = {
  args: {
    value: ['react', 'vue'],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Uncontrolled: Story = {
  args: {
    defaultValue: ['react'],
  },
};

export const Controlled: Story = {
  args: {
    value: ['react', 'vue'],
  },
};

function ClearAllStory() {
  const [value, setValue] = React.useState(['react', 'vue', 'angular']);
  return (
    <div className="space-y-3">
      <MultiSelect
        label="Select your frameworks"
        options={options}
        value={value}
        onChange={setValue}
      />
      <button
        type="button"
        onClick={() => setValue([])}
        className="bg-red/10 text-red rounded-md px-3 py-1 text-sm"
      >
        Clear all
      </button>
    </div>
  );
}

export const ClearAll: Story = {
  render: () => <ClearAllStory />,
};

export const SelectedItemsDisplay: Story = {
  args: {
    value: ['react', 'svelte', 'solid'],
    placeholder: 'Select frameworks...',
  },
};

function InteractiveMultiSelect() {
  const [value, setValue] = React.useState<string[]>([]);
  return (
    <MultiSelect label="Choose" options={options.slice(0, 3)} value={value} onChange={setValue} />
  );
}

export const Interactive: Story = {
  render: () => <InteractiveMultiSelect />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Open dropdown', async () => {
      const combobox = canvas.getByRole('combobox');
      await userEvent.click(combobox);
      const listbox = canvas.getByRole('listbox');
      await expect(listbox).toBeVisible();
    });

    await step('Select an option', async () => {
      const option = canvas.getByText('React');
      await userEvent.click(option);
      await expect(option).toHaveAttribute('aria-selected', 'true');
    });

    await step('Remove selected option', async () => {
      const removeButton = canvas.getByLabelText(/remove react/i);
      await userEvent.click(removeButton);
      await waitFor(() => {
        expect(canvas.queryByLabelText(/remove react/i)).not.toBeInTheDocument();
      });
    });
  },
};

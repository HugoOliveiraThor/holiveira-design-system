import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import React from 'react';

import { DatePicker } from './date-picker';

const meta: Meta<typeof DatePicker> = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'Controlled value of the date picker.',
      control: 'date',
      table: { defaultValue: { summary: 'undefined' } },
    },
    onChange: {
      description: 'Callback fired when the date changes.',
      control: false,
    },
    placeholder: {
      description: 'Placeholder text for the input.',
      control: 'text',
      table: { defaultValue: { summary: 'mm/dd/yyyy' } },
    },
    disabled: {
      description: 'Disables the date picker input.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    enableTime: {
      description: 'Allows time selection alongside date.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    dateFormat: {
      description: 'Flatpickr date format string.',
      control: 'text',
      table: { defaultValue: { summary: 'M j, Y' } },
    },
    label: {
      description: 'Label text displayed above the date picker.',
      control: 'text',
      table: { defaultValue: { summary: 'undefined' } },
    },
    error: {
      description: 'Error message displayed below the date picker.',
      control: 'text',
      table: { defaultValue: { summary: 'undefined' } },
    },
    icon: {
      description: 'Icon displayed inside the input.',
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
  args: {
    label: 'Select date',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Select date',
    disabled: true,
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Date of birth',
    placeholder: 'Select a date',
  },
};

export const Uncontrolled: Story = {
  args: {
    label: 'Select date',
    defaultValue: new Date(2026, 6, 15),
  },
};

function ControlledDatePicker() {
  const [date, setDate] = React.useState(new Date(2026, 6, 15));
  return (
    <div className="space-y-3">
      <DatePicker label="Event date" value={date} onChange={setDate} />
      <p className="text-body-xs text-gray-500">
        Selected: {date.toLocaleDateString('en-US', { dateStyle: 'long' })}
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDatePicker />,
};

export const WithIcon: Story = {
  args: {
    label: 'Date of birth',
    icon: <span aria-hidden="true">&#128197;</span>,
  },
};

export const Interactive: Story = {
  args: {
    label: 'Pick a date',
    placeholder: 'Select a date',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Date input is visible', async () => {
      const input = canvas.getByPlaceholderText('Select a date');
      await expect(input).toBeVisible();
    });

    await step('Click triggers flatpickr calendar', async () => {
      const input = canvas.getByPlaceholderText('Select a date');
      await userEvent.click(input);
    });
  },
};

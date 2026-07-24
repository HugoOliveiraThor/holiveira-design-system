import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import React from 'react';

import { DatePicker } from './date-picker';

const meta: Meta<typeof DatePicker> = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  args: {
    label: 'Select date',
    placeholder: 'mm/dd/yyyy',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {
  args: {
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
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Date input is visible', async () => {
      const input = canvas.getByPlaceholderText('mm/dd/yyyy');
      await expect(input).toBeVisible();
    });

    await step('Click triggers flatpickr calendar', async () => {
      const input = canvas.getByPlaceholderText('mm/dd/yyyy');
      await userEvent.click(input);
    });
  },
};

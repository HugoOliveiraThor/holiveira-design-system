import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';

import { Submit } from './submit';

const meta: Meta<typeof Submit> = {
  title: 'Forms/Submit',
  component: Submit,
  tags: ['autodocs'],
  args: {
    children: 'Submit',
  },
  argTypes: {
    children: {
      description: 'Button label or content.',
      control: 'text',
      table: { defaultValue: { summary: 'undefined' } },
    },
    disabled: {
      description: 'Disables the submit button.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
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
    children: 'Save Changes',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Cannot Proceed',
    disabled: true,
  },
};

export const Loading: Story = {
  render: (args) => (
    <Submit {...args}>
      <span className="inline-flex items-center gap-2">
        <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        Saving...
      </span>
    </Submit>
  ),
};

export const Interactive: Story = {
  args: {
    children: 'Click to Submit',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Submit button is visible and enabled', async () => {
      const button = canvas.getByRole('button', { name: /click to submit/i });
      await expect(button).toBeVisible();
      await expect(button).not.toBeDisabled();
    });

    await step('Click submit button', async () => {
      const button = canvas.getByRole('button', { name: /click to submit/i });
      await userEvent.click(button);
    });
  },
};

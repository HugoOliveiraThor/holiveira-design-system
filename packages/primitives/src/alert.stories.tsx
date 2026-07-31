import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';

import { Alert } from './alert';

const meta: Meta<typeof Alert> = {
  title: 'Primitives/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Visual style determining color and icon.',
      control: { type: 'select' },
      options: ['error', 'success', 'warning'],
      table: { defaultValue: { summary: 'error' } },
    },
    title: {
      description: 'Bold heading displayed above the message.',
      control: { type: 'text' },
      table: { defaultValue: { summary: 'undefined' } },
    },
    description: {
      description: 'Content of the alert message.',
      control: { type: 'text' },
      table: { defaultValue: { summary: 'undefined' } },
    },
    className: {
      description: 'Additional CSS classes for custom styling.',
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Notice: Story = {
  args: {
    variant: 'success',
    title: 'Notice',
    description: 'Here is some useful information for you.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Operation completed successfully',
    description: 'Your changes have been saved and applied.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Review required',
    description: 'Some fields need your attention before proceeding.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Please try again.',
  },
};

export const WithTitle: Story = {
  args: {
    variant: 'success',
    title: 'Account Created',
    description: 'Your account has been successfully created and is ready to use.',
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'warning',
    title: '',
    description: 'This is an alert without a title heading.',
  },
};

export const LongMessage: Story = {
  args: {
    variant: 'success',
    title: 'Terms of Service Update',
    description:
      'We have updated our terms of service effective immediately. Please review the changes carefully. The updated terms include new data processing policies, revised liability clauses, and additional user rights protections. Continued use of our services constitutes acceptance of these updated terms. If you do not agree with the changes, you may cancel your account within 30 days.',
  },
};

export const WithoutDismiss: Story = {
  args: {
    variant: 'success',
    title: 'No dismiss available',
    description: 'This alert cannot be dismissed. It will remain visible.',
  },
};

export const Interactive: Story = {
  args: {
    variant: 'warning',
    title: 'Dismissible alert',
    description: 'This alert demonstrates a dismiss interaction.',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole('alert');

    await step('Alert is visible', async () => {
      await expect(alert).toBeVisible();
    });
  },
};

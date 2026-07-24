import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';

import { Alert } from './alert';

const meta: Meta<typeof Alert> = {
  title: 'Primitives/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    title: 'Alert Title',
    description: 'This is the alert description providing more context about the situation.',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

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

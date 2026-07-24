import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';

import { TextArea } from './text-area';

const meta: Meta<typeof TextArea> = {
  title: 'Primitives/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  args: {
    label: 'Message',
    placeholder: 'Write your message here...',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: 'Your feedback',
    placeholder: 'Tell us what you think...',
  },
};

export const WithError: Story = {
  args: {
    label: 'Comment',
    placeholder: 'Write a comment...',
    error: 'Comment must be at least 10 characters',
  },
};

export const CustomRows: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    rows: 3,
  },
};

export const Interactive: Story = {
  args: {
    label: 'Write something',
    placeholder: 'Start typing...',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');

    await step('Textarea is visible and empty', async () => {
      await expect(textarea).toBeVisible();
      await expect(textarea).toHaveValue('');
    });

    await step('Type into textarea', async () => {
      await userEvent.type(textarea, 'This is a sample text.');
      await expect(textarea).toHaveValue('This is a sample text.');
    });
  },
};

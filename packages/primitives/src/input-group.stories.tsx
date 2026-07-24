import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';

import { InputGroup } from './input-group';

const meta: Meta<typeof InputGroup> = {
  title: 'Primitives/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  args: {
    label: 'Input',
    placeholder: 'Enter value...',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    type: 'text',
    label: 'Full name',
    placeholder: 'John Doe',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    label: 'Email address',
    placeholder: 'john@example.com',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: '********',
  },
};

export const WithIcon: Story = {
  args: {
    type: 'text',
    label: 'Search',
    placeholder: 'Search...',
    icon: <span>&#128269;</span>,
    iconPosition: 'left',
  },
};

export const WithDescription: Story = {
  args: {
    type: 'text',
    label: 'Username',
    placeholder: 'your-username',
  },
};

export const WithError: Story = {
  args: {
    type: 'text',
    label: 'Email',
    placeholder: 'john@example.com',
    error: 'Please enter a valid email address',
  },
};

export const FileStyle1: Story = {
  args: {
    type: 'file',
    label: 'Upload file',
    fileStyleVariant: 'style1',
  },
};

export const FileStyle2: Story = {
  args: {
    type: 'file',
    label: 'Upload file',
    fileStyleVariant: 'style2',
  },
};

export const Interactive: Story = {
  args: {
    type: 'text',
    label: 'Type something',
    placeholder: 'Start typing...',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await step('Input is visible and empty', async () => {
      await expect(input).toBeVisible();
      await expect(input).toHaveValue('');
    });

    await step('Type into input', async () => {
      await userEvent.type(input, 'Hello, Storybook!');
      await expect(input).toHaveValue('Hello, Storybook!');
    });
  },
};

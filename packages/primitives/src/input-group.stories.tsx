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
  argTypes: {
    type: {
      description: 'HTML input type attribute.',
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'file'],
      table: { defaultValue: { summary: 'text' } },
    },
    label: {
      description: 'Text label displayed above the input.',
      control: { type: 'text' },
    },
    placeholder: {
      description: 'Placeholder text inside the input.',
      control: { type: 'text' },
    },
    disabled: {
      description: 'Prevents user interaction.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      description: 'Marks the input as required.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    error: {
      description: 'Error message displayed below the input.',
      control: { type: 'text' },
    },
    icon: {
      description: 'Optional icon rendered inside the input.',
      control: false,
    },
    iconPosition: {
      description: 'Position of the icon relative to the input.',
      control: { type: 'select' },
      options: ['left', 'right'],
      table: { defaultValue: { summary: 'left' } },
    },
    height: {
      description: 'Height variant of the input.',
      control: { type: 'select' },
      options: ['sm', 'default'],
      table: { defaultValue: { summary: 'default' } },
    },
    onChange: {
      description:
        'Callback fired when the input value changes. Receives `React.ChangeEvent<HTMLInputElement>`.',
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Disabled: Story = {
  args: {
    type: 'text',
    label: 'Full name',
    placeholder: 'John Doe',
    disabled: true,
  },
};

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

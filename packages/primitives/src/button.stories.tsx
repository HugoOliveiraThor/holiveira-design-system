import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    label: 'Button',
  },
  argTypes: {
    variant: {
      description: 'Visual style of the button.',
      control: { type: 'select' },
      options: ['primary', 'green', 'dark', 'outlinePrimary', 'outlineGreen', 'outlineDark'],
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      description: 'Predefined size of the button.',
      control: { type: 'select' },
      options: ['default', 'small'],
      table: { defaultValue: { summary: 'default' } },
    },
    shape: {
      description: 'Shape modifier for the button corners.',
      control: { type: 'select' },
      options: ['default', 'rounded', 'full'],
      table: { defaultValue: { summary: 'default' } },
    },
    disabled: {
      description: 'Prevents user interaction. Sets `aria-disabled`.',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    label: {
      description: 'Text content displayed inside the button.',
      control: { type: 'text' },
    },
    icon: {
      description: 'Optional icon element rendered before the label.',
      control: false,
    },
    onClick: {
      description: 'Callback fired when the button is clicked.',
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary',
  },
};

export const Green: Story = {
  args: {
    variant: 'green',
    label: 'Green',
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    label: 'Dark',
  },
};

export const OutlinePrimary: Story = {
  args: {
    variant: 'outlinePrimary',
    label: 'Outline Primary',
  },
};

export const OutlineGreen: Story = {
  args: {
    variant: 'outlineGreen',
    label: 'Outline Green',
  },
};

export const OutlineDark: Story = {
  args: {
    variant: 'outlineDark',
    label: 'Outline Dark',
  },
};

export const Rounded: Story = {
  args: {
    variant: 'primary',
    shape: 'rounded',
    label: 'Rounded',
  },
};

export const Full: Story = {
  args: {
    variant: 'primary',
    shape: 'full',
    label: 'Full',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    label: 'Small',
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    label: 'Settings',
    icon: <span>&#9881;</span>,
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'primary',
    label: '',
    icon: <span>&#9881;</span>,
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    label: 'Loading',
    disabled: true,
    icon: <span className="animate-spin">&#9696;</span>,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    label: 'Disabled',
    disabled: true,
  },
};

export const Interactive: Story = {
  args: {
    variant: 'primary',
    label: 'Click me',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /click me/i });

    await step('Button is visible and enabled', async () => {
      await expect(button).toBeVisible();
      await expect(button).not.toBeDisabled();
    });

    await step('Click button', async () => {
      await userEvent.click(button);
    });
  },
};

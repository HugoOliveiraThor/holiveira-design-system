import type { Meta, StoryObj } from '@storybook/react';

import { OTPInput } from './otp-input';

const meta: Meta<typeof OTPInput> = {
  title: 'Primitives/OTPInput',
  component: OTPInput,
  tags: ['autodocs'],
  argTypes: {
    length: { control: { type: 'number', min: 1, max: 12 } },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    autoFocus: { control: 'boolean' },
    onChange: { control: false },
    onComplete: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: { value: '123' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

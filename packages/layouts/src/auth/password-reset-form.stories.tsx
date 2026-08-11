import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import { useState } from 'react';

import { PasswordResetForm } from './password-reset-form';

function ControlledReset(args: React.ComponentProps<typeof PasswordResetForm>) {
  const [submitting, setSubmitting] = useState(false);
  return (
    <PasswordResetForm
      {...args}
      submitting={submitting}
      onSubmit={() => {
        setSubmitting(true);
        setTimeout(() => setSubmitting(false), 1200);
      }}
    />
  );
}

const meta: Meta<typeof PasswordResetForm> = {
  title: 'Layouts/PasswordResetForm',
  component: PasswordResetForm,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { control: false },
    error: { control: 'text' },
    signinHref: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PasswordResetForm onSubmit={() => {}} />,
};

export const Submitting: Story = {
  render: () => <PasswordResetForm onSubmit={() => {}} submitting />,
};

export const WithError: Story = {
  render: () => <PasswordResetForm onSubmit={() => {}} error="Email not found" />,
};

export const Submit: Story = {
  render: () => <PasswordResetForm onSubmit={() => {}} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/^email/i), 'a@b.com');
    await userEvent.click(canvas.getByRole('button', { name: /send reset link/i }));
    await expect(canvas.getByLabelText(/^email/i)).toHaveValue('a@b.com');
  },
};

export const Interactive: Story = {
  render: () => <ControlledReset />,
};

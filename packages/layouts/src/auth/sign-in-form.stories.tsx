import { GoogleIcon } from '@ho-dev/icons';

import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import { useState } from 'react';

import { SignInForm } from './sign-in-form';

const socialProviders = [
  { provider: 'google' as const, label: 'Sign in with Google', icon: <GoogleIcon size={20} /> },
  { provider: 'x' as const, label: 'Sign in with X' },
];

function ControlledSignIn(args: React.ComponentProps<typeof SignInForm>) {
  const [submitting, setSubmitting] = useState(false);
  return (
    <SignInForm
      {...args}
      submitting={submitting}
      onSubmit={() => {
        setSubmitting(true);
        setTimeout(() => setSubmitting(false), 1200);
      }}
    />
  );
}

const meta: Meta<typeof SignInForm> = {
  title: 'Layouts/SignInForm',
  component: SignInForm,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { control: false },
    error: { control: 'text' },
    socialProviders: { control: false },
    forgotHref: { control: 'text' },
    signupHref: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SignInForm onSubmit={() => {}} />,
};

export const WithSocialProviders: Story = {
  render: () => <SignInForm onSubmit={() => {}} socialProviders={socialProviders} />,
};

export const Submitting: Story = {
  render: () => <SignInForm onSubmit={() => {}} submitting />,
};

export const WithError: Story = {
  render: () => <SignInForm onSubmit={() => {}} error="Invalid email or password" />,
};

export const TogglePassword: Story = {
  render: () => <SignInForm onSubmit={() => {}} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/^password/i) as HTMLInputElement;
    await expect(input.type).toBe('password');
    await userEvent.click(canvas.getByRole('button', { name: /show password/i }));
    await expect((canvas.getByLabelText(/^password/i) as HTMLInputElement).type).toBe('text');
  },
};

export const Submit: Story = {
  render: () => <SignInForm onSubmit={() => {}} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/^email/i), 'a@b.com');
    await userEvent.type(canvas.getByLabelText(/^password/i), 'secret');
    await userEvent.click(canvas.getByRole('button', { name: /sign in/i }));
    await expect(canvas.getByLabelText(/^email/i)).toHaveValue('a@b.com');
  },
};

export const Interactive: Story = {
  render: () => <ControlledSignIn socialProviders={socialProviders} />,
};

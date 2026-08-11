import { GoogleIcon } from '@ho-dev/icons';

import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import { useState } from 'react';

import { SignUpForm } from './sign-up-form';

const socialProviders = [
  { provider: 'google' as const, label: 'Sign up with Google', icon: <GoogleIcon size={20} /> },
  { provider: 'x' as const, label: 'Sign up with X' },
];

function ControlledSignUp(args: React.ComponentProps<typeof SignUpForm>) {
  const [submitting, setSubmitting] = useState(false);
  return (
    <SignUpForm
      {...args}
      submitting={submitting}
      onSubmit={() => {
        setSubmitting(true);
        setTimeout(() => setSubmitting(false), 1200);
      }}
    />
  );
}

const meta: Meta<typeof SignUpForm> = {
  title: 'Layouts/SignUpForm',
  component: SignUpForm,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: { control: false },
    error: { control: 'text' },
    socialProviders: { control: false },
    termsHref: { control: 'text' },
    privacyHref: { control: 'text' },
    signinHref: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SignUpForm onSubmit={() => {}} />,
};

export const WithSocialProviders: Story = {
  render: () => <SignUpForm onSubmit={() => {}} socialProviders={socialProviders} />,
};

export const Submitting: Story = {
  render: () => <SignUpForm onSubmit={() => {}} submitting />,
};

export const WithError: Story = {
  render: () => <SignUpForm onSubmit={() => {}} error="Email already exists" />,
};

export const TogglePassword: Story = {
  render: () => <SignUpForm onSubmit={() => {}} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/^password/i) as HTMLInputElement;
    await expect(input.type).toBe('password');
    await userEvent.click(canvas.getByRole('button', { name: /show password/i }));
    await expect((canvas.getByLabelText(/^password/i) as HTMLInputElement).type).toBe('text');
  },
};

export const Submit: Story = {
  render: () => <SignUpForm onSubmit={() => {}} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/^first name/i), 'Joao');
    await userEvent.type(canvas.getByLabelText(/^last name/i), 'Silva');
    await userEvent.type(canvas.getByLabelText(/^email/i), 'a@b.com');
    await userEvent.type(canvas.getByLabelText(/^password/i), 'secret');
    await userEvent.click(canvas.getByRole('button', { name: /sign up/i }));
    await expect(canvas.getByLabelText(/^email/i)).toHaveValue('a@b.com');
  },
};

export const Interactive: Story = {
  render: () => <ControlledSignUp socialProviders={socialProviders} />,
};

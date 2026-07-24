import { Button } from '@holiveira/primitives';
import { InputGroup } from '@holiveira/primitives';
import { TextArea } from '@holiveira/primitives';

import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import React from 'react';
import { useForm } from 'react-hook-form';

function FormExample() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="mx-auto max-w-lg space-y-6"
      noValidate
    >
      <h2 className="text-dark text-xl font-bold dark:text-white">Contact Form</h2>

      <InputGroup
        type="text"
        label="Full name"
        placeholder="John Doe"
        error={errors.name?.message as string}
        {...register('name', { required: 'Name is required' })}
      />

      <InputGroup
        type="email"
        label="Email address"
        placeholder="john@example.com"
        error={errors.email?.message as string}
        {...register('email', {
          required: 'Email is required',
          pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
        })}
      />

      <TextArea
        label="Message"
        placeholder="Write your message..."
        error={errors.message?.message as string}
        {...register('message', {
          required: 'Message is required',
          minLength: { value: 10, message: 'At least 10 characters' },
        })}
      />

      <Button variant="primary" label="Send Message" type="submit" />
    </form>
  );
}

const meta: Meta = {
  title: 'Patterns/Form + Validation',
  tags: [],
};

export default meta;
type Story = StoryObj;

export const Example: Story = {
  render: () => <FormExample />,
};

export const Interactive: Story = {
  render: () => <FormExample />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Submit with empty fields shows validation', async () => {
      const submit = canvas.getByRole('button', { name: /send message/i });
      await userEvent.click(submit);
    });

    await step('Fill in name', async () => {
      const nameInput = canvas.getByLabelText(/full name/i);
      await userEvent.type(nameInput, 'Jane Smith');
    });

    await step('Fill in email', async () => {
      const emailInput = canvas.getByLabelText(/email address/i);
      await userEvent.type(emailInput, 'jane@example.com');
    });

    await step('Fill in message', async () => {
      const messageInput = canvas.getByLabelText(/message/i);
      await userEvent.type(messageInput, 'This is a test message for the form.');
    });
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Field } from './field';
import { Form } from './form';
import { Submit } from './submit';

function FormDecorator(Story: () => JSX.Element) {
  return (
    <FormProvider>
      <Story />
    </FormProvider>
  );
}

type FormStoryProps = {
  fieldName: string;
  fieldLabel: string;
  fieldPlaceholder: string;
  validation?: Record<string, unknown>;
  submitLabel: string;
};

function FormStory({
  fieldName,
  fieldLabel,
  fieldPlaceholder,
  validation,
  submitLabel,
}: FormStoryProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Form onSubmit={handleSubmit(() => {})}>
      <Field label={fieldLabel} error={errors[fieldName]?.message as string}>
        <input
          {...register(fieldName, validation)}
          className="border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none"
          placeholder={fieldPlaceholder}
        />
      </Field>
      <Submit>{submitLabel}</Submit>
    </Form>
  );
}

const meta: Meta<typeof Form> = {
  title: 'Forms/Form',
  component: Form,
  tags: ['autodocs'],
  decorators: [FormDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FullIntegration: Story = {
  render: () => (
    <FormStory
      fieldName="name"
      fieldLabel="Name"
      fieldPlaceholder="Your name"
      submitLabel="Submit"
    />
  ),
};

export const ValidationErrors: Story = {
  render: () => (
    <FormStory
      fieldName="email"
      fieldLabel="Email"
      fieldPlaceholder="john@example.com"
      validation={{ required: 'Email is required' }}
      submitLabel="Submit"
    />
  ),
};

export const SubmitHandling: Story = {
  render: () => (
    <FormStory
      fieldName="username"
      fieldLabel="Username"
      fieldPlaceholder="your-username"
      validation={{ required: 'Username is required' }}
      submitLabel="Send"
    />
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Submit button is present', async () => {
      const button = canvas.getByRole('button', { name: /send/i });
      await expect(button).toBeVisible();
    });

    await step('Click submit triggers validation', async () => {
      const button = canvas.getByRole('button', { name: /send/i });
      await userEvent.click(button);
    });

    await step('Validation error is displayed', async () => {
      const error = canvas.getByText(/username is required/i);
      await expect(error).toBeVisible();
    });
  },
};

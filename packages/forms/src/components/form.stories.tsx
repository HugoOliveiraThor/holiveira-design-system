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
  argTypes: {
    onSubmit: {
      description: 'Callback fired when the form is submitted after validation.',
      control: false,
    },
    children: {
      description: 'Content rendered inside the form element.',
      control: false,
    },
    className: {
      description: 'Additional CSS classes.',
      control: false,
    },
  },
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

function LoadingForm() {
  const { register, handleSubmit } = useForm();
  return (
    <Form onSubmit={handleSubmit(() => {})}>
      <Field label="Name">
        <input
          {...register('name')}
          className="border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none"
          placeholder="Your name"
        />
      </Field>
      <Submit disabled>
        <span className="inline-flex items-center gap-2">
          <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Saving...
        </span>
      </Submit>
    </Form>
  );
}

export const Loading: Story = {
  render: () => <LoadingForm />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Submit button shows loading state', async () => {
      const button = canvas.getByRole('button', { name: /saving/i });
      await expect(button).toBeVisible();
      await expect(button).toBeDisabled();
    });
  },
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

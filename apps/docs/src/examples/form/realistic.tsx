'use client';

import { Field, Form, useForm } from '@ho-dev/forms';
import { Button } from '@ho-dev/primitives';

import { useState } from 'react';

interface ProfileValues {
  email: string;
  company: string;
}

export function FormRealistic() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileValues>({ defaultValues: { email: '', company: '' } });
  const [saved, setSaved] = useState(false);

  return (
    <Form
      onSubmit={handleSubmit(() => {
        setSaved(true);
        reset();
      })}
    >
      <Field
        label="Work email"
        description="Used for invoices and receipts."
        error={errors.email?.message}
      >
        <input
          type="email"
          placeholder="you@example.com"
          aria-required="true"
          className="border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none"
          {...register('email', { required: 'Enter your work email.' })}
        />
      </Field>
      <Field label="Company" error={errors.company?.message}>
        <input
          type="text"
          placeholder="Acme Corp"
          className="border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none"
          {...register('company', { required: 'Tell us which company you work for.' })}
        />
      </Field>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit">Save profile</Button>
        {saved && (
          <p role="status" className="text-dark-4 dark:text-dark-6 text-sm">
            Profile saved.
          </p>
        )}
      </div>
    </Form>
  );
}

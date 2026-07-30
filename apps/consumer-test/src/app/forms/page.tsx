'use client';

import { Field, Submit, DatePicker } from '@holiveira/forms';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

interface FormData {
  name: string;
  birthDate: Date;
}

export default function FormsPage() {
  const methods = useForm<FormData>();
  const [submitted, setSubmitted] = useState(false);

  return (
    <main style={{ padding: 24 }}>
      <h1>Forms Example — Form + Field + DatePicker + validation</h1>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(() => setSubmitted(true))}
          style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}
        >
          <Field label="Name" error={methods.formState.errors.name?.message}>
            <input
              {...methods.register('name', { required: 'Name is required' })}
              placeholder="Enter name"
            />
          </Field>
          <Field label="Birth Date">
            <DatePicker
              label="Birth Date"
              onChange={(date) => {
                if (date) methods.setValue('birthDate', date);
              }}
            />
          </Field>
          <Submit label="Submit" />
          {submitted && <p>Form submitted!</p>}
        </form>
      </FormProvider>
    </main>
  );
}

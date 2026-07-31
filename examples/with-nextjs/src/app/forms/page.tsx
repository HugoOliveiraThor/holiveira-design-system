'use client';

import { Field, Form, Submit, useForm } from '@holiveira/forms';

import { FormProvider } from 'react-hook-form';

interface FormValues {
  name: string;
}

export default function FormsPage() {
  const methods = useForm<FormValues>();

  return (
    <main style={{ padding: 24 }}>
      <h1>Forms</h1>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit((values) => console.log(values))}>
          <Field label="Name" error={methods.formState.errors.name?.message}>
            <input
              {...methods.register('name', { required: 'Name is required' })}
              placeholder="Enter name"
            />
          </Field>
          <Submit label="Submit">Submit</Submit>
        </Form>
      </FormProvider>
    </main>
  );
}

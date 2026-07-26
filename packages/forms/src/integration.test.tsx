import { userEvent } from '@storybook/test';
import { cleanup } from '@testing-library/react';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { afterEach } from 'vitest';
import { describe, it, expect } from 'vitest';

import { render } from './test-utils';

import { Submit, Field } from './index';

afterEach(cleanup);

function FormWithValidation() {
  const methods = useForm();
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => setSubmitted(true))}>
        <Field label="Name" error={methods.formState.errors.name?.message as string}>
          <input
            {...methods.register('name', { required: 'Name is required' })}
            placeholder="Enter name"
          />
        </Field>
        <Field label="Email" error={methods.formState.errors.email?.message as string}>
          <input
            {...methods.register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
            })}
            placeholder="Enter email"
          />
        </Field>
        <Submit>Submit</Submit>
        {submitted && <p data-testid="submitted">Form submitted</p>}
      </form>
    </FormProvider>
  );
}

describe('Form integration', () => {
  it('renders form with fields and submit button', () => {
    const { getByText, getByRole } = render(<FormWithValidation />);
    expect(getByText('Name')).toBeVisible();
    expect(getByText('Email')).toBeVisible();
    expect(getByRole('button', { name: /submit/i })).toBeVisible();
  });

  it('shows validation errors on empty submit', async () => {
    const { getByRole, findByText } = render(<FormWithValidation />);

    await userEvent.click(getByRole('button', { name: /submit/i }));

    expect(await findByText('Name is required')).toBeVisible();
    expect(await findByText('Email is required')).toBeVisible();
  });

  it('submits after filling required fields', async () => {
    const { getByRole, getByPlaceholderText, findByTestId } = render(<FormWithValidation />);

    await userEvent.type(getByPlaceholderText('Enter name'), 'John');
    await userEvent.type(getByPlaceholderText('Enter email'), 'john@test.com');
    await userEvent.click(getByRole('button', { name: /submit/i }));

    expect(await findByTestId('submitted')).toHaveTextContent('Form submitted');
  });
});

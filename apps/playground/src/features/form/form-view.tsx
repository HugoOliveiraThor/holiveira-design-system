'use client';

import { DatePicker, Field, Form, Submit, useForm, zodResolver } from '@ho-dev/forms';
import { formatDate } from '@ho-dev/i18n';
import { Button, InputGroup } from '@ho-dev/primitives';
import { Card, CardTitle } from '@ho-dev/ui';

import { useState } from 'react';
import { z } from 'zod';

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  startDate: z.custom<Date | null>((value) => value instanceof Date, 'Start date is required'),
});

type FormValues = z.infer<typeof formSchema>;

const inputClassName =
  'border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 text-dark dark:text-white placeholder:text-dark-6 w-full rounded-lg border-[1.5px] bg-transparent px-5 py-3 transition outline-none';

export function FormView() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: '', email: '', startDate: null },
  });

  const onSubmit = (values: FormValues) => {
    setSubmitted(values);
  };

  const onReset = () => {
    reset();
    setStartDate(null);
    setSubmitted(null);
  };

  return (
    <Card className="max-w-2xl">
      <CardTitle as="h2">Project intake</CardTitle>

      <Form className="mt-4 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Field label="Full name" error={errors.fullName?.message}>
          <input {...register('fullName')} className={inputClassName} placeholder="Ada Lovelace" />
        </Field>

        <InputGroup
          label="Email"
          type="email"
          placeholder="ada@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <DatePicker
          label="Start date"
          value={startDate ?? ''}
          error={errors.startDate?.message}
          onChange={(date) => {
            setStartDate(date);
            setValue('startDate', date, { shouldValidate: true });
          }}
        />

        <div className="flex items-center gap-3">
          <Submit>Submit request</Submit>
          <Button variant="outline" onClick={onReset}>
            Reset
          </Button>
        </div>
      </Form>

      {submitted && (
        <section
          role="status"
          className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20"
        >
          <h3 className="text-dark text-base font-semibold dark:text-white">Request submitted</h3>
          <dl className="mt-3 space-y-1 text-sm">
            <div className="flex gap-2">
              <dt className="font-medium">Full name:</dt>
              <dd>{submitted.fullName}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium">Email:</dt>
              <dd>{submitted.email}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium">Start date:</dt>
              <dd>{submitted.startDate ? formatDate(submitted.startDate) : '—'}</dd>
            </div>
          </dl>
        </section>
      )}
    </Card>
  );
}

FormView.displayName = 'FormView';

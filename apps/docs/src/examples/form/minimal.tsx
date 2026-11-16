'use client';

import { Field, Form } from '@ho-dev/forms';
import { Button } from '@ho-dev/primitives';

import { useState } from 'react';

export function FormMinimal() {
  const [sent, setSent] = useState(false);

  return (
    <Form
      onSubmit={() => {
        setSent(true);
      }}
    >
      <Field label="Email address">
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none"
        />
      </Field>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit">Subscribe</Button>
        {sent && (
          <p role="status" className="text-dark-4 dark:text-dark-6 text-sm">
            Thanks — check your inbox.
          </p>
        )}
      </div>
    </Form>
  );
}

import { Field } from '@ho-dev/forms';

export function FieldRealistic() {
  return (
    <div className="grid gap-4">
      <Field label="Company name" description="Shown on invoices and receipts.">
        <input
          type="text"
          placeholder="Acme Corp"
          className="border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none"
        />
      </Field>
      <Field
        label="Work email"
        description="We only use it for order updates."
        error="Enter an email address on the company domain."
      >
        <input
          type="email"
          placeholder="you@example.com"
          className="border-stroke dark:border-dark-3 dark:bg-dark-2 border-red focus:border-red w-full rounded-lg border px-5 py-3 outline-none"
        />
      </Field>
    </div>
  );
}

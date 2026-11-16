import { Field } from '@ho-dev/forms';

export function FieldMinimal() {
  return (
    <Field label="Email address">
      <input
        type="email"
        placeholder="you@example.com"
        className="border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border px-5 py-3 outline-none"
      />
    </Field>
  );
}

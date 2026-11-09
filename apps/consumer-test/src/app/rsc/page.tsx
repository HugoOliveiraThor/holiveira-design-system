import { Field } from '@ho-dev/forms';
import { Card } from '@ho-dev/ui';

export default function RSCPage() {
  return (
    <main>
      <h1>RSC Validation</h1>
      <Card>
        <h2>Server Component renders Card</h2>
        <p>This page is a React Server Component. No &quot;use client&quot; directive.</p>
      </Card>
      <Field
        label="Server Field"
        description="Field must be a client boundary when imported by an RSC"
      >
        <input />
      </Field>
    </main>
  );
}

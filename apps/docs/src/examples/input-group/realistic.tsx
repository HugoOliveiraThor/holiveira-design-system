import { InputGroup } from '@ho-dev/primitives';

export function InputGroupRealistic() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <InputGroup
        label="Search orders"
        placeholder="Order number or email"
        icon={<span aria-hidden="true">⌕</span>}
        iconPosition="left"
      />
      <InputGroup
        label="Work email"
        type="email"
        placeholder="you@example.com"
        required
        error="Enter an email address on the company domain."
      />
    </div>
  );
}

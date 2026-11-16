import { Field, Form, Submit } from '@ho-dev/forms';

/** Field owns the label, the description, the error message and their ARIA links. */
export function NewsletterForm() {
  return (
    <Form
      onSubmit={(event) => {
        const data = new FormData(event.currentTarget);
        console.log(Object.fromEntries(data.entries()));
      }}
    >
      <Field label="Email" description="We only use it to send the newsletter.">
        <input type="email" name="email" autoComplete="email" required />
      </Field>
      <Submit>Subscribe</Submit>
    </Form>
  );
}

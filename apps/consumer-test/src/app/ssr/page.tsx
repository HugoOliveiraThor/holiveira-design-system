import { Button } from '@ho-dev/primitives';

export default function SSRPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>SSR Validation</h1>
      <p>This page is server-rendered with a Button component.</p>
      <Button label="Server Button" />
    </main>
  );
}

import { Card } from '@ho-dev/ui';

export default function RSCPage() {
  return (
    <main>
      <h1>RSC Validation</h1>
      <Card>
        <h2>Server Component renders Card</h2>
        <p>This page is a React Server Component. No &quot;use client&quot; directive.</p>
      </Card>
    </main>
  );
}

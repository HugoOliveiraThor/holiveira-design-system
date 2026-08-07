import { Alert, Button, Switch } from '@ho-dev/primitives';
import { Card } from '@ho-dev/ui';

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Holiveira with Next.js</h1>
      <p>Reference application for the @ho-dev design system.</p>

      <Card>
        <Button label="Primary" />
        <Button label="Outline" variant="outlinePrimary" />
      </Card>

      <Alert
        variant="success"
        title="Holiveira"
        description="A composable, engineering-first design system."
      />

      <Switch defaultChecked />
    </main>
  );
}

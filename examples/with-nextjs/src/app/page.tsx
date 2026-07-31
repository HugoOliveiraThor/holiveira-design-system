import { Alert, Button, Switch } from '@holiveira/primitives';
import { Card } from '@holiveira/ui';

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Holiveira with Next.js</h1>
      <p>Reference application for the @holiveira design system.</p>

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

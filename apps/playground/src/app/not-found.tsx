import { Card } from '@ho-dev/ui';

export default function NotFound() {
  return (
    <main className="p-6">
      <Card>
        <h1 className="text-dark text-xl font-semibold dark:text-white">Page not found</h1>
        <p className="mt-2 text-sm">This playground route does not exist.</p>
        <a
          className="text-primary mt-4 inline-block text-sm font-medium"
          href="/holiveira-design-system/playground/"
        >
          Back to the dashboard
        </a>
      </Card>
    </main>
  );
}

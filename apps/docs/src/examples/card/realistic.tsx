import { Card } from '@ho-dev/ui';

const metrics = [
  { label: 'Open orders', value: '128', hint: '+12 this week' },
  { label: 'Revenue', value: '$48.2k', hint: '+8.4% month over month' },
  { label: 'Refund rate', value: '1.2%', hint: 'Within the target' },
];

export function CardRealistic() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.label} variant="bordered">
          <p className="text-dark-4 dark:text-dark-6 text-sm">{metric.label}</p>
          <p className="text-dark mt-1 text-2xl font-semibold dark:text-white">{metric.value}</p>
          <p className="text-dark-4 dark:text-dark-6 mt-1 text-xs">{metric.hint}</p>
        </Card>
      ))}
    </div>
  );
}

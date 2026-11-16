import { Badge } from '@ho-dev/primitives';

const statuses = [
  { label: 'Paid', variant: 'success' as const, fill: 'solid' as const },
  { label: 'Pending', variant: 'warning' as const, fill: 'light' as const },
  { label: 'Refunded', variant: 'info' as const, fill: 'light' as const },
  { label: 'Failed', variant: 'error' as const, fill: 'solid' as const },
];

export function BadgeRealistic() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {statuses.map((status) => (
        <Badge key={status.label} variant={status.variant} fill={status.fill}>
          {status.label}
        </Badge>
      ))}
    </div>
  );
}

import { PageHeader } from '@ho-dev/ui';

export function PageHeaderRealistic() {
  return (
    <PageHeader
      title="Open orders"
      breadcrumb={[
        { label: 'Dashboard', href: '/' },
        { label: 'Orders', href: '/orders' },
        { label: 'Open orders' },
      ]}
    />
  );
}

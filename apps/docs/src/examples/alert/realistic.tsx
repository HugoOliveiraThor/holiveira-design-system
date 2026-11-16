import { Alert } from '@ho-dev/primitives';

export function AlertRealistic() {
  return (
    <div className="space-y-4">
      <Alert
        variant="error"
        title="Payment failed"
        description="The card ending in 4242 was declined by the issuer. Retry with another payment method."
        link={{ label: 'Update payment method', href: '#payment-methods' }}
      />
      <Alert
        variant="success"
        title="Import finished"
        description="1,284 rows were imported and 6 were skipped because the email was missing."
      />
    </div>
  );
}

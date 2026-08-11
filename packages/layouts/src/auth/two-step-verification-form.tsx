'use client';

import { Button, OTPInput } from '@ho-dev/primitives';
import { cn } from '@ho-dev/utils';

import { useState } from 'react';

type TwoStepVerificationFormProps = {
  onSubmit: (code: string) => void;
  submitting?: boolean;
  error?: string;
  resendHref?: string;
  className?: string;
};

function TwoStepVerificationForm({
  onSubmit,
  submitting,
  error,
  resendHref = '/',
  className,
}: TwoStepVerificationFormProps) {
  const [code, setCode] = useState('');

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-5 sm:mb-8">
        <h1 className="mb-2 text-[36px] leading-[44px] font-semibold text-gray-800 dark:text-white/90">
          Two Step Verification
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          A verification code has been sent to your mobile. Please enter it in the field below.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (code) onSubmit(code);
        }}
      >
        <div className="space-y-5">
          <div>
            <p className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Type your 6 digits security code
            </p>
            <OTPInput onChange={setCode} onComplete={onSubmit} />
          </div>

          {error && <p className="text-error-500 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full"
            size="sm"
            aria-disabled={submitting || undefined}
          >
            {submitting ? 'Verifying…' : 'Verify My Account'}
          </Button>
        </div>
      </form>

      <p className="mt-5 text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400">
        Didn&apos;t get the code?{' '}
        <a href={resendHref} className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
          Resend
        </a>
      </p>
    </div>
  );
}

TwoStepVerificationForm.displayName = 'TwoStepVerificationForm';

export { TwoStepVerificationForm, type TwoStepVerificationFormProps };

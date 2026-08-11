'use client';

import { Button, InputGroup } from '@ho-dev/primitives';
import { cn } from '@ho-dev/utils';

import { type FormEvent } from 'react';

type PasswordResetFormProps = {
  onSubmit: (values: { email: string }) => void;
  submitting?: boolean;
  error?: string;
  signinHref?: string;
  className?: string;
};

function PasswordResetForm({
  onSubmit,
  submitting,
  error,
  signinHref = '/signin',
  className,
}: PasswordResetFormProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    onSubmit({
      email: String(form.get('email') ?? ''),
    });
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-5 sm:mb-8">
        <h1 className="mb-2 text-[36px] leading-[44px] font-semibold text-gray-800 dark:text-white/90">
          Forgot Your Password?
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter the email address linked to your account, and we&apos;ll send you a link to reset
          your password.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-5">
          <InputGroup
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />

          {error && <p className="text-error-500 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full"
            size="sm"
            aria-disabled={submitting || undefined}
          >
            {submitting ? 'Sending…' : 'Send Reset Link'}
          </Button>
        </div>
      </form>

      <p className="mt-5 text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400">
        Wait, I remember my password...{' '}
        <a href={signinHref} className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
          Click here
        </a>
      </p>
    </div>
  );
}

PasswordResetForm.displayName = 'PasswordResetForm';

export { PasswordResetForm, type PasswordResetFormProps };

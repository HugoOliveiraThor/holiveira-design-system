'use client';

import { EyeCloseIcon, EyeIcon } from '@ho-dev/icons';
import { Button, Checkbox, InputGroup } from '@ho-dev/primitives';
import { cn } from '@ho-dev/utils';

import { useState, type FormEvent } from 'react';

import type { SocialProvider } from './sign-in-form';

type SignUpFormProps = {
  onSubmit: (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    termsAgreed: boolean;
  }) => void;
  submitting?: boolean;
  error?: string;
  socialProviders?: SocialProvider[];
  termsHref?: string;
  privacyHref?: string;
  signinHref?: string;
  className?: string;
};

function SignUpForm({
  onSubmit,
  submitting,
  error,
  socialProviders,
  termsHref = '/terms',
  privacyHref = '/privacy',
  signinHref = '/signin',
  className,
}: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    onSubmit({
      firstName: String(form.get('firstName') ?? ''),
      lastName: String(form.get('lastName') ?? ''),
      email: String(form.get('email') ?? ''),
      password: String(form.get('password') ?? ''),
      termsAgreed,
    });
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-5 sm:mb-8">
        <h1 className="mb-2 text-[36px] leading-[44px] font-semibold text-gray-800 dark:text-white/90">
          Sign Up
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your email and password to sign up!
        </p>
      </div>

      {socialProviders && socialProviders.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
            {socialProviders.map((p) => (
              <button
                key={p.provider}
                type="button"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-gray-100 px-7 py-3 text-sm font-normal text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
              >
                {p.icon}
                {p.label}
              </button>
            ))}
          </div>
          <div className="relative py-3 sm:py-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white p-2 text-gray-400 sm:px-5 sm:py-2 dark:bg-gray-900">
                Or
              </span>
            </div>
          </div>
        </>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <InputGroup
              label="First Name"
              name="firstName"
              placeholder="Enter your first name"
              required
            />
            <InputGroup
              label="Last Name"
              name="lastName"
              placeholder="Enter your last name"
              required
            />
          </div>
          <InputGroup
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <div className="relative">
            <InputGroup
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute top-[42px] right-4 z-30 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {showPassword ? <EyeIcon size={20} /> : <EyeCloseIcon size={20} />}
            </button>
          </div>

          <Checkbox
            label={
              <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                By creating an account means you agree to the{' '}
                <a
                  href={termsHref}
                  className="text-gray-800 dark:text-white/90"
                  onClick={(e) => e.preventDefault()}
                >
                  Terms and Conditions,
                </a>{' '}
                and our{' '}
                <a
                  href={privacyHref}
                  className="text-gray-800 dark:text-white"
                  onClick={(e) => e.preventDefault()}
                >
                  Privacy Policy
                </a>
              </p>
            }
            checked={termsAgreed}
            onChange={(e) => setTermsAgreed(e.target.checked)}
          />

          {error && <p className="text-error-500 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full"
            size="sm"
            aria-disabled={submitting || undefined}
          >
            {submitting ? 'Signing up…' : 'Sign Up'}
          </Button>
        </div>
      </form>

      <p className="mt-5 text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400">
        Already have an account?{' '}
        <a href={signinHref} className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
          Sign In
        </a>
      </p>
    </div>
  );
}

SignUpForm.displayName = 'SignUpForm';

export { SignUpForm, type SignUpFormProps };

'use client';

import { Button, InputGroup } from '@ho-dev/primitives';
import { Card, CardTitle } from '@ho-dev/ui';

import { useState } from 'react';

export const DEMO_EMAIL = 'demo@ho.dev';
export const DEMO_PASSWORD = 'demo1234';
export const DEMO_USER_NAME = 'Demo User';

export function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setError(null);
      setUserName(DEMO_USER_NAME);
      return;
    }

    setError('Invalid demo credentials');
  };

  if (userName) {
    return (
      <Card className="max-w-md">
        <CardTitle as="h2">Signed in</CardTitle>
        <p className="mt-2 text-sm">
          Welcome back, <strong>{userName}</strong>.
        </p>
        <Button className="mt-4" variant="outline" onClick={() => setUserName(null)}>
          Log out
        </Button>
      </Card>
    );
  }

  return (
    <Card className="max-w-md">
      <CardTitle as="h2">Sign in</CardTitle>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Demo screen. No backend and no protected routes.
      </p>
      <p className="text-body-xs text-dark-5 dark:text-dark-6 mt-3">
        Demo credentials: {DEMO_EMAIL} / {DEMO_PASSWORD}
      </p>

      <form className="mt-4 space-y-4" onSubmit={onSubmit} noValidate>
        <InputGroup
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <InputGroup
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {error && (
          <p role="alert" className="text-red text-sm">
            {error}
          </p>
        )}

        <Button type="submit">Sign in</Button>
      </form>
    </Card>
  );
}

LoginView.displayName = 'LoginView';

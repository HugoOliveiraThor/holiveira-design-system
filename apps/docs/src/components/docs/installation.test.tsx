import '@testing-library/jest-dom/vitest';

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import type { PackageRecord } from '../../lib/docs-metadata/types';

import { Installation } from './installation';

afterEach(cleanup);

const BASE: PackageRecord = {
  name: '@ho-dev/primitives',
  version: '0.2.0',
  description: 'Primitive components.',
  private: false,
  installState: 'pre-release',
  exports: ['Button'],
  category: 'Components',
  peers: { react: '^19.0.0', typescript: '^5.0.0' },
};

describe('installation section', () => {
  it('shows the package name, version and install state', () => {
    render(<Installation record={BASE} />);
    expect(screen.getByText('@ho-dev/primitives')).toBeInTheDocument();
    expect(screen.getByText(/v0\.2\.0/)).toBeInTheDocument();
    expect(screen.getByText(/v0\.2\.0 · pre-release/)).toBeInTheDocument();
  });

  it('lists every peer dependency with its range', () => {
    render(<Installation record={BASE} />);
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('^19.0.0')).toBeInTheDocument();
    expect(screen.getByText('typescript')).toBeInTheDocument();
    expect(screen.getByText('^5.0.0')).toBeInTheDocument();
  });

  it('hides the install command while the package is pre-release', () => {
    render(<Installation record={BASE} />);
    expect(screen.queryByText(/pnpm add/)).not.toBeInTheDocument();
    expect(screen.getByText(/"@ho-dev\/primitives": "workspace:\*"/)).toBeInTheDocument();
    expect(screen.getByText(/not published to npm yet/)).toBeInTheDocument();
  });

  it('shows the install command for a published package', () => {
    render(<Installation record={{ ...BASE, version: '1.0.0', installState: 'published' }} />);
    expect(screen.getByText('pnpm add @ho-dev/primitives')).toBeInTheDocument();
    expect(screen.queryByText(/workspace:\*/)).not.toBeInTheDocument();
  });

  it('states when a package has no peer dependencies', () => {
    render(<Installation record={{ ...BASE, peers: {} }} />);
    expect(screen.getByText('No peer dependencies.')).toBeInTheDocument();
  });
});

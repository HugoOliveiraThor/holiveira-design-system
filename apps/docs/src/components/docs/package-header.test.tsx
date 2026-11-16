import '@testing-library/jest-dom/vitest';

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { docsSite } from '../../../site.config';
import type { PackageRecord } from '../../lib/docs-metadata/types';

import { PackageHeader } from './package-header';

afterEach(cleanup);

const RECORD: PackageRecord = {
  name: '@ho-dev/primitives',
  version: '0.2.0',
  description: 'Primitive components.',
  private: false,
  installState: 'pre-release',
  exports: [{ name: 'Button', kind: 'component' }],
  componentExports: [],
  category: 'Components',
  peers: {},
};

describe('package header', () => {
  it('renders exactly one h1 carrying the package name', () => {
    render(<PackageHeader record={RECORD} />);
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('@ho-dev/primitives');
  });

  it('links the readme, contract and storybook', () => {
    render(<PackageHeader record={RECORD} />);
    expect(screen.getByRole('link', { name: 'README' })).toHaveAttribute(
      'href',
      `${docsSite.repositoryUrl}/blob/main/packages/primitives/README.md`,
    );
    expect(screen.getByRole('link', { name: 'Contract' })).toHaveAttribute(
      'href',
      `${docsSite.repositoryUrl}/blob/main/docs/architecture/contracts/primitives.md`,
    );
    expect(screen.getByRole('link', { name: 'Storybook' })).toHaveAttribute(
      'href',
      docsSite.storybookUrl,
    );
  });

  it('links external documents with absolute urls, not docs routes', () => {
    render(<PackageHeader record={RECORD} />);
    for (const name of ['README', 'Contract', 'Storybook']) {
      const href = screen.getByRole('link', { name }).getAttribute('href') ?? '';
      expect(href, name).toMatch(/^https:\/\//);
      expect(href, name).not.toContain('/holiveira-design-system/docs/');
    }
  });

  it('shows the version, the install state and the category', () => {
    render(<PackageHeader record={RECORD} />);
    expect(screen.getByText(/v0\.2\.0 · pre-release/)).toBeInTheDocument();
    expect(screen.getByText('Components')).toBeInTheDocument();
    expect(screen.getByText('Primitive components.')).toBeInTheDocument();
  });
});

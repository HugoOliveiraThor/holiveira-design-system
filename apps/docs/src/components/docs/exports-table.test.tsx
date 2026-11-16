import '@testing-library/jest-dom/vitest';

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import type { PackageRecord } from '../../lib/docs-metadata/types';

import { ExportsTable } from './exports-table';

afterEach(cleanup);

const BASE: PackageRecord = {
  name: '@ho-dev/primitives',
  version: '0.2.0',
  description: '',
  private: false,
  installState: 'pre-release',
  exports: [
    { name: 'Button', kind: 'component' },
    { name: 'useButton', kind: 'hook' },
    { name: 'getPageItems', kind: 'function' },
    { name: 'PAGE_SIZE', kind: 'constant' },
    { name: 'ButtonProps', kind: 'type' },
  ],
  componentExports: [],
  category: 'Components',
  peers: {},
};

describe('package exports table', () => {
  it('groups exports by their derived kind', () => {
    render(<ExportsTable record={BASE} />);
    expect(screen.getAllByRole('heading', { level: 3 }).map((node) => node.textContent)).toEqual([
      'Components',
      'Hooks',
      'Functions',
      'Constants',
      'Types',
    ]);
    for (const name of ['Button', 'useButton', 'getPageItems', 'PAGE_SIZE', 'ButtonProps']) {
      expect(screen.getByText(name), name).toBeInTheDocument();
    }
  });

  it('omits a kind with no export', () => {
    render(
      <ExportsTable
        record={{
          ...BASE,
          exports: [{ name: 'Button', kind: 'component' }],
        }}
      />,
    );
    expect(screen.getByRole('heading', { level: 3, name: 'Components' })).toBeInTheDocument();
    for (const label of ['Hooks', 'Functions', 'Constants', 'Types']) {
      expect(
        screen.queryByRole('heading', { level: 3, name: label }),
        label,
      ).not.toBeInTheDocument();
    }
  });

  it('renders no components group for a package with no component exports', () => {
    render(
      <ExportsTable
        record={{
          ...BASE,
          exports: [
            { name: 'PAGE_SIZE', kind: 'constant' },
            { name: 'ConfigSchema', kind: 'type' },
          ],
          componentExports: [],
        }}
      />,
    );
    expect(screen.queryByRole('heading', { level: 3, name: 'Components' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Constants' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Types' })).toBeInTheDocument();
  });

  it('states when a package has no public exports', () => {
    render(<ExportsTable record={{ ...BASE, exports: [], componentExports: [] }} />);
    expect(screen.getByText('This package has no public exports.')).toBeInTheDocument();
    expect(screen.queryAllByRole('heading', { level: 3 })).toEqual([]);
  });
});

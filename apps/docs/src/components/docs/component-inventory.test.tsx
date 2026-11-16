import '@testing-library/jest-dom/vitest';

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { docsSite } from '../../../site.config';
import type { PackageRecord } from '../../lib/docs-metadata/types';

import { ComponentInventory } from './component-inventory';

afterEach(cleanup);

const RECORD: PackageRecord = {
  name: '@ho-dev/primitives',
  version: '0.2.0',
  description: '',
  private: false,
  installState: 'pre-release',
  exports: [
    { name: 'Avatar', kind: 'component' },
    { name: 'AvatarGroup', kind: 'component' },
  ],
  componentExports: [
    {
      id: 'avatar',
      exportName: 'Avatar',
      sourceFile: 'packages/primitives/src/avatar.tsx',
      story: { title: 'Primitives/Avatar', id: 'primitives-avatar' },
    },
    {
      id: 'avatar-group',
      exportName: 'AvatarGroup',
      sourceFile: 'packages/primitives/src/avatar-group.tsx',
    },
  ],
  category: 'Components',
  peers: {},
};

describe('component inventory', () => {
  it('gives every component export an anchor', () => {
    const { container } = render(<ComponentInventory record={RECORD} />);
    const rows = container.querySelectorAll('li[id]');
    expect([...rows].map((row) => row.id)).toEqual(['avatar', 'avatar-group']);
    for (const component of RECORD.componentExports) {
      expect(document.getElementById(component.id), component.id).not.toBeNull();
    }
  });

  it('shows the export name and the source file of each row', () => {
    render(<ComponentInventory record={RECORD} />);
    expect(screen.getByText('Avatar')).toBeInTheDocument();
    expect(screen.getByText('packages/primitives/src/avatar.tsx')).toBeInTheDocument();
    expect(screen.getByText('AvatarGroup')).toBeInTheDocument();
    expect(screen.getByText('packages/primitives/src/avatar-group.tsx')).toBeInTheDocument();
  });

  it('links the story or the package fallback', () => {
    render(<ComponentInventory record={RECORD} />);
    expect(screen.getByRole('link', { name: 'Storybook story' })).toHaveAttribute(
      'href',
      `${docsSite.storybookUrl}?path=/docs/primitives-avatar--docs`,
    );
    expect(screen.getByRole('link', { name: 'Storybook (package root)' })).toHaveAttribute(
      'href',
      docsSite.storybookUrl,
    );
  });

  it('states when a package exports no component', () => {
    render(<ComponentInventory record={{ ...RECORD, componentExports: [] }} />);
    expect(screen.getByText('This package exports no components.')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toEqual([]);
  });
});

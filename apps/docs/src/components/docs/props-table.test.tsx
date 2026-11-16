import '@testing-library/jest-dom/vitest';

import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import type { PropRecord, VariantRecord } from '../../lib/docs-metadata/types';

import { PropsTable, VariantsTable } from './props-table';

afterEach(cleanup);

const PROPS: PropRecord[] = [
  {
    name: 'variant',
    type: 'string | undefined',
    required: false,
    default: 'primary',
    origin: 'component',
  },
  {
    name: 'label',
    type: 'string',
    required: true,
    default: null,
    origin: 'component',
  },
  {
    name: 'onClick',
    type: 'MouseEventHandler | undefined',
    required: false,
    default: null,
    origin: 'inherited',
  },
];

const VARIANTS: Record<string, VariantRecord> = {
  variant: { name: 'variant', values: ['primary', 'outline'], default: 'primary' },
  size: { name: 'size', values: ['sm', 'md'], default: null },
};

describe('props and variants tables', () => {
  it('lists component props with type and required flag', () => {
    render(<PropsTable props={PROPS} />);
    expect(screen.getByText('variant')).toBeInTheDocument();
    expect(screen.getByText('string | undefined')).toBeInTheDocument();
    expect(screen.getByText('label')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getAllByText('No').length).toBeGreaterThan(0);
  });

  it('renders a dash when the default is unknown', () => {
    render(<PropsTable props={PROPS} />);
    const labelRow = screen.getByText('label').closest('tr');
    expect(labelRow).not.toBeNull();
    expect(labelRow?.textContent).toContain('—');
    expect(labelRow?.textContent).not.toContain('primary');
  });

  it('lists the variants with their values and default', () => {
    render(<VariantsTable variants={VARIANTS} />);
    expect(screen.getByText('primary, outline')).toBeInTheDocument();
    expect(screen.getByText('sm, md')).toBeInTheDocument();
    expect(screen.getByText('primary')).toBeInTheDocument();
  });

  it('separates inherited native props in a closed disclosure', () => {
    render(<PropsTable props={PROPS} />);
    const disclosure = screen.getByText(/inherited native props/i).closest('details');
    expect(disclosure).not.toBeNull();
    expect(disclosure).not.toHaveAttribute('open');
    expect(screen.getByText('onClick')).toBeInTheDocument();
  });

  it('states when a component has no variants', () => {
    render(<VariantsTable variants={{}} />);
    expect(screen.getByText('This component exposes no variants.')).toBeInTheDocument();
  });
});

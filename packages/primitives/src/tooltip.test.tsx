import { cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import { render } from './test-utils';

import { Tooltip } from './index';

afterEach(cleanup);

function renderTooltip(props: Partial<React.ComponentProps<typeof Tooltip>> = {}) {
  return render(
    <Tooltip content="Tooltip text" {...props}>
      <button type="button">Trigger</button>
    </Tooltip>,
  );
}

describe('Tooltip', () => {
  it('is hidden by default', () => {
    const { getByRole } = renderTooltip();
    expect(getByRole('tooltip')).toHaveClass('invisible');
  });

  it('shows on hover', () => {
    const { getByRole, getByText } = renderTooltip();
    fireEvent.mouseEnter(getByText('Trigger'));
    expect(getByRole('tooltip')).not.toHaveClass('invisible');
  });

  it('hides on leave', () => {
    const { getByRole, getByText } = renderTooltip();
    fireEvent.mouseEnter(getByText('Trigger'));
    fireEvent.mouseLeave(getByText('Trigger'));
    expect(getByRole('tooltip')).toHaveClass('invisible');
  });

  it('renders role tooltip', () => {
    const { getByRole } = renderTooltip();
    expect(getByRole('tooltip')).toBeVisible();
  });

  it('sets aria-describedby on trigger', () => {
    const { getByRole, getByText } = renderTooltip();
    fireEvent.mouseEnter(getByText('Trigger'));
    const tooltip = getByRole('tooltip');
    expect(getByText('Trigger')).toHaveAttribute('aria-describedby', tooltip.id);
  });

  it('applies placement classes', () => {
    const { getByRole } = renderTooltip({ placement: 'right' });
    expect(getByRole('tooltip')).toHaveClass('left-full');
  });

  it('applies variant classes', () => {
    const { getByRole } = renderTooltip({ variant: 'dark' });
    expect(getByRole('tooltip')).toHaveClass('bg-gray-900');
  });

  it('renders arrow by default', () => {
    const { getByRole } = renderTooltip();
    expect(getByRole('tooltip').querySelector('span[aria-hidden="true"]')).not.toBeNull();
  });

  it('omits arrow when arrow false', () => {
    const { getByRole } = renderTooltip({ arrow: false });
    expect(getByRole('tooltip').querySelector('span[aria-hidden="true"]')).toBeNull();
  });
});

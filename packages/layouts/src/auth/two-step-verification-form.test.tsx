import { cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from '../test-utils';

import { TwoStepVerificationForm } from './two-step-verification-form';

afterEach(cleanup);

function getInputs(container: HTMLElement) {
  return Array.from(container.querySelectorAll('input')) as HTMLInputElement[];
}

describe('TwoStepVerificationForm', () => {
  it('renders title, label, inputs, and submit button', () => {
    const { getByRole, getByText, container } = render(
      <TwoStepVerificationForm onSubmit={() => {}} />,
    );
    expect(getByText(/two step verification/i)).toBeVisible();
    expect(getByText(/type your 6 digits security code/i)).toBeVisible();
    expect(getInputs(container)).toHaveLength(6);
    expect(getByRole('button', { name: /verify my account/i })).toBeVisible();
  });

  it('calls onSubmit with full code on auto-submit', () => {
    const onSubmit = vi.fn();
    const { container } = render(<TwoStepVerificationForm onSubmit={onSubmit} />);
    const inputs = getInputs(container);
    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.change(inputs[2], { target: { value: '3' } });
    fireEvent.change(inputs[3], { target: { value: '4' } });
    fireEvent.change(inputs[4], { target: { value: '5' } });
    fireEvent.change(inputs[5], { target: { value: '6' } });
    expect(onSubmit).toHaveBeenCalledWith('123456');
  });

  it('submits current code via button', () => {
    const onSubmit = vi.fn();
    const { container, getByRole } = render(<TwoStepVerificationForm onSubmit={onSubmit} />);
    const inputs = getInputs(container);
    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.click(getByRole('button', { name: /verify my account/i }));
    expect(onSubmit).toHaveBeenCalledWith('12');
  });

  it('disables submit when submitting', () => {
    const { getByRole } = render(<TwoStepVerificationForm onSubmit={() => {}} submitting />);
    expect(getByRole('button', { name: /verifying|verify my account/i })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  it('renders error message', () => {
    const { getByText } = render(
      <TwoStepVerificationForm onSubmit={() => {}} error="Invalid code" />,
    );
    expect(getByText('Invalid code')).toBeVisible();
  });

  it('renders resend link with custom href', () => {
    const { getByRole } = render(
      <TwoStepVerificationForm onSubmit={() => {}} resendHref="/resend" />,
    );
    expect(getByRole('link', { name: /resend/i })).toHaveAttribute('href', '/resend');
  });

  it('renders footer text', () => {
    const { getByText } = render(<TwoStepVerificationForm onSubmit={() => {}} />);
    expect(getByText(/didn't get the code/i)).toBeVisible();
  });
});

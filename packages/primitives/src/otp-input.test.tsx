import { cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { OTPInput } from './otp-input';
import { render } from './test-utils';


afterEach(cleanup);

function getInputs(container: HTMLElement) {
  return Array.from(container.querySelectorAll('input')) as HTMLInputElement[];
}

describe('OTPInput', () => {
  it('renders length inputs (default 6)', () => {
    const { container } = render(<OTPInput />);
    expect(getInputs(container)).toHaveLength(6);
  });

  it('renders the requested number of inputs', () => {
    const { container } = render(<OTPInput length={4} />);
    expect(getInputs(container)).toHaveLength(4);
  });

  it('moves focus to next input when typing', () => {
    const { container } = render(<OTPInput />);
    const inputs = getInputs(container);
    fireEvent.change(inputs[0], { target: { value: '1' } });
    expect(inputs[1]).toHaveFocus();
  });

  it('moves focus to previous input on backspace when empty', () => {
    const { container } = render(<OTPInput defaultValue="12" />);
    const inputs = getInputs(container);
    inputs[2].focus();
    fireEvent.keyDown(inputs[2], { key: 'Backspace' });
    expect(inputs[1]).toHaveFocus();
  });

  it('distributes pasted code across inputs', () => {
    const onChange = vi.fn();
    const { container } = render(<OTPInput onChange={onChange} />);
    const inputs = getInputs(container);
    fireEvent.paste(inputs[0], {
      clipboardData: { getData: () => '123456' },
    });
    expect(inputs.map((i) => i.value)).toEqual(['1', '2', '3', '4', '5', '6']);
    expect(onChange).toHaveBeenCalledWith('123456');
    expect(inputs[5]).toHaveFocus();
  });

  it('calls onComplete when the code is fully entered', () => {
    const onComplete = vi.fn();
    const { container } = render(<OTPInput onComplete={onComplete} />);
    const inputs = getInputs(container);
    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.change(inputs[2], { target: { value: '3' } });
    fireEvent.change(inputs[3], { target: { value: '4' } });
    fireEvent.change(inputs[4], { target: { value: '5' } });
    fireEvent.change(inputs[5], { target: { value: '6' } });
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith('123456');
  });

  it('does not call onComplete with incomplete code', () => {
    const onComplete = vi.fn();
    const { container } = render(<OTPInput onComplete={onComplete} />);
    const inputs = getInputs(container);
    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('disables all inputs', () => {
    const { container } = render(<OTPInput disabled />);
    const inputs = getInputs(container);
    for (const input of inputs) {
      expect(input).toBeDisabled();
    }
  });

  it('renders controlled value', () => {
    const { container } = render(<OTPInput value="123" />);
    const inputs = getInputs(container);
    expect(inputs.map((i) => i.value)).toEqual(['1', '2', '3', '', '', '']);
  });
});

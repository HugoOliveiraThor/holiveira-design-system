import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

const flatpickrConfigs = vi.hoisted(
  () => [] as { element: HTMLInputElement; config: { onChange?: (dates: Date[]) => void } }[],
);

vi.mock('flatpickr', () => ({
  default: (element: HTMLInputElement, config: { onChange?: (dates: Date[]) => void }) => {
    flatpickrConfigs.push({ element, config });
    return {
      destroy: () => {},
      setDate: () => {},
      clear: () => {
        element.value = '';
      },
    };
  },
}));

import { FormView } from './form-view';

afterEach(() => {
  cleanup();
  flatpickrConfigs.length = 0;
});

function pickDate(date: Date) {
  const input = screen.getByLabelText('Start date') as HTMLInputElement;
  // flatpickr writes the formatted value into the input before firing onChange.
  input.value = 'Nov 20, 2026';

  act(() => {
    flatpickrConfigs[0]?.config.onChange?.([date]);
  });
}

describe('FormView', () => {
  it('blocks an empty required field with a field error', async () => {
    render(<FormView />);

    fireEvent.click(screen.getByRole('button', { name: 'Submit request' }));

    expect(await screen.findByText('Full name is required')).toBeVisible();
    expect(screen.getByText('Email is required')).toBeVisible();
    expect(screen.getByText('Start date is required')).toBeVisible();
    expect(screen.queryByText('Request submitted')).not.toBeInTheDocument();
  });

  it('shows submitted values after a valid submit', async () => {
    render(<FormView />);

    fireEvent.change(screen.getByPlaceholderText('Ada Lovelace'), {
      target: { value: 'Ada Lovelace' },
    });
    fireEvent.change(screen.getByPlaceholderText('ada@example.com'), {
      target: { value: 'ada@example.com' },
    });
    pickDate(new Date(2026, 10, 20));
    fireEvent.click(screen.getByRole('button', { name: 'Submit request' }));

    const summary = await screen.findByRole('status');
    expect(summary).toHaveTextContent('Ada Lovelace');
    expect(summary).toHaveTextContent('ada@example.com');
    expect(summary).toHaveTextContent('11/20/2026');
  });

  it('clears fields and errors on reset', async () => {
    render(<FormView />);

    fireEvent.click(screen.getByRole('button', { name: 'Submit request' }));
    expect(await screen.findByText('Full name is required')).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.queryByText('Full name is required')).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ada Lovelace')).toHaveValue('');
    expect(screen.getByLabelText('Start date')).toHaveValue('');

    fireEvent.change(screen.getByPlaceholderText('Ada Lovelace'), {
      target: { value: 'Grace Hopper' },
    });
    fireEvent.change(screen.getByPlaceholderText('ada@example.com'), {
      target: { value: 'grace@example.com' },
    });
    pickDate(new Date(2026, 10, 21));
    fireEvent.click(screen.getByRole('button', { name: 'Submit request' }));
    expect(await screen.findByRole('status')).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ada Lovelace')).toHaveValue('');
    expect(screen.getByPlaceholderText('ada@example.com')).toHaveValue('');
    expect(screen.getByLabelText('Start date')).toHaveValue('');
  });
});

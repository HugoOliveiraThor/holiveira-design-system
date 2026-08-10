import { cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from './test-utils';

import { Modal, ModalAlert, ModalCloseButton } from './index';

afterEach(cleanup);

describe('Modal', () => {
  it('does not render when closed', () => {
    const { queryByRole } = render(
      <Modal isOpen={false} setIsOpen={() => {}}>
        <p>Content</p>
      </Modal>,
    );
    expect(queryByRole('dialog')).toBeNull();
  });

  it('renders dialog with children when open', () => {
    const { getByRole, getByText } = render(
      <Modal isOpen={true} setIsOpen={() => {}}>
        <p>Modal content</p>
      </Modal>,
    );
    expect(getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    expect(getByText('Modal content')).toBeVisible();
  });

  it('applies size class to panel', () => {
    const { getByRole } = render(
      <Modal isOpen={true} setIsOpen={() => {}} size="sm">
        <p>Content</p>
      </Modal>,
    );
    const panel = getByRole('dialog').lastElementChild as HTMLElement;
    expect(panel).toHaveClass('max-w-[400px]');
  });

  it('applies fullScreen classes', () => {
    const { getByRole } = render(
      <Modal isOpen={true} setIsOpen={() => {}} fullScreen>
        <p>Content</p>
      </Modal>,
    );
    expect(getByRole('dialog').className).toContain('h-screen');
    expect(getByRole('dialog').className).toContain('w-full');
  });

  it('closes on backdrop click', () => {
    const setIsOpen = vi.fn();
    const { getByRole } = render(
      <Modal isOpen={true} setIsOpen={setIsOpen}>
        <p>Content</p>
      </Modal>,
    );
    fireEvent.click(getByRole('dialog'));
    expect(setIsOpen).toHaveBeenCalledWith(false);
  });

  it('does not close on panel click', () => {
    const setIsOpen = vi.fn();
    const { getByText } = render(
      <Modal isOpen={true} setIsOpen={setIsOpen}>
        <p>Content</p>
      </Modal>,
    );
    fireEvent.click(getByText('Content'));
    expect(setIsOpen).not.toHaveBeenCalled();
  });
});

describe('ModalCloseButton', () => {
  it('renders a close button with aria-label', () => {
    const { getByRole } = render(<ModalCloseButton />);
    expect(getByRole('button', { name: /close modal/i })).toBeVisible();
  });
});

describe('ModalAlert', () => {
  it.each([
    ['success', 'text-success-600'],
    ['info', 'text-blue-light-500'],
    ['warning', 'text-warning-600'],
    ['danger', 'text-error-600'],
  ] as const)('renders %s variant', (variant, expectedClass) => {
    const { getByText, container } = render(
      <ModalAlert variant={variant} title="Title" description="Description" />,
    );
    expect(getByText('Title')).toBeVisible();
    expect(getByText('Description')).toBeVisible();
    expect(container.querySelector('span[class*="absolute"]')).toHaveClass(expectedClass);
  });

  it('renders action children', () => {
    const { getByRole } = render(
      <ModalAlert variant="success" title="Title" description="Description">
        <button type="button">Okay, Got It</button>
      </ModalAlert>,
    );
    expect(getByRole('button', { name: 'Okay, Got It' })).toBeVisible();
  });
});

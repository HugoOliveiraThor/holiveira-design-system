'use client';

import { cn } from '@ho-dev/utils';

import { cloneElement, isValidElement, useEffect, useId, useRef } from 'react';
import type { ReactElement, ReactNode } from 'react';

import { Description } from './description';
import { ErrorMessage } from './error-message';
import { Label } from './label';

interface FieldProps {
  label?: string;
  description?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

const Field = ({ label, description, error, children, className }: FieldProps) => {
  const descriptionId = useId();
  const errorId = useId();
  const generatedId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const prevError = useRef(error);

  useEffect(() => {
    if (error && !prevError.current && containerRef.current) {
      const focusable = containerRef.current.querySelector<HTMLElement>(
        'input, textarea, select, button, [tabindex]:not([tabindex="-1"])',
      );
      focusable?.focus();
    }
    prevError.current = error;
  }, [error]);

  const describedBy = [description && descriptionId, error && errorId].filter(Boolean).join(' ');

  const isElement = isValidElement(children);
  const childProps = isElement ? (children.props as Record<string, unknown>) : {};
  const controlId = (childProps.id as string | undefined) ?? generatedId;

  // Associate the label, description and error with the actual control by
  // injecting the ARIA/id props into the child element. Without this, the
  // aria-describedby would only live on a wrapper and screen readers would not
  // connect the messages to the field.
  const control = isElement
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        id: controlId,
        'aria-describedby': describedBy || undefined,
        'aria-invalid': error ? true : undefined,
      })
    : children;

  return (
    <div ref={containerRef} className={cn('flex flex-col gap-1.5', className)}>
      {label && <Label htmlFor={controlId}>{label}</Label>}

      {control}

      {description && <Description id={descriptionId}>{description}</Description>}

      {error && <ErrorMessage id={errorId} error={error} />}
    </div>
  );
};
Field.displayName = 'Field';

export { Field, type FieldProps };

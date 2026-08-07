import { cn } from '@ho-dev/utils';

import type { ReactNode } from 'react';
import { useEffect, useId, useRef } from 'react';

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

  const describedBy = [description && `${descriptionId}`, error && `${errorId}`]
    .filter(Boolean)
    .join(' ');

  const childrenWithAria = 'type' in (children as object) || describedBy ? children : children;

  return (
    <div ref={containerRef} className={cn('flex flex-col gap-1.5', className)}>
      {label && <Label>{label}</Label>}

      {describedBy ? (
        <span aria-describedby={describedBy || undefined} className="contents">
          {childrenWithAria}
        </span>
      ) : (
        children
      )}

      {description && <Description id={descriptionId}>{description}</Description>}

      {error && <ErrorMessage id={errorId} error={error} />}
    </div>
  );
};
Field.displayName = 'Field';

export { Field, type FieldProps };

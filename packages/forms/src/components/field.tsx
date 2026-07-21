import type { ReactNode } from 'react';
import { cn } from '@holiveira/utils';
import { useId } from 'react';
import { Label } from './label';
import { Description } from './description';
import { ErrorMessage } from './error-message';

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

  const describedBy = [description && `${descriptionId}`, error && `${errorId}`]
    .filter(Boolean)
    .join(' ');

  const childrenWithAria = 'type' in (children as object) || describedBy ? children : children;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
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

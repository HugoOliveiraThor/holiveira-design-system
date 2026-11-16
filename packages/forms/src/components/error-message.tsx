import { cn } from '@ho-dev/utils';

interface ErrorMessageProps {
  error?: string;
  id?: string;
  className?: string;
}

const ErrorMessage = ({ error, id, className }: ErrorMessageProps) => {
  if (!error) return null;

  return (
    <p
      id={id}
      role="alert"
      aria-live="polite"
      className={cn('text-sm text-red-700 dark:text-red-400', className)}
    >
      {error}
    </p>
  );
};
ErrorMessage.displayName = 'ErrorMessage';

export { ErrorMessage, type ErrorMessageProps };

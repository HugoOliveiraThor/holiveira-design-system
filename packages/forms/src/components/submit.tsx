import { Button } from '@holiveira/primitives';

import { forwardRef, type ComponentProps } from 'react';

interface SubmitProps extends ComponentProps<typeof Button> {}

const Submit = forwardRef<HTMLButtonElement, SubmitProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button ref={ref} type="submit" variant="primary" size="md" className={className} {...props}>
        {children}
      </Button>
    );
  },
);
Submit.displayName = 'Submit';

export { Submit, type SubmitProps };

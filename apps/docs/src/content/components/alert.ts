import type { ComponentDoc } from '../../lib/docs-metadata/types';

export const alertDoc: ComponentDoc = {
  id: 'alert',
  summary: 'Communicates a status or a problem that the reader must notice.',
  whenToUse:
    'Use it for a result the reader has to see: a failed payment, a successful import, a warning about an expiring token. Choose the variant that matches the consequence, not the colour that looks best.',
  whenNotToUse:
    'Do not use it for validation errors next to a field, for information that can wait, or for promotional copy. A page with several alerts competes with itself; keep one per view when you can.',
  accessibility: {
    keyboard:
      'The alert itself has no keyboard interaction. If it carries a link, that link joins the tab order after the description.',
    aria: 'Renders role="alert", so assistive technology announces it when it appears. Do not render it for a condition that was already on the page before the reader arrived, or the announcement repeats on every visit.',
    focus:
      'Focus does not move to an alert. When the alert reports a failed submission, move focus to the field that needs attention instead of forcing the reader through the message.',
  },
  related: ['badge', 'field', 'form'],
};

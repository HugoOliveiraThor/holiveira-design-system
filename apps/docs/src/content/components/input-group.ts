import type { ComponentDoc } from '../../lib/docs-metadata/types';

export const inputGroupDoc: ComponentDoc = {
  id: 'input-group',
  summary: 'A labelled text input with an optional icon, error, and file styling.',
  whenToUse:
    'Use it for a single-line text value when the label and the error should sit with the control: search fields, emails, order numbers. For a control that needs a description as well, wrap it in Field.',
  whenNotToUse:
    'Do not use it for a multi-line value, for a select, or for a group of inputs that share one label. Do not pass a placeholder as the only label; pass the label prop.',
  accessibility: {
    keyboard:
      'Behaves like the native input it renders: the type attribute decides the keyboard, and a file input keeps the browser picker. There is no custom key handling.',
    aria: 'The label is associated through htmlFor and the id it generates, and the error text is wired through aria-describedby. There is no aria-invalid on the raw input; Field adds it.',
    focus:
      'The input keeps the native focus ring; the border colour changes on focus but the outline is removed, so a surrounding wrapper must not remove the visible cue.',
  },
  related: ['field', 'form', 'button'],
  playground: 'forms',
};

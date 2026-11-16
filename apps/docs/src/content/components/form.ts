import type { ComponentDoc } from '../../lib/docs-metadata/types';

export const formDoc: ComponentDoc = {
  id: 'form',
  summary: 'Wraps fields in a native form and hands submission to the caller.',
  whenToUse:
    'Use it when a group of fields is submitted together and the page owns validation: sign-in, filters, checkout. Pair it with Field for per-field errors and a button for submission.',
  whenNotToUse:
    'Do not wrap a single toggle or a search input that submits on change; that is a plain control with its own handler. Do not expect Form to validate: it sets noValidate, prevents the default submit, and calls your handler.',
  accessibility: {
    keyboard:
      'Renders a native form element, so Enter submits when a submit button exists and fields keep their own keyboard behaviour.',
    aria: 'Has no role of its own. Labels, descriptions, and errors belong to Field, which injects aria-describedby and aria-invalid into the control.',
    focus:
      'Does not move focus. After a failed submit, focus the first invalid field; Field does that automatically when an error appears.',
  },
  related: ['field', 'input-group', 'button'],
  playground: 'forms',
};

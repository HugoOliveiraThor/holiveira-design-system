import type { ComponentDoc } from '../../lib/docs-metadata/types';

export const fieldDoc: ComponentDoc = {
  id: 'field',
  summary: 'Connects a label, description, and error message to one control.',
  whenToUse:
    'Use it when a control needs a label plus help or error text, and when the error must be announced with the control. It accepts a native input or an InputGroup as its child.',
  whenNotToUse:
    'Do not wrap several controls behind one label; use a fieldset with a legend instead. Do not render the error only visually: pass it to Field so the control receives aria-invalid and aria-describedby.',
  accessibility: {
    keyboard:
      'Has no key handling of its own. When an error appears after a submit, it moves focus to the first control inside so the reader lands where the fix is needed.',
    aria: 'Injects an id, aria-describedby pointing at the description and the error, and aria-invalid when there is an error.',
    focus:
      'Focus moves only on a new error; otherwise the field leaves focus where the reader put it. Controls keep the browser focus ring.',
  },
  related: ['form', 'input-group'],
  playground: 'forms',
};

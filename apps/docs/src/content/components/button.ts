import type { ComponentDoc } from '../../lib/docs-metadata/types';

export const buttonDoc: ComponentDoc = {
  id: 'button',
  summary: 'Triggers an action or a small navigation decision.',
  whenToUse:
    'Use it for the primary action of a view, a dialog footer, or a form submission. Pair one primary button with outline buttons for secondary actions so the next step is obvious.',
  whenNotToUse:
    'Do not use it for navigation between pages, or for an action that needs a confirmation step or a long explanation. Do not put two primary buttons side by side; the reader cannot tell which one completes the task.',
  accessibility: {
    keyboard:
      'Activates with Enter and Space through the native button. Disabled buttons are skipped by the tab order, so hide a disabled action behind an explanation instead of leaving it as the only path forward.',
    aria: 'Renders a native button with type="button" unless you pass another type. Pass a label or children; never rely on an icon alone without an accessible name.',
    focus:
      'Keeps the browser focus ring and adds no custom trap. When the action removes the button from the page, move focus to the element that replaces it.',
  },
  related: ['form', 'input-group', 'card'],
  playground: 'forms',
};

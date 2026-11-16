import type { ComponentDoc } from '../../lib/docs-metadata/types';

export const badgeDoc: ComponentDoc = {
  id: 'badge',
  summary: 'Labels an item with a short status.',
  whenToUse:
    'Use it to show a state that belongs to the item beside it: order status, plan name, environment. Prefer the light fill inside tables and cards; reach for the solid fill only when the status is the main thing on the row.',
  whenNotToUse:
    'Do not use it for counts that change constantly, for long labels, or as the only way to convey a status that also needs an explanation. A badge is not a button and never carries the action.',
  accessibility: {
    keyboard: 'The badge is not interactive and never enters the tab order.',
    aria: 'Renders an inline element with the text as the accessible name. The variant colour is decoration: write the status in words so the meaning survives without colour.',
    focus:
      'Nothing here receives focus. If a badge sits inside a link or a button, that ancestor owns the focus and the accessible name.',
  },
  related: ['alert', 'table'],
};

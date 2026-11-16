import type { ComponentDoc } from '../../lib/docs-metadata/types';

export const cardDoc: ComponentDoc = {
  id: 'card',
  summary: 'Groups related content on one surface.',
  whenToUse:
    'Use it to group a self-contained block: a metric, a chart, a short form, or a list with its own title. Choose the bordered variant when the card sits on a plain background and the ghost variant when the layout already separates the content.',
  whenNotToUse:
    'Do not nest cards, and do not use a card as a page-section wrapper. If the whole surface is meant to be clickable, wrap it in a link with a real accessible name instead of adding a click handler to the card.',
  accessibility: {
    keyboard:
      'The card is a static container and never enters the tab order on its own; controls inside it keep their own keyboard behaviour.',
    aria: 'Renders a plain element with no landmark or role. When the card stands as a section, give it a heading so the structure survives without sighted scanning.',
    focus:
      'Nothing in the card receives focus by itself. If the card looks clickable, the control that receives focus must be a real link or button inside it.',
  },
  related: ['page-header', 'table', 'button'],
  playground: 'dashboard',
};

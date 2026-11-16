import type { ComponentDoc } from '../../lib/docs-metadata/types';

export const dropdownDoc: ComponentDoc = {
  id: 'dropdown',
  summary: 'A controlled menu that opens from a trigger.',
  whenToUse:
    'Use it for a short list of actions or links that belong to one object: row actions, an account menu, a filter. The open state belongs to the caller, so the same menu can be driven by a keyboard shortcut or a click.',
  whenNotToUse:
    'Do not use it for navigation between main sections, for a list of more than a dozen items, or for content that must stay visible while the reader works. A dropdown hides its contents by definition.',
  accessibility: {
    keyboard:
      'The trigger is a button and opens with Enter or Space. Inside the menu, ArrowDown and ArrowUp move between items, Home and End jump to the edges, and Escape closes. Tab stays inside the open menu.',
    aria: 'The trigger exposes aria-expanded and aria-haspopup="menu"; the panel is role="menu" with aria-orientation="vertical". The caller owns the open state and can therefore keep the trigger and the panel in sync.',
    focus:
      'Opening saves the focused element and closing restores focus to it. The panel traps Tab while open; a click outside closes it through the focus trap and the click-outside hook.',
  },
  related: ['button', 'table'],
};

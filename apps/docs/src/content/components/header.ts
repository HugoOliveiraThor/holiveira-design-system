import type { ComponentDoc } from '../../lib/docs-metadata/types';

export const headerDoc: ComponentDoc = {
  id: 'header',
  summary: 'The top bar of an application shell.',
  whenToUse:
    'Use it with SidebarProvider to hold the menu toggle, the page context, and account actions. Compose it from HeaderToggle and HeaderActions instead of rebuilding the layout.',
  whenNotToUse:
    'Do not use it as a page heading or as a toolbar inside a card. A screen that does not need navigation does not need the header.',
  accessibility: {
    keyboard:
      'HeaderToggle is a plain button with aria-expanded, so it activates with Enter and Space. Actions inside HeaderActions keep their own keyboard behaviour.',
    aria: 'Renders a header landmark. The toggle icon is decorative and its accessible name comes from a screen-reader-only label, so pass children when you need a specific name.',
    focus:
      'Sticky positioning does not change the focus order. The toggle keeps the browser focus ring and appears before the actions in tab order.',
  },
  related: ['sidebar', 'page-header'],
  playground: 'dashboard',
};

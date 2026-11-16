import type { ComponentDoc } from '../../lib/docs-metadata/types';

export const sidebarDoc: ComponentDoc = {
  id: 'sidebar',
  summary: 'The primary navigation column of an application shell.',
  whenToUse:
    'Use it when an application needs a persistent navigation column that collapses on small screens. It must sit inside SidebarProvider, which owns the collapsed and mobile-open state.',
  whenNotToUse:
    'Do not use it for in-page section navigation; a table of contents is the right pattern. Do not render two sidebars at once, and do not nest it inside a card.',
  accessibility: {
    keyboard:
      'Links inside are native and keep their own behaviour. The companion toggle lives in Header and is reachable by keyboard.',
    aria: 'Renders an aside labelled Main navigation. When it is collapsed it sets aria-hidden and inert, so hidden links leave the tab order instead of being reachable invisibly.',
    focus:
      'Collapsed content is inert and cannot receive focus. The mobile overlay is the shell own responsibility; the sidebar only renders it.',
  },
  related: ['header', 'page-header'],
  playground: 'dashboard',
};

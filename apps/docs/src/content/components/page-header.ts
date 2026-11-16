import type { ComponentDoc } from '../../lib/docs-metadata/types';

export const pageHeaderDoc: ComponentDoc = {
  id: 'page-header',
  summary: 'Introduces a page with its title and breadcrumb trail.',
  whenToUse:
    'Use it once per page, between the shell and the page content, when the reader needs to know where they are and what the page is called. Pass the trail explicitly; the component invents a Dashboard crumb when none is given.',
  whenNotToUse:
    'Do not use it inside a card or a modal, and do not repeat it at the top of each section. For a section inside a page, use a heading, not a second page header.',
  accessibility: {
    keyboard:
      'The title is not interactive. Breadcrumb links join the tab order in trail order, so they come before the page content.',
    aria: 'Renders the title as an h2 and the trail as a nav element labelled Breadcrumb, with aria-current="page" on the last crumb.',
    focus:
      'Links keep the browser focus ring. The current crumb is text, not a link, and never receives focus.',
  },
  related: ['card', 'sidebar', 'header'],
  playground: 'orders',
};

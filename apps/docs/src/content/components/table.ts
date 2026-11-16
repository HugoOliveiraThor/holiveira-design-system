import type { ComponentDoc } from '../../lib/docs-metadata/types';

export const tableDoc: ComponentDoc = {
  id: 'table',
  summary: 'Displays rows of comparable data with native table semantics.',
  whenToUse:
    'Use it when the same fields repeat across rows and readers compare them: orders, members, invoices. Keep the columns few and the row height calm; the wrapper scrolls horizontally when the table is wider than the page.',
  whenNotToUse:
    'Do not use it for layout, for a single record, or for a list whose items have different shapes. For a short label-value pair, a description list is the honest structure.',
  accessibility: {
    keyboard:
      'Rows are static: the table itself has no custom keyboard behaviour, and a scrollable wrapper is reachable only through the browser. If a row carries an action, put a real button or link inside a cell.',
    aria: 'Renders a native table. The scroll wrapper receives the props you pass, so give the table a caption or an aria-label on the table element itself; a header cell gets scope="col" by default.',
    focus:
      'Only interactive content inside cells receives focus. Keep one interactive element per row when you can, so tabbing does not become a maze.',
  },
  related: ['badge', 'card', 'dropdown'],
  playground: 'orders',
};

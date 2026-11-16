/**
 * Editorial navigation sections that do not have pages yet.
 *
 * The sidebar renders them as disabled text so the information architecture is
 * visible without shipping links that 404. Pages arrive in M12.4/M12.5.
 */
export interface UnbuiltSection {
  title: string;
  items: string[];
}

export const UNBUILT_SECTIONS: UnbuiltSection[] = [
  {
    title: 'Getting Started',
    items: ['Overview', 'Installation', 'Local development', 'Theming'],
  },
  {
    title: 'Foundations',
    items: ['Design tokens', 'Theme and dark mode', 'Styling and Tailwind', 'Accessibility'],
  },
  {
    title: 'Guides',
    items: [
      'Provider composition',
      'Forms and validation',
      'Charts',
      'Application layouts',
      'Icons',
    ],
  },
  {
    title: 'Architecture',
    items: ['Package layers', 'Dependency ownership', 'Contracts'],
  },
];

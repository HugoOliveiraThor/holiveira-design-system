import { SearchIcon } from '@ho-dev/icons';
import { Button } from '@ho-dev/primitives';

/**
 * The icon is decorative by default (it renders `aria-hidden`), so the control
 * takes its accessible name from the button label.
 */
export function SearchAction() {
  return <Button aria-label="Search the catalogue" icon={<SearchIcon />} />;
}

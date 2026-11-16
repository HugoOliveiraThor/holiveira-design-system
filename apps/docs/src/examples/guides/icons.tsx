import { IconWrapper, SearchIcon } from '@ho-dev/icons';

/** Icons follow `currentColor` and size; `title` gives a decorative icon meaning. */
export function SearchFieldIcon() {
  return (
    <div className="text-dark-4 dark:text-dark-6 flex items-center gap-2">
      <SearchIcon className="h-5 w-5" />
      <IconWrapper title="Status: available" size={20} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="6" fill="currentColor" />
      </IconWrapper>
    </div>
  );
}

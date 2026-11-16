import { docsSite } from '../../../site.config';
import type { PackageRecord } from '../../lib/docs-metadata/types';

function packageDir(packageName: string): string {
  return packageName.replace(/^@[^/]+\//, '');
}

/** Where the package's tracked documents and its Storybook live. */
export function packageLinks(record: PackageRecord): {
  readme: string;
  contract: string;
  storybook: string;
} {
  const dir = packageDir(record.name);
  return {
    readme: `${docsSite.repositoryUrl}/blob/main/packages/${dir}/README.md`,
    contract: `${docsSite.repositoryUrl}/blob/main/docs/architecture/contracts/${dir}.md`,
    storybook: docsSite.storybookUrl,
  };
}

/**
 * The first section of a package page: what the package is, which version and
 * install state it has, and where its README, contract and Storybook live. The
 * links are absolute external URLs, never docs routes.
 */
export function PackageHeader({ record }: { record: PackageRecord }) {
  const links = packageLinks(record);

  return (
    <header className="space-y-2">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="border-stroke dark:border-dark-3 rounded-full border px-3 py-1">
          {record.category}
        </span>
        <span className="text-dark-4 dark:text-dark-6">
          v{record.version} · {record.installState}
        </span>
      </div>
      <h1 className="text-dark text-3xl font-semibold dark:text-white">{record.name}</h1>
      <p className="text-dark-4 dark:text-dark-6 text-base">{record.description}</p>
      <nav aria-label="Package links" className="flex flex-wrap gap-4 text-sm">
        <a href={links.readme} className="text-primary dark:text-blue-light-400 underline">
          README
        </a>
        <a href={links.contract} className="text-primary dark:text-blue-light-400 underline">
          Contract
        </a>
        <a href={links.storybook} className="text-primary dark:text-blue-light-400 underline">
          Storybook
        </a>
      </nav>
    </header>
  );
}

import { docsSite } from '../../../site.config';
import type { PackageRecord } from '../../lib/docs-metadata/types';

import { PAGE_CHIP_CLASS, PAGE_LINK_CLASS, PageHeader } from './page-header';

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
    <PageHeader
      title={record.name}
      eyebrow={
        <>
          <span className={PAGE_CHIP_CLASS}>{record.category}</span>
          <span>
            v{record.version} · {record.installState}
          </span>
        </>
      }
      summary={record.description}
      actionsLabel="Package links"
      actions={
        <>
          <a href={links.readme} className={PAGE_LINK_CLASS}>
            README
          </a>
          <a href={links.contract} className={PAGE_LINK_CLASS}>
            Contract
          </a>
          <a href={links.storybook} className={PAGE_LINK_CLASS}>
            Storybook
          </a>
        </>
      }
    />
  );
}

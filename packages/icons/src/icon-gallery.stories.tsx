import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { AlertErrorIcon } from './icons/alert-error';
import { AlertSuccessIcon } from './icons/alert-success';
import { AlertWarningIcon } from './icons/alert-warning';
import { ArrowDownIcon } from './icons/arrow-down';
import { ArrowLeftIcon } from './icons/arrow-left';
import { ArrowUpIcon } from './icons/arrow-up';
import { AuthenticationIcon } from './icons/authentication';
import { BellIcon } from './icons/bell';
import { CalendarIcon } from './icons/calendar';
import { CallIcon } from './icons/call';
import { CameraIcon } from './icons/camera';
import { CheckIcon } from './icons/check';
import { ChevronUpIcon } from './icons/chevron-up';
import { CloseIcon } from './icons/close';
import { DotIcon } from './icons/dot';
import { DownloadIcon } from './icons/download';
import { EmailIcon } from './icons/email';
import { FourCircleIcon } from './icons/four-circle';
import { GlobeIcon } from './icons/globe';
import { HomeIcon } from './icons/home';
import { LogOutIcon } from './icons/log-out';
import { MenuIcon } from './icons/menu';
import { MessageOutlineIcon } from './icons/message-outline';
import { MoonIcon } from './icons/moon';
import { PasswordIcon } from './icons/password';
import { PencilSquareIcon } from './icons/pencil-square';
import { PieChartIcon } from './icons/pie-chart';
import { PreviewIcon } from './icons/preview';
import { SearchIcon } from './icons/search';
import { SettingsIcon } from './icons/settings';
import { SunIcon } from './icons/sun';
import { TableIcon } from './icons/table';
import { TrashIcon } from './icons/trash';
import { TrendingUpIcon } from './icons/trending-up';
import { UploadIcon } from './icons/upload';
import { UserIcon } from './icons/user';
import { XIcon } from './icons/x';

const ICONS = [
  { name: 'AlertError', component: AlertErrorIcon },
  { name: 'AlertSuccess', component: AlertSuccessIcon },
  { name: 'AlertWarning', component: AlertWarningIcon },
  { name: 'ArrowDown', component: ArrowDownIcon },
  { name: 'ArrowLeft', component: ArrowLeftIcon },
  { name: 'ArrowUp', component: ArrowUpIcon },
  { name: 'Authentication', component: AuthenticationIcon },
  { name: 'Bell', component: BellIcon },
  { name: 'Calendar', component: CalendarIcon },
  { name: 'Call', component: CallIcon },
  { name: 'Camera', component: CameraIcon },
  { name: 'Check', component: CheckIcon },
  { name: 'ChevronUp', component: ChevronUpIcon },
  { name: 'Close', component: CloseIcon },
  { name: 'Dot', component: DotIcon },
  { name: 'Download', component: DownloadIcon },
  { name: 'Email', component: EmailIcon },
  { name: 'FourCircle', component: FourCircleIcon },
  { name: 'Globe', component: GlobeIcon },
  { name: 'Home', component: HomeIcon },
  { name: 'LogOut', component: LogOutIcon },
  { name: 'Menu', component: MenuIcon },
  { name: 'MessageOutline', component: MessageOutlineIcon },
  { name: 'Moon', component: MoonIcon },
  { name: 'Password', component: PasswordIcon },
  { name: 'PencilSquare', component: PencilSquareIcon },
  { name: 'PieChart', component: PieChartIcon },
  { name: 'Preview', component: PreviewIcon },
  { name: 'Search', component: SearchIcon },
  { name: 'Settings', component: SettingsIcon },
  { name: 'Sun', component: SunIcon },
  { name: 'Table', component: TableIcon },
  { name: 'Trash', component: TrashIcon },
  { name: 'TrendingUp', component: TrendingUpIcon },
  { name: 'Upload', component: UploadIcon },
  { name: 'User', component: UserIcon },
  { name: 'X', component: XIcon },
] as const;

function IconGallery() {
  const [search, setSearch] = React.useState('');
  const [size, setSize] = React.useState(24);
  const sizes = [16, 20, 24, 32];

  const filtered = ICONS.filter((icon) => icon.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs">
          <SearchIcon size={16} className="text-dark-4 absolute top-1/2 left-3 -translate-y-1/2" />
          <label htmlFor="icon-search" className="sr-only">
            Search icons
          </label>
          <input
            id="icon-search"
            type="text"
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-stroke focus:border-primary dark:border-dark-3 dark:bg-dark-2 w-full rounded-lg border py-2 pr-4 pl-10 outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-body-xs text-dark-4">Size:</span>
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              aria-pressed={size === s}
              className={`rounded-md border px-3 py-1 text-sm transition ${
                size === s
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-stroke dark:border-dark-3 hover:border-primary/50'
              }`}
            >
              {s}px
            </button>
          ))}
        </div>
      </div>

      <p className="text-body-xs text-dark-4">
        {filtered.length} of {ICONS.length} icons
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {filtered.map((icon) => {
          const Icon = icon.component;
          return (
            <div
              key={icon.name}
              className="border-stroke dark:border-dark-3 flex flex-col items-center gap-3 rounded-lg border p-4 transition hover:shadow-md"
            >
              <Icon size={size} />
              <span className="text-body-xs text-dark-4 text-center">{icon.name}</span>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-dark-4 py-12 text-center">No icons match your search.</p>
      )}
    </div>
  );
}

const meta: Meta = {
  title: 'Icons/Icon Gallery',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Gallery: Story = {
  render: () => <IconGallery />,
};

function TitleExample() {
  return (
    <div className="space-y-4">
      <p className="text-body-sm font-medium">
        Icons with a <code>title</code> prop are announced by screen readers as &ldquo;img&rdquo;
        elements with accessible labels. Without a title, icons are hidden from assistive
        technology.
      </p>
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <UserIcon size={32} title="User profile" />
          <span className="text-body-xs">&lt;UserIcon title=&ldquo;User profile&rdquo; /&gt;</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <BellIcon size={32} title="Unread notifications" />
          <span className="text-body-xs">
            &lt;BellIcon title=&ldquo;Unread notifications&rdquo; /&gt;
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <SettingsIcon size={32} title="Settings" />
          <span className="text-body-xs">&lt;SettingsIcon title=&ldquo;Settings&rdquo; /&gt;</span>
        </div>
      </div>
    </div>
  );
}

export const WithTitle: Story = {
  render: () => <TitleExample />,
};

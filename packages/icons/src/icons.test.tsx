import { cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { render } from './test-utils';

afterEach(cleanup);

import {
  AlertErrorIcon,
  AlertSuccessIcon,
  AlertWarningIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  AuthenticationIcon,
  BellIcon,
  CalendarIcon,
  CallIcon,
  CameraIcon,
  CheckIcon,
  ChevronUpIcon,
  CloseIcon,
  DotIcon,
  DownloadIcon,
  EmailIcon,
  FourCircleIcon,
  GlobeIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MessageOutlineIcon,
  MoonIcon,
  PasswordIcon,
  PencilSquareIcon,
  PieChartIcon,
  PreviewIcon,
  SearchIcon,
  SettingsIcon,
  SunIcon,
  TableIcon,
  TrashIcon,
  TrendingUpIcon,
  UploadIcon,
  UserIcon,
  XIcon,
} from './index';

const ALL_ICONS = [
  { name: 'AlertError', Icon: AlertErrorIcon },
  { name: 'AlertSuccess', Icon: AlertSuccessIcon },
  { name: 'AlertWarning', Icon: AlertWarningIcon },
  { name: 'ArrowDown', Icon: ArrowDownIcon },
  { name: 'ArrowLeft', Icon: ArrowLeftIcon },
  { name: 'ArrowUp', Icon: ArrowUpIcon },
  { name: 'Authentication', Icon: AuthenticationIcon },
  { name: 'Bell', Icon: BellIcon },
  { name: 'Calendar', Icon: CalendarIcon },
  { name: 'Call', Icon: CallIcon },
  { name: 'Camera', Icon: CameraIcon },
  { name: 'Check', Icon: CheckIcon },
  { name: 'ChevronUp', Icon: ChevronUpIcon },
  { name: 'Close', Icon: CloseIcon },
  { name: 'Dot', Icon: DotIcon },
  { name: 'Download', Icon: DownloadIcon },
  { name: 'Email', Icon: EmailIcon },
  { name: 'FourCircle', Icon: FourCircleIcon },
  { name: 'Globe', Icon: GlobeIcon },
  { name: 'Home', Icon: HomeIcon },
  { name: 'LogOut', Icon: LogOutIcon },
  { name: 'Menu', Icon: MenuIcon },
  { name: 'MessageOutline', Icon: MessageOutlineIcon },
  { name: 'Moon', Icon: MoonIcon },
  { name: 'Password', Icon: PasswordIcon },
  { name: 'PencilSquare', Icon: PencilSquareIcon },
  { name: 'PieChart', Icon: PieChartIcon },
  { name: 'Preview', Icon: PreviewIcon },
  { name: 'Search', Icon: SearchIcon },
  { name: 'Settings', Icon: SettingsIcon },
  { name: 'Sun', Icon: SunIcon },
  { name: 'Table', Icon: TableIcon },
  { name: 'Trash', Icon: TrashIcon },
  { name: 'TrendingUp', Icon: TrendingUpIcon },
  { name: 'Upload', Icon: UploadIcon },
  { name: 'User', Icon: UserIcon },
  { name: 'X', Icon: XIcon },
] as const;

describe('Icons', () => {
  it.each(ALL_ICONS)('$name renders with default size', ({ Icon, name }) => {
    const { container } = render(<Icon />);
    const svg = container.querySelector('svg');
    expect(svg).toBeVisible();
  });

  it.each(ALL_ICONS)('$name renders with size=32', ({ Icon }) => {
    const { container } = render(<Icon size={32} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeVisible();
  });

  it.each(ALL_ICONS)('$name renders with title for accessibility', ({ Icon, name }) => {
    const { container } = render(<Icon title={`${name} icon`} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeVisible();
    expect(svg).toHaveAttribute('role', 'img');
    const title = svg?.querySelector('title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(`${name} icon`);
  });
});

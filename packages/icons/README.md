# @holiveira/icons

SVG icon components.

## Purpose

37 inline SVG icon components with consistent `currentColor` styling and typed props. Architectural role: provides icon primitives for the component library.

## Installation

```bash
pnpm add @holiveira/icons
```

## Usage

```tsx
import { BellIcon, SearchIcon, SettingsIcon } from '@holiveira/icons';

function MyHeader() {
  return (
    <div>
      <SearchIcon className="h-5 w-5" />
      <BellIcon className="h-5 w-5" />
      <SettingsIcon className="h-5 w-5" />
    </div>
  );
}
```

## Public API

**Icon components (37):** `AlertErrorIcon`, `AlertSuccessIcon`, `AlertWarningIcon`, `ArrowDownIcon`, `ArrowLeftIcon`, `ArrowUpIcon`, `AuthenticationIcon`, `BellIcon`, `CalendarIcon`, `CallIcon`, `CameraIcon`, `CheckIcon`, `ChevronUpIcon`, `CloseIcon`, `DotIcon`, `DownloadIcon`, `EmailIcon`, `FourCircleIcon`, `GlobeIcon`, `HomeIcon`, `LogOutIcon`, `MenuIcon`, `MessageOutlineIcon`, `MoonIcon`, `PasswordIcon`, `PencilSquareIcon`, `PieChartIcon`, `PreviewIcon`, `SearchIcon`, `SettingsIcon`, `SunIcon`, `TableIcon`, `TrashIcon`, `TrendingUpIcon`, `UploadIcon`, `UserIcon`, `XIcon`

| Export      | Kind | Description                        |
| ----------- | ---- | ---------------------------------- |
| `IconProps` | type | Props type for all icon components |

All icons accept standard SVG props plus `className`. Icons inherit `currentColor` by default.

## Architecture Contract

**Dependency Level:** 2 — Primitives.

**Owns:** Icon component implementations, SVG rendering patterns, icon type definitions.

**Does not own:** Brand logos, multi-color icons, icon generation tooling, or animated icons.

See `docs/architecture/contracts/icons.md` for ownership and dependency boundaries.

## References

- `@holiveira/types` — `IconProps` type definition

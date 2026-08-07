# @ho-dev/icons

SVG icon components.

## Purpose

Tree-shakeable, accessible SVG icon components using `currentColor` for theme-agnostic styling.
Architectural role: provides icon primitives for the component library — every icon is a
`forwardRef` component with consistent sizing and accessibility defaults.

## Installation

```bash
pnpm add @ho-dev/icons
```

## Usage

```tsx
import { BellIcon, SearchIcon, SettingsIcon } from '@ho-dev/icons';

function MyHeader() {
  return (
    <div className="flex gap-3">
      <SearchIcon className="h-5 w-5" />
      <BellIcon className="h-5 w-5" />
      <SettingsIcon className="h-5 w-5" />
    </div>
  );
}
```

## Public API

| Export             | Kind      | Description                                                    |
| ------------------ | --------- | -------------------------------------------------------------- |
| `SearchIcon`       | component | Magnifying glass icon                                          |
| `CloseIcon`        | component | X dismiss icon                                                 |
| `BellIcon`         | component | Notification bell icon                                         |
| `CalendarIcon`     | component | Calendar icon                                                  |
| `CheckIcon`        | component | Checkmark icon                                                 |
| `ChevronUpIcon`    | component | Chevron up arrow icon                                          |
| `MenuIcon`         | component | Hamburger menu icon                                            |
| `MoonIcon`         | component | Moon icon (dark mode)                                          |
| `SunIcon`          | component | Sun icon (light mode)                                          |
| `UserIcon`         | component | User avatar icon                                               |
|                    |           | _…and 28 more icon components (38 total, see full list below)_ |
| `IconWrapper`      | component | Utility for building new icons with a11y defaults              |
| `IconProps`        | type      | Props type for all icon components (`size`, `title`)           |
| `IconWrapperProps` | type      | Props type for IconWrapper utility                             |

**Full icon list:** `AlertErrorIcon`, `AlertSuccessIcon`, `AlertWarningIcon`, `ArrowDownIcon`,
`ArrowLeftIcon`, `ArrowUpIcon`, `AuthenticationIcon`, `CallIcon`, `CameraIcon`, `DotIcon`,
`DownloadIcon`, `EmailIcon`, `FourCircleIcon`, `GlobeIcon`, `HomeIcon`, `LogOutIcon`,
`MessageOutlineIcon`, `PasswordIcon`, `PencilSquareIcon`, `PieChartIcon`, `PreviewIcon`,
`SettingsIcon`, `TableIcon`, `TrashIcon`, `TrendingUpIcon`, `UploadIcon`, `XIcon`, plus the 10
listed above — **40 exports total** (38 components + 2 types).

All icons accept standard SVG props plus `className`. Icons inherit `currentColor` by default.

## Peer Dependencies

| Package      | Version |
| ------------ | ------- |
| `react`      | ^19.0.0 |
| `react-dom`  | ^19.0.0 |
| `typescript` | ^5.0.0  |

## Bundle Size

| Budget                      | Limit  | Enforcement |
| --------------------------- | ------ | ----------- |
| Tree-shaken (ArrowDownIcon) | 3.9 KB | Block       |
| Full package                | 20 KB  | Block       |

## Architecture Contract

**Dependency Level:** 2 — Primitives.

**Owns:** Icon component implementations, SVG rendering patterns, a11y wrapping (IconWrapper), icon
type definitions.

**Does not own:** Brand logos, multi-color icons with hardcoded fills, icon generation tooling, or
animated icons.

See `docs/architecture/contracts/icons.md` for ownership and dependency boundaries.

## Documentation

- **Storybook:**
  https://HugoOliveiraThor.github.io/holiveira-design-system/?path=/docs/components-icons
- [GitHub](https://github.com/HugoOliveiraThor/holiveira-design-system)
- **Contract:** `docs/architecture/contracts/icons.md`

## License

MIT — see [LICENSE](../../LICENSE).

## References

- `@ho-dev/types` — shared type definitions

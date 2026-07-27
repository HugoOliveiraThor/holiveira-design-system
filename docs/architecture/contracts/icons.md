# Package Contract: @holiveira/icons

Level: 2 Category: Primitives

## Purpose

Provide a consistent, tree-shakeable icon system with accessible SVG icon components. Theme-agnostic
— all icons use `currentColor` and inherit parent styling.

## Responsibilities

- Export individual icon components as named `forwardRef` components
- Provide `IconProps` type with `size` and `title` support
- Provide `IconWrapperProps` type for the IconWrapper utility
- Provide `IconWrapper` utility for a11y + sizing + ref consistency
- Enforce `currentColor`-only coloring (no hardcoded fills)
- Enforce valid `viewBox` on every icon

## Excluded Responsibilities

- Brand icons with hardcoded colors (Google, Facebook, GitHub, etc.)
- Dashboard-specific domain icons
- `React.memo` — parent components manage memoization

## Allowed Dependencies

- `react` (peer) — JSX, forwardRef
- `react-dom` (peer) — forwardRef DOM access
- `@holiveira/types` (L0 peer) — type compatibility

## Forbidden Dependencies

- `@holiveira/theme` (L3) — icons must be theme-agnostic
- `@holiveira/primitives` (L2) — icons are dependencies of primitives, not vice versa
- Any icon library (lucide-react, react-icons, etc.)

## Public API

### Types

```ts
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
interface IconWrapperProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  title?: string;
}
```

### Components

All icons follow the naming convention `PascalCaseIconName`:

`IconWrapper`, `SearchIcon`, `CloseIcon`, `ArrowLeftIcon`, `ChevronUpIcon`, `ArrowUpIcon`,
`ArrowDownIcon`, `DotIcon`, `TrendingUpIcon`, `CheckIcon`, `XIcon`, `GlobeIcon`, `TrashIcon`,
`MessageOutlineIcon`, `EmailIcon`, `PasswordIcon`, `UserIcon`, `CallIcon`, `PencilSquareIcon`,
`MenuIcon`, `BellIcon`, `SunIcon`, `MoonIcon`, `SettingsIcon`, `LogOutIcon`, `HomeIcon`,
`CalendarIcon`, `TableIcon`, `PieChartIcon`, `PreviewIcon`, `DownloadIcon`, `CameraIcon`,
`AlertWarningIcon`, `AlertSuccessIcon`, `AlertErrorIcon`, `FourCircleIcon`, `AuthenticationIcon`,
`UploadIcon`

(38 components total at v0.1.0)

## Internal API

None. Each icon lives in its own file under `src/icons/`. No sprite sheet, no registry.

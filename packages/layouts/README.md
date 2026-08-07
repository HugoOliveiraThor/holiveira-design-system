# @ho-dev/layouts

Application shell components for dashboard and page-level layout.

## Purpose

Sidebar with toggle provider, Header with slot-based Actions and Toggle children. Architectural
role: provides layout infrastructure for professional applications.

## Installation

```bash
pnpm add @ho-dev/layouts
```

## Usage

```tsx
import { SidebarProvider, Sidebar, Header, HeaderToggle, HeaderActions } from '@ho-dev/layouts';

function AppLayout() {
  return (
    <SidebarProvider>
      <Header>
        <HeaderToggle />
        <HeaderActions>
          <UserMenu />
        </HeaderActions>
      </Header>
      <Sidebar>
        <nav>{/* navigation items */}</nav>
      </Sidebar>
    </SidebarProvider>
  );
}
```

## Public API

| Export               | Kind      | Description                      |
| -------------------- | --------- | -------------------------------- |
| `SidebarProvider`    | component | Sidebar collapsed state provider |
| `useSidebarContext`  | hook      | Consumer hook for sidebar state  |
| `Sidebar`            | component | Sidebar navigation container     |
| `SidebarProps`       | type      | Sidebar component props          |
| `Header`             | component | Application header               |
| `HeaderToggle`       | component | Sidebar toggle trigger (slot)    |
| `HeaderActions`      | component | Header action slot               |
| `HeaderProps`        | type      | Header component props           |
| `HeaderToggleProps`  | type      | HeaderToggle component props     |
| `HeaderActionsProps` | type      | HeaderActions component props    |

## Peer Dependencies

| Package      | Version |
| ------------ | ------- |
| `next`       | ^16     |
| `react`      | ^19     |
| `react-dom`  | ^19     |
| `typescript` | ^5      |

## Architecture Contract

**Dependency Level:** 3 — Composition.

**Owns:** Layout component implementations, sidebar state management, header composition pattern.

**Does not own:** Navigation item definitions, user menu content, application-specific layout
configurations, or mobile responsive behavior (delegated to consumer).

Contract: `docs/architecture/contracts/layouts.md`

## Documentation

- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system/?path=/docs/layouts-sidebar--docs)
  — Sidebar
- [Storybook](https://HugoOliveiraThor.github.io/holiveira-design-system/?path=/docs/layouts-header--docs)
  — Header
- [GitHub](https://github.com/HugoOliveiraThor/holiveira-design-system)
- Contract: `docs/architecture/contracts/layouts.md`

## License

MIT

## References

- `@ho-dev/hooks` — `useIsMobile` for responsive behavior
- `@ho-dev/ui` — composite UI components
- `@ho-dev/utils` — `cn()` utility

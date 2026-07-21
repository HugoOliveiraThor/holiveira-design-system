# @holiveira/layouts

Application layout components.

## Purpose

Sidebar with toggle provider, Header with slot-based Actions and Toggle children. Architectural
role: provides layout infrastructure for professional applications.

## Installation

```bash
pnpm add @holiveira/layouts
```

## Usage

```tsx
import { SidebarProvider, Sidebar, Header, HeaderToggle, HeaderActions } from '@holiveira/layouts';

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
| `useSidebarContext`  | hook      | Access sidebar state             |
| `Sidebar`            | component | Sidebar navigation container     |
| `Header`             | component | Application header               |
| `HeaderToggle`       | component | Sidebar toggle trigger (slot)    |
| `HeaderActions`      | component | Header action slot               |
| `SidebarProps`       | type      | Sidebar component props          |
| `HeaderProps`        | type      | Header component props           |
| `HeaderToggleProps`  | type      | HeaderToggle component props     |
| `HeaderActionsProps` | type      | HeaderActions component props    |

## Architecture Contract

**Dependency Level:** 3 — Composition.

**Owns:** Layout component implementations, sidebar state management, header composition pattern.

**Does not own:** Navigation item definitions, user menu content, application-specific layout
configurations, or mobile responsive behavior (delegated to consumer).

See `docs/architecture/contracts/layouts.md` for ownership and dependency boundaries.

## References

- `@holiveira/hooks` — responsive hooks dependency
- `@holiveira/utils` — utility functions

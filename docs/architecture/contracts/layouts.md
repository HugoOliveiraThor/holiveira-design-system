# Package Contract: @holiveira/layouts

Level: 3 Category: Composition

## Purpose

Provide page-level layout components (Sidebar, Header) for dashboard and application shells.

## Responsibilities

- Provide `SidebarProvider` context for sidebar state management
- Provide `useSidebarContext` consumer hook
- Provide `Sidebar` navigation component with collapse and mobile support
- Provide `Header` component with slot-based composition (`HeaderToggle`, `HeaderActions`)

## Allowed Dependencies

- `@holiveira/ui` (L3) — composite UI components
- `@holiveira/primitives` (L2) — atomic components
- `@holiveira/theme` (L3) — theme context
- `@holiveira/hooks` (L2) — useIsMobile for responsive behavior
- `@holiveira/types` (L0) — shared types

## Forbidden Dependencies

- `@holiveira/forms` (L3) — layout has no concern with forms
- `@holiveira/charts` (L3) — charts are page content, not layout

## Public API

- `SidebarProvider` — sidebar context provider (owns layout state: expanded, collapsed, mobileOpen)
- `useSidebarContext` — consumer hook for sidebar state
- `Sidebar`, `SidebarProps` — application sidebar shell with mobile overlay
- `Header`, `HeaderProps` — application header shell (slot-based)
- `HeaderToggle`, `HeaderToggleProps` — hamburger toggle component
- `HeaderActions`, `HeaderActionsProps` — right-aligned actions container

## Internal API

- `_SidebarContext`
- `_useResponsiveSidebar`

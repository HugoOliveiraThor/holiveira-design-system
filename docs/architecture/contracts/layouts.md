# Package Contract: @ho-dev/layouts

Level: 3 Category: Composition

## Purpose

Provide page-level layout components (Sidebar, Header) for dashboard and application shells.

## Responsibilities

- Provide `SidebarProvider` context for sidebar state management
- Provide `useSidebarContext` consumer hook
- Provide `Sidebar` navigation component with collapse and mobile support
- Provide `Header` component with slot-based composition (`HeaderToggle`, `HeaderActions`)

## Allowed Dependencies

- `@ho-dev/ui` (L3) — composite UI components
- `@ho-dev/primitives` (L2) — atomic components
- `@ho-dev/theme` (L3) — theme context
- `@ho-dev/hooks` (L2) — useIsMobile for responsive behavior
- `@ho-dev/icons` (L2) — icon components used by auth layout
- `@ho-dev/types` (L0) — shared types

## Forbidden Dependencies

- `@ho-dev/forms` (L3) — layout has no concern with forms
- `@ho-dev/charts` (L3) — charts are page content, not layout

## Public API

- `SidebarProvider` — sidebar context provider (owns layout state: expanded, collapsed, mobileOpen)
- `useSidebarContext` — consumer hook for sidebar state
- `Sidebar`, `SidebarProps` — application sidebar shell with mobile overlay
- `Header`, `HeaderProps` — application header shell (slot-based)
- `HeaderToggle`, `HeaderToggleProps` — hamburger toggle component
- `HeaderActions`, `HeaderActionsProps` — right-aligned actions container
- `AuthLayout`, `AuthLayoutProps` — authentication page layout with split-pane shell and brand panel
  (TailAdmin port)
- `SignInForm`, `SignInFormProps` — controlled sign-in form composing primitives (TailAdmin port)
- `SignUpForm`, `SignUpFormProps` — controlled sign-up form composing primitives (TailAdmin port)
- `SocialProvider` — social login provider descriptor for SignInForm

## Internal API

- `_SidebarContext`
- `_useResponsiveSidebar`

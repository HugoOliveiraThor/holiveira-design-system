/**
 * Sidebar context provider and consumer hook.
 * Owns layout state: expanded, collapsed, mobileOpen.
 * @public
 */
export {
  SidebarProvider,
  useSidebarContext,
} from "./sidebar-context"

/**
 * Application sidebar shell.
 * Provides structural aside with mobile overlay, logo slot, and children area.
 * Navigation rendering is a composition concern — compose inside Sidebar via children.
 * @public
 */
export { Sidebar, type SidebarProps } from "./sidebar"

/**
 * Application header shell.
 * Slot-based: compose with Header.Toggle (hamburger) and Header.Actions (right-aligned widgets).
 * Header must never import or own Notification, UserInfo, or ThemeToggle.
 * @public
 */
export {
  Header,
  HeaderToggle,
  HeaderActions,
  type HeaderProps,
  type HeaderToggleProps,
  type HeaderActionsProps,
} from "./header"

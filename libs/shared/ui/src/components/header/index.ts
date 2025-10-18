/**
 * Header - Compound Component Pattern
 *
 * A flexible, animated navigation header built with Next.js 15 and motion/react.
 * Implements the compound component pattern for maximum flexibility and reusability.
 *
 * @module Header
 * @see {@link https://nextjs.org/docs Next.js Documentation}
 * @see {@link https://motion.dev/docs/react Motion Documentation}
 */

import { HeaderActions } from "./components/header-actions";
import { HeaderContainer } from "./components/header-container";
import { HeaderLogo } from "./components/header-logo";
import { HeaderMobileToggle } from "./components/header-mobile-toggle";
import { HeaderNav } from "./components/header-nav";
import { HeaderNavItem } from "./components/header-nav-items";
import { Header as HeaderRoot } from "./header";

// Compound component composition
export const Header = Object.assign(HeaderRoot, {
	Container: HeaderContainer,
	Logo: HeaderLogo,
	Nav: HeaderNav,
	NavItem: HeaderNavItem,
	Actions: HeaderActions,
	MobileToggle: HeaderMobileToggle,
});

// Export hook and types
export { useHeader } from "./hooks/useHeader";
export type * from "./types";

// Default export
export default Header;

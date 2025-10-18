import type { ReactNode } from "react";

export interface HeaderContextValue {
	/** Mobile menu open state */
	isMenuOpen: boolean;
	/** Toggle mobile menu */
	toggleMenu: () => void;
	/** Close mobile menu */
	closeMenu: () => void;
	/** Whether header is scrolled */
	isScrolled: boolean;
	/** Scroll progress value (0-1) */
	scrollProgress: number;
}

export interface HeaderProps {
	children: ReactNode;
	/** Scroll threshold to trigger compact mode (0-1) */
	scrollThreshold?: number;
	/** Custom className for root element */
	className?: string;
}

export interface HeaderContainerProps {
	children: ReactNode;
	className?: string;
}

export interface HeaderLogoProps {
	href?: string;
	children: ReactNode;
	className?: string;
}

export interface HeaderNavProps {
	children: ReactNode;
	className?: string;
	/** Show only on desktop */
	desktopOnly?: boolean;
	/** Show only on mobile */
	mobileOnly?: boolean;
}

export interface HeaderNavItemProps {
	href: string;
	children: ReactNode;
	className?: string;
	/** Callback when clicked */
	onClick?: () => void;
}

export interface HeaderActionsProps {
	children: ReactNode;
	className?: string;
}

export interface HeaderMobileToggleProps {
	className?: string;
	/** Custom aria label */
	ariaLabel?: string;
}

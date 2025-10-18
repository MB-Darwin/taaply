import type { ReactNode } from "react";

export interface FooterProps {
	children: ReactNode;
	className?: string;
	/** Disable rounded corners */
	square?: boolean;
}

export interface FooterContainerProps {
	children: ReactNode;
	className?: string;
}

export interface FooterLogoProps {
	children: ReactNode;
	href?: string;
	className?: string;
}

export interface FooterGridProps {
	children: ReactNode;
	/** Number of columns on desktop */
	columns?: 2 | 3 | 4 | 5 | 6;
	className?: string;
}

export interface FooterColumnProps {
	children: ReactNode;
	/** Column span on mobile */
	spanMobile?: 1 | 2;
	/** Column span on desktop */
	spanDesktop?: 1 | 2 | 3;
	className?: string;
}

export interface FooterColumnTitleProps {
	children: ReactNode;
	className?: string;
}

export interface FooterLinkProps {
	href: string;
	children: ReactNode;
	/** External link (opens in new tab) */
	external?: boolean;
	/** Custom icon */
	icon?: ReactNode;
	className?: string;
}

export interface FooterBottomProps {
	children: ReactNode;
	className?: string;
}

export interface FooterNewsletterProps {
	/** Newsletter title */
	title?: string;
	/** Placeholder text */
	placeholder?: string;
	/** Submit button text */
	buttonText?: string;
	/** Form submission handler */
	onSubmit?: (email: string) => void | Promise<void>;
	className?: string;
}

export type FooterLinkGroup = {
	group: string;
	items: {
		title: string;
		href: string;
		external?: boolean;
	}[];
};

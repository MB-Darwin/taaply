/**
 * Footer - Compound Component Pattern
 *
 * A flexible, animated footer component built for Next.js 15 with motion/react.
 * Supports multiple layouts, link columns, newsletter signup, and more.
 *
 * @module Footer
 */

import { FooterBottom } from "./components/footer-bottom";
import { FooterColumn } from "./components/footer-column";
import { FooterColumnTitle } from "./components/footer-column-title";
import { FooterContainer } from "./components/footer-container";
import { FooterGrid } from "./components/footer-grid";
import { FooterLink } from "./components/footer-link";
import { FooterLogo } from "./components/footer-logo";
import { FooterNewsletter } from "./components/footer-newletter";
import { Footer as FooterRoot } from "./footer";

// Compound component composition
export const Footer = Object.assign(FooterRoot, {
	Container: FooterContainer,
	Logo: FooterLogo,
	Grid: FooterGrid,
	Column: FooterColumn,
	ColumnTitle: FooterColumnTitle,
	Link: FooterLink,
	Bottom: FooterBottom,
	Newsletter: FooterNewsletter,
});

// Export types
export type * from "./types";

// Default export
export default Footer;

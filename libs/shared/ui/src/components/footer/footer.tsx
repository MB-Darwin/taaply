"use client";

import { cn } from "@taaply/utils";
import type { FooterProps } from "./types";

/**
 * Footer - Compound Component Root
 *
 * A flexible, animated footer component with support for multiple layouts,
 * link columns, newsletter signup, and more.
 *
 * @example
 * ```tsx
 * <Footer>
 *   <Footer.Container>
 *     <Footer.Grid columns={6}>
 *       <Footer.Column spanDesktop={2}>
 *         <Footer.Logo href="/">
 *           <Image src={logo} alt="Logo" />
 *         </Footer.Logo>
 *       </Footer.Column>
 *
 *       <Footer.Column>
 *         <Footer.ColumnTitle>Company</Footer.ColumnTitle>
 *         <Footer.Link href="/about">About</Footer.Link>
 *       </Footer.Column>
 *     </Footer.Grid>
 *
 *     <Footer.Bottom>
 *       © 2024 Company. All rights reserved.
 *     </Footer.Bottom>
 *   </Footer.Container>
 * </Footer>
 * ```
 */
export function Footer({ children, className, square = false }: FooterProps) {
	return (
		<footer
			className={cn("bg-accent", !square && "rounded-2xl lg:m-4", className)}
			role="contentinfo"
		>
			{children}
		</footer>
	);
}

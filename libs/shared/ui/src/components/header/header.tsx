"use client";

import { HeaderProvider } from "./header-context";
import type { HeaderProps } from "./types";

/**
 * Header - Compound Component Root
 *
 * A flexible, accessible navigation header with scroll-based animations
 * and mobile menu support.
 *
 * @example
 * ```tsx
 * <Header>
 *   <Header.Container>
 *     <Header.Logo href="/">
 *       <Image src={logo} alt="Logo" />
 *     </Header.Logo>
 *
 *     <Header.Nav desktopOnly>
 *       <Header.NavItem href="/services">Services</Header.NavItem>
 *       <Header.NavItem href="/about">About</Header.NavItem>
 *     </Header.Nav>
 *
 *     <Header.MobileToggle />
 *
 *     <Header.Actions>
 *       <LanguageSwitcher />
 *       <Button>Get Started</Button>
 *     </Header.Actions>
 *   </Header.Container>
 * </Header>
 * ```
 */
export function Header({
	children,
	scrollThreshold = 0.05,
	className,
}: HeaderProps) {
	return (
		<HeaderProvider scrollThreshold={scrollThreshold}>
			<header className={className}>{children}</header>
		</HeaderProvider>
	);
}

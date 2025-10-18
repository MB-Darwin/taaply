"use client";

import { cn } from "@taaply/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { menuItemVariants } from "../animations";
import { useHeader } from "../hooks/useHeader";
import type { HeaderNavItemProps } from "../types";

/**
 * HeaderNavItem - Individual navigation link
 * Automatically closes mobile menu on click
 */
export function HeaderNavItem({
	href,
	children,
	className,
	onClick,
}: HeaderNavItemProps) {
	const { closeMenu, isMenuOpen } = useHeader();

	const handleClick = () => {
		closeMenu();
		onClick?.();
	};

	// Animate on mobile only
	const Wrapper = isMenuOpen ? motion.li : "li";
	const variants = isMenuOpen ? menuItemVariants : undefined;

	return (
		<Wrapper variants={variants}>
			<Link
				href={href}
				onClick={handleClick}
				className={cn(
					"block text-muted-foreground duration-150",
					"hover:text-accent-foreground focus-visible:text-accent-foreground",
					"rounded-sm outline-offset-4",
					className,
				)}
			>
				<span>{children}</span>
			</Link>
		</Wrapper>
	);
}

"use client";

import { cn } from "@taaply/utils";
import { motion } from "motion/react";
import { containerVariants, transitions } from "../animations";
import { useHeader } from "../hooks/useHeader";
import type { HeaderContainerProps } from "../types";

/**
 * HeaderContainer - Animated navigation container
 * Automatically adjusts size and styling based on scroll position
 */
export function HeaderContainer({ children, className }: HeaderContainerProps) {
	const { isScrolled, isMenuOpen } = useHeader();

	return (
		<nav
			className="fixed z-20 w-full px-2"
			data-menu-open={isMenuOpen}
			aria-label="Main navigation"
		>
			<motion.div
				className={cn(
					"mx-auto mt-2 transition-all duration-300 lg:px-0",
					isScrolled &&
						"rounded-2xl border bg-background/50 backdrop-blur-lg lg:px-5",
					className,
				)}
				initial="initial"
				animate={isScrolled ? "scrolled" : "initial"}
				variants={containerVariants}
				transition={transitions.container}
			>
				<div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
					{children}
				</div>
			</motion.div>
		</nav>
	);
}

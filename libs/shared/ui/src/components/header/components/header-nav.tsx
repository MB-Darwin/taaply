"use client";

import { cn } from "@taaply/utils";
import { AnimatePresence, motion } from "motion/react";
import { mobileMenuListVariants } from "../animations";
import { useHeader } from "../hooks/useHeader";
import type { HeaderNavProps } from "../types";

/**
 * HeaderNav - Navigation list wrapper
 * Supports both desktop and mobile rendering with animations
 */
export function HeaderNav({
	children,
	className,
	desktopOnly = false,
	mobileOnly = false,
}: HeaderNavProps) {
	const { isMenuOpen } = useHeader();

	if (desktopOnly) {
		return (
			<div className="hidden lg:block">
				<ul className={cn("flex gap-8 text-sm", className)}>{children}</ul>
			</div>
		);
	}

	if (mobileOnly) {
		return (
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						className="lg:hidden"
						initial="closed"
						animate="open"
						exit="closed"
						variants={mobileMenuListVariants}
					>
						<ul className={cn("space-y-6 text-base", className)}>{children}</ul>
					</motion.div>
				)}
			</AnimatePresence>
		);
	}

	// Default: render in both contexts
	return <>{children}</>;
}

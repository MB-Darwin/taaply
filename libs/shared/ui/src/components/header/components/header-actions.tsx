"use client";

import { cn } from "@taaply/utils";
import { AnimatePresence, motion } from "motion/react";
import { useId } from "react";
import { mobileMenuVariants } from "../animations";
import { useHeader } from "../hooks/useHeader";
import type { HeaderActionsProps } from "../types";

/**
 * HeaderActions - Action buttons and controls container
 * Responsive layout with mobile menu integration
 */
export function HeaderActions({ children, className }: HeaderActionsProps) {
	const { isMenuOpen } = useHeader();
	const id = useId();

	return (
		<>
			{/* Mobile Menu - Animated */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						id={id}
						className={cn(
							"mb-6 w-full flex-wrap items-center justify-end",
							"space-y-8 rounded-3xl border bg-background p-6",
							"shadow-2xl shadow-zinc-300/20 dark:shadow-none",
							"md:flex-nowrap lg:hidden",
							className,
						)}
						initial="closed"
						animate="open"
						exit="closed"
						variants={mobileMenuVariants}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Desktop Menu - Always Visible */}
			<div
				className={cn(
					"hidden lg:flex lg:w-fit lg:items-center lg:gap-6",
					className,
				)}
			>
				{children}
			</div>
		</>
	);
}

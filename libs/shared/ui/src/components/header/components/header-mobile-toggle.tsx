"use client";

import SolidLineIcon from "@taaply/assets/icons/solid-line-01-stroke-rounded";
import { cn } from "@taaply/utils";
import { motion } from "motion/react";
import { toggleLineVariants } from "../animations";
import { useHeader } from "../hooks/useHeader";
import type { HeaderMobileToggleProps } from "../types";

/**
 * HeaderMobileToggle - Animated hamburger menu button
 * Transforms between hamburger and X icon
 */
export function HeaderMobileToggle({
	className,
	ariaLabel,
}: HeaderMobileToggleProps) {
	const { isMenuOpen, toggleMenu } = useHeader();

	return (
		<motion.button
			type="button"
			aria-label={ariaLabel ?? (isMenuOpen ? "Close menu" : "Open menu")}
			aria-expanded={isMenuOpen}
			aria-controls="mobile-menu"
			className={cn(
				"-m-2.5 -mr-4 relative z-20 p-2.5 lg:hidden",
				"rounded-md outline-offset-2",
				"hover:bg-accent/50 active:bg-accent",
				"transition-colors duration-150",
				className,
			)}
			onClick={toggleMenu}
			whileTap={{ scale: 0.95 }}
		>
			<motion.div
				animate={isMenuOpen ? "open" : "closed"}
				className="relative h-4 w-5"
			>
				<motion.div
					variants={toggleLineVariants.top}
					className="absolute top-0 left-0 origin-center"
				>
					<SolidLineIcon className="m-auto" aria-hidden="true" />
				</motion.div>
				<motion.div
					variants={toggleLineVariants.bottom}
					className="absolute bottom-0 left-0 origin-center"
				>
					<SolidLineIcon className="m-auto" aria-hidden="true" />
				</motion.div>
			</motion.div>
		</motion.button>
	);
}

"use client";

import { cn } from "@taaply/utils";
import { motion } from "motion/react";
import { logoItemVariants, transitions } from "../animations";
import type { LogoCarouselItemProps } from "../types";

/**
 * LogoCarouselItem - Individual logo wrapper
 * Adds hover animations and styling
 */
export function LogoCarouselItem({
	children,
	width = 100,
	height = 60,
	darkInvert = true,
	className,
}: LogoCarouselItemProps) {
	return (
		<motion.div
			className={cn(
				"flex items-center justify-center",
				darkInvert && "dark:invert",
				className,
			)}
			style={{ width, height }}
			initial="rest"
			whileHover="hover"
			variants={logoItemVariants}
			transition={transitions.easeOut}
		>
			{children}
		</motion.div>
	);
}

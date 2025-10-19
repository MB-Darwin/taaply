"use client";

import { cn } from "@taaply/utils";
import { motion } from "motion/react";
import { containerVariants, transitions } from "../animations";
import type { LogoCarouselContainerProps } from "../types";

/**
 * LogoCarouselContainer - Main layout container
 * Handles responsive flex layout and spacing
 */
export function LogoCarouselContainer({
	children,
	className,
}: LogoCarouselContainerProps) {
	return (
		<motion.div
			className={cn(
				"w-full overflow-hidden px-4 py-16 md:px-6 lg:px-8",
				className,
			)}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-100px" }}
			variants={containerVariants}
			transition={transitions.container}
		>
			<div className="mx-auto max-w-7xl">
				<div className="flex flex-col items-center md:flex-row">{children}</div>
			</div>
		</motion.div>
	);
}

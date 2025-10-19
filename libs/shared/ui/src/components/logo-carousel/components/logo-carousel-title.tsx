"use client";

import { cn } from "@taaply/utils";
import { motion } from "motion/react";
import { titleVariants } from "../animations";
import type { LogoCarouselTitleProps } from "../types";

/**
 * LogoCarouselTitle - Title/description section
 * Responsive with optional border separator
 */
export function LogoCarouselTitle({
	children,
	align = "left",
	showBorder = true,
	className,
}: LogoCarouselTitleProps) {
	return (
		<motion.div
			className={cn(
				"md:max-w-44",
				showBorder && "md:border-r md:pr-6",
				align === "center" && "text-center",
				align === "right" && "text-right",
				className,
			)}
			variants={titleVariants}
			transition={{ duration: 0.5, ease: "easeOut" }}
		>
			<h2 className="font-medium text-muted-foreground text-sm">{children}</h2>
		</motion.div>
	);
}

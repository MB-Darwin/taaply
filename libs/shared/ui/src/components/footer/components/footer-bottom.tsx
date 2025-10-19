"use client";

import { cn } from "@taaply/utils";
import { motion } from "motion/react";
import { bottomBarVariants } from "../animations";
import type { FooterBottomProps } from "../types";

/**
 * FooterBottom - Bottom bar section
 * For copyright, legal links, social icons, etc.
 */
export function FooterBottom({ children, className }: FooterBottomProps) {
	return (
		<motion.div
			className={cn(
				"mt-12 border-border border-t pt-8",
				"flex flex-col gap-4 text-muted-foreground text-sm",
				"sm:flex-row sm:items-center sm:justify-between",
				className,
			)}
			variants={bottomBarVariants}
			transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
		>
			{children}
		</motion.div>
	);
}

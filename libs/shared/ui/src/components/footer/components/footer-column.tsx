"use client";

import { cn } from "@taaply/utils";
import { motion } from "motion/react";
import { columnVariants, linkListVariants } from "../animations";
import type { FooterColumnProps } from "../types";

/**
 * FooterColumn - Individual column wrapper
 * Handles column spanning and animations
 */
export function FooterColumn({
	children,
	spanMobile = 1,
	spanDesktop = 1,
	className,
}: FooterColumnProps) {
	const colSpanMobile = spanMobile === 2 ? "col-span-2" : "col-span-1";
	const colSpanDesktop = {
		1: "sm:col-span-1",
		2: "sm:col-span-2",
		3: "sm:col-span-3",
	};

	return (
		<motion.div
			className={cn(
				"space-y-3",
				colSpanMobile,
				colSpanDesktop[spanDesktop],
				className,
			)}
			variants={columnVariants}
		>
			<motion.div variants={linkListVariants}>{children}</motion.div>
		</motion.div>
	);
}

"use client";

import { cn } from "@taaply/utils";
import { motion } from "motion/react";
import { gridVariants } from "../animations";
import type { FooterGridProps } from "../types";

/**
 * FooterGrid - Responsive grid layout
 * Automatically handles responsive columns
 */
export function FooterGrid({
	children,
	columns = 6,
	className,
}: FooterGridProps) {
	const gridCols = {
		2: "lg:grid-cols-2",
		3: "lg:grid-cols-3",
		4: "lg:grid-cols-4",
		5: "lg:grid-cols-5",
		6: "lg:grid-cols-6",
	};

	return (
		<motion.div
			className={cn(
				"grid grid-cols-2 gap-8 sm:grid-cols-3",
				gridCols[columns],
				className,
			)}
			variants={gridVariants}
		>
			{children}
		</motion.div>
	);
}

"use client";

import { cn } from "@taaply/utils";
import { motion } from "motion/react";
import { itemVariants } from "../animations";

/**
 * Generic animated item for composing custom rows/content
 */
export function PromptInputBoxItem({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<motion.div
			className={cn(className)}
			variants={itemVariants}
			transition={{ duration: 0.18 }}
		>
			{children}
		</motion.div>
	);
}

"use client";

import { cn } from "@taaply/utils";
import { motion } from "motion/react";
import { footerVariants } from "../animations";
import type { FooterContainerProps } from "../types";

/**
 * FooterContainer - Main content wrapper
 * Handles padding and animations
 */
export function FooterContainer({ children, className }: FooterContainerProps) {
	return (
		<motion.div
			className={cn("mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8", className)}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-50px" }}
			variants={footerVariants}
		>
			{children}
		</motion.div>
	);
}

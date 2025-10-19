"use client";

import { cn } from "@taaply/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { logoVariants } from "../animations";
import type { FooterLogoProps } from "../types";

/**
 * FooterLogo - Animated logo section
 * Can be a link or static element
 */
export function FooterLogo({ children, href, className }: FooterLogoProps) {
	const content = (
		<motion.div
			variants={logoVariants}
			initial="rest"
			whileHover="hover"
			transition={{ duration: 0.3, ease: "easeOut" }}
			className={cn("inline-block", className)}
		>
			{children}
		</motion.div>
	);

	if (href) {
		return (
			<Link
				href={href}
				aria-label="Go to homepage"
				className="rounded-sm outline-offset-4"
			>
				{content}
			</Link>
		);
	}

	return content;
}

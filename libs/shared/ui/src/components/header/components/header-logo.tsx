"use client";

import { cn } from "@taaply/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { logoVariants } from "../animations";
import type { HeaderLogoProps } from "../types";

/**
 * HeaderLogo - Animated logo component
 * Includes hover animation and accessibility attributes
 */
export function HeaderLogo({
	href = "/",
	children,
	className,
}: HeaderLogoProps) {
	return (
		<div className="flex items-center">
			<Link
				href={href}
				aria-label="Go to homepage"
				className={cn(
					"flex items-center space-x-2 outline-offset-4",
					className,
				)}
			>
				<motion.div initial="rest" whileHover="hover" variants={logoVariants}>
					{children}
				</motion.div>
			</Link>
		</div>
	);
}

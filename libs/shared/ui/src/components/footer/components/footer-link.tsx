"use client";

import { cn } from "@taaply/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { linkItemVariants } from "../animations";
import type { FooterLinkProps } from "../types";

/**
 * FooterLink - Individual link with animation
 * Supports internal and external links with icons
 */
export function FooterLink({
	href,
	children,
	external = false,
	icon,
	className,
}: FooterLinkProps) {
	const linkProps = external
		? {
				target: "_blank",
				rel: "noopener noreferrer",
			}
		: {};

	return (
		<motion.li
			variants={linkItemVariants}
			transition={{
				duration: 0.3,
				ease: "easeOut",
			}}
		>
			<Link
				href={href}
				className={cn(
					"text-muted-foreground text-sm transition-colors",
					"hover:text-foreground focus-visible:text-foreground",
					"inline-flex items-center gap-2 rounded-sm outline-offset-4",
					className,
				)}
				{...linkProps}
			>
				{icon && <span className="shrink-0">{icon}</span>}
				<span>{children}</span>
				{external && (
					<svg
						className="h-3 w-3 shrink-0"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
						/>
					</svg>
				)}
			</Link>
		</motion.li>
	);
}

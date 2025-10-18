"use client";

import { cn } from "@taaply/utils";
import type { FooterColumnTitleProps } from "../types";

/**
 * FooterColumnTitle - Column heading
 * Semantic h3 with consistent styling
 */
export function FooterColumnTitle({
	children,
	className,
}: FooterColumnTitleProps) {
	return (
		<h3 className={cn("font-medium text-foreground text-sm", className)}>
			{children}
		</h3>
	);
}

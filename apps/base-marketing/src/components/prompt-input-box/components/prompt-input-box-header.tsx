"use client";

import { cn } from "@taaply/utils";

/**
 * Optional header area (branding, title, hint).
 * Provided for composition flexibility.
 */
export function PromptInputBoxHeader({
	className,
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) {
	if (!children) return null;
	return (
		<div
			className={cn(
				"mb-2 flex items-center justify-between text-xs text-muted-foreground",
				className,
			)}
		>
			{children}
		</div>
	);
}

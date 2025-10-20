"use client";

import { cn } from "@taaply/utils";

export function PromptInputBoxActions({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<div className={cn("flex items-center justify-between gap-2", className)}>
			{children}
		</div>
	);
}

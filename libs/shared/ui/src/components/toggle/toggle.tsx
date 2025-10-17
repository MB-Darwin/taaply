"use client";

import { cn } from "@taaply/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Toggle as TogglePrimitive } from "radix-ui";
import type * as React from "react";

const toggleVariants = cva(
	"inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline:
					"border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
			},
			size: {
				lg: "h-10 min-w-10 gap-1.5 rounded-md px-2.5 text-sm [&_svg]:size-4",
				md: "h-8.5 min-w-8.5 gap-1 rounded-md px-2 text-[0.8125rem] leading-(--text-sm--line-height) [&_svg]:size-4",
				sm: "h-7 min-w-7 gap-1 rounded-md px-1.25 text-xs [&_svg]:size-3.5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	},
);

function Toggle({
	className,
	variant,
	size,
	...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
	VariantProps<typeof toggleVariants>) {
	return (
		<TogglePrimitive.Root
			data-slot="toggle"
			className={cn(toggleVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Toggle, toggleVariants };

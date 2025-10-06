"use client";

import * as React from "react";
import { cn } from "@taaply/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Define CardContext
type CardContextType = {
	variant: "default" | "accent";
};

const CardContext = React.createContext<CardContextType>({
	variant: "default", // Default value
});

// Hook to use CardContext
const useCardContext = () => {
	const context = React.useContext(CardContext);
	if (!context) {
		throw new Error("useCardContext must be used within a Card component");
	}
	return context;
};

// Variants
const cardVariants = cva(
	"flex flex-col items-stretch rounded-xl text-card-foreground",
	{
		variants: {
			variant: {
				default: "black/5 border border-border bg-card shadow-xs",
				accent: "bg-muted p-1 shadow-xs",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const cardHeaderVariants = cva(
	"flex min-h-14 flex-wrap items-center justify-between gap-2.5 px-5",
	{
		variants: {
			variant: {
				default: "border-border border-b",
				accent: "",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const cardContentVariants = cva("grow p-5", {
	variants: {
		variant: {
			default: "",
			accent: "rounded-t-xl bg-card [&:last-child]:rounded-b-xl",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

const cardTableVariants = cva("grid grow", {
	variants: {
		variant: {
			default: "",
			accent: "rounded-xl bg-card",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

const cardFooterVariants = cva("flex min-h-14 items-center px-5", {
	variants: {
		variant: {
			default: "border-border border-t",
			accent: "mt-[2px] rounded-b-xl bg-card",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

// Card Component
function Card({
	className,
	variant = "default",
	...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>) {
	return (
		<CardContext.Provider value={{ variant: variant || "default" }}>
			<div
				data-slot="card"
				className={cn(cardVariants({ variant }), className)}
				{...props}
			/>
		</CardContext.Provider>
	);
}

// CardHeader Component
function CardHeader({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const { variant } = useCardContext();
	return (
		<div
			data-slot="card-header"
			className={cn(cardHeaderVariants({ variant }), className)}
			{...props}
		/>
	);
}

// CardContent Component
function CardContent({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const { variant } = useCardContext();
	return (
		<div
			data-slot="card-content"
			className={cn(cardContentVariants({ variant }), className)}
			{...props}
		/>
	);
}

// CardTable Component
function CardTable({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const { variant } = useCardContext();
	return (
		<div
			data-slot="card-table"
			className={cn(cardTableVariants({ variant }), className)}
			{...props}
		/>
	);
}

// CardFooter Component
function CardFooter({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const { variant } = useCardContext();
	return (
		<div
			data-slot="card-footer"
			className={cn(cardFooterVariants({ variant }), className)}
			{...props}
		/>
	);
}

// Other Components
function CardHeading({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			data-slot="card-heading"
			className={cn("space-y-1", className)}
			{...props}
		/>
	);
}

function CardToolbar({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			data-slot="card-toolbar"
			className={cn("flex items-center gap-2.5", className)}
			{...props}
		/>
	);
}

function CardTitle({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h3
			data-slot="card-title"
			className={cn(
				"font-semibold text-toast leading-none tracking-tight",
				className,
			)}
			{...props}
		/>
	);
}

function CardDescription({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

// Exports
export {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardHeading,
	CardTable,
	CardTitle,
	CardToolbar,
};

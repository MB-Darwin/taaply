import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { Slot as SlotPrimitive } from "radix-ui";
import { cn } from "@taaply/utils";

const badgeVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				contained: "",
				soft: "",
				outline: "border",
			},
			color: {
				inherit: "",
				primary: "",
				secondary: "",
				success: "",
				warning: "",
				error: "",
				info: "",
			},
			appearance: {
				default: "",
				ghost: "border-0 bg-transparent",
			},
			size: {
				lg: "h-7 min-w-7 gap-1.5 rounded-md px-3 text-sm [&_svg:not([class*=size-])]:size-3.5",
				md: "h-6 min-w-6 gap-1.5 rounded-md px-1.5 text-xs [&_svg:not([class*=size-])]:size-3.5",
				sm: "h-5 min-w-5 gap-1 rounded-sm px-1.5 text-[0.6875rem] leading-[0.75rem] [&_svg:not([class*=size-])]:size-3",
				xs: "h-4 min-w-4 gap-1 rounded-sm px-1 text-[0.625rem] leading-[0.5rem] [&_svg:not([class*=size-])]:size-2.5",
			},
			shape: {
				default: "",
				pill: "rounded-full",
			},
		},
		compoundVariants: [
			// Contained variants
			{
				variant: "contained",
				color: "inherit",
				className: "bg-foreground text-background",
			},
			{
				variant: "contained",
				color: "primary",
				className: "bg-primary text-primary-foreground",
			},
			{
				variant: "contained",
				color: "secondary",
				className: "bg-secondary text-secondary-foreground",
			},
			{
				variant: "contained",
				color: "success",
				className: "bg-success text-success-foreground",
			},
			{
				variant: "contained",
				color: "warning",
				className: "bg-warning text-warning-foreground",
			},
			{
				variant: "contained",
				color: "error",
				className: "bg-error text-error-foreground",
			},
			{
				variant: "contained",
				color: "info",
				className: "bg-info text-info-foreground",
			},

			// Soft variants
			{
				variant: "soft",
				color: "inherit",
				className: "bg-foreground/10 text-foreground",
			},
			{
				variant: "soft",
				color: "primary",
				className: "bg-primary/10 text-primary",
			},
			{
				variant: "soft",
				color: "secondary",
				className: "bg-secondary text-secondary-foreground",
			},
			{
				variant: "soft",
				color: "success",
				className: "bg-success/10 text-success",
			},
			{
				variant: "soft",
				color: "warning",
				className: "bg-warning/10 text-warning",
			},
			{ variant: "soft", color: "error", className: "bg-error/10 text-error" },
			{ variant: "soft", color: "info", className: "bg-info/10 text-info" },

			// Outline variants
			{
				variant: "outline",
				color: "inherit",
				className: "border-current bg-background text-foreground",
			},
			{
				variant: "outline",
				color: "primary",
				className: "border-primary bg-background text-primary",
			},
			{
				variant: "outline",
				color: "secondary",
				className: "border-muted bg-secondary text-secondary-foreground",
			},
			{
				variant: "outline",
				color: "success",
				className: "border-success bg-background text-success",
			},
			{
				variant: "outline",
				color: "warning",
				className: "border-warning bg-background text-warning",
			},
			{
				variant: "outline",
				color: "error",
				className: "border-error bg-background text-error",
			},
			{
				variant: "outline",
				color: "info",
				className: "border-info bg-background text-info",
			},

			// Icons opacity for outline variants
			{
				variant: "outline",
				className:
					"[&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60",
			},

			// Shadow support for contained and outline variants
			{
				variant: "contained",
				appearance: "default",
				className: "shadow-black/5 shadow-xs",
			},
			{
				variant: "outline",
				appearance: "default",
				className: "shadow-black/5 shadow-xs",
			},

			// Ghost appearance overrides
			{
				variant: "contained",
				color: "inherit",
				appearance: "ghost",
				className: "bg-transparent text-foreground",
			},
			{
				variant: "contained",
				color: "primary",
				appearance: "ghost",
				className: "bg-transparent text-primary",
			},
			{
				variant: "contained",
				color: "secondary",
				appearance: "ghost",
				className: "bg-transparent text-secondary",
			},
			{
				variant: "contained",
				color: "success",
				appearance: "ghost",
				className: "bg-transparent text-success",
			},
			{
				variant: "contained",
				color: "warning",
				appearance: "ghost",
				className: "bg-transparent text-warning",
			},
			{
				variant: "contained",
				color: "error",
				appearance: "ghost",
				className: "bg-transparent text-error",
			},
			{
				variant: "contained",
				color: "info",
				appearance: "ghost",
				className: "bg-transparent text-info",
			},

			// Ghost appearance with no padding
			{ appearance: "ghost", size: "lg", className: "px-0" },
			{ appearance: "ghost", size: "md", className: "px-0" },
			{ appearance: "ghost", size: "sm", className: "px-0" },
			{ appearance: "ghost", size: "xs", className: "px-0" },
		],
		defaultVariants: {
			variant: "contained",
			color: "primary",
			size: "md",
			shape: "default",
			appearance: "default",
		},
	},
);

const badgeButtonVariants = cva(
	"-me-0.5 inline-flex size-3.5 cursor-pointer items-center justify-center rounded-sm p-0 opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-hidden [&>svg]:size-3.5",
	{
		variants: {
			size: {
				lg: "size-4 [&>svg]:size-4",
				md: "size-3.5 [&>svg]:size-3.5",
				sm: "size-3 [&>svg]:size-3",
				xs: "size-2.5 [&>svg]:size-2.5",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

const badgeDotVariants = cva("", {
	variants: {
		color: {
			current: "text-[currentColor]",
			inherit: "text-foreground",
			primary: "text-primary",
			secondary: "text-secondary",
			success: "text-success",
			warning: "text-warning",
			error: "text-error",
			info: "text-info",
		},
		size: {
			lg: "text-md",
			md: "text-sm",
			sm: "text-xs",
			xs: "text-[0.5rem]",
		},
	},
	defaultVariants: {
		color: "current",
		size: "md",
	},
});

interface BadgeProps
	extends Omit<React.ComponentProps<"span">, "color">,
		VariantProps<typeof badgeVariants> {
	asChild?: boolean;
	disabled?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

interface BadgeButtonProps
	extends React.ComponentProps<"button">,
		VariantProps<typeof badgeButtonVariants> {
	asChild?: boolean;
}

interface BadgeDotProps
	extends Omit<React.ComponentProps<"span">, "color">,
		VariantProps<typeof badgeDotVariants> {
	asChild?: boolean;
}

function Badge({
	className,
	variant,
	color,
	shape,
	appearance,
	size,
	asChild = false,
	disabled,
	leftIcon,
	rightIcon,
	children,
	...props
}: BadgeProps) {
	const Comp = asChild ? SlotPrimitive.Slot : "span";

	const badgeContent = (
		<>
			{leftIcon}
			{children}
			{rightIcon}
		</>
	);

	return (
		<Comp
			data-slot="badge"
			className={cn(
				badgeVariants({ variant, size, appearance, shape, color, className }),
				disabled && "pointer-events-none opacity-50",
			)}
			{...props}
		>
			{badgeContent}
		</Comp>
	);
}

function BadgeButton({
	className,
	size,
	asChild = false,
	children,
	...props
}: BadgeButtonProps) {
	const Comp = asChild ? SlotPrimitive.Slot : "button";

	return (
		<Comp
			data-slot="badge-button"
			type="button"
			className={cn(badgeButtonVariants({ size, className }))}
			{...props}
		>
			{children || <X />}
		</Comp>
	);
}

function BadgeDot({
	className,
	color,
	size,
	asChild = false,
	children,
	...props
}: BadgeDotProps) {
	const Comp = asChild ? SlotPrimitive.Slot : "span";

	return (
		<Comp
			data-slot="badge-dot"
			className={cn(badgeDotVariants({ color, size, className }))}
			{...props}
		>
			{children || "✦"}
		</Comp>
	);
}

export {
	Badge,
	BadgeButton,
	BadgeDot,
	badgeVariants,
	badgeButtonVariants,
	badgeDotVariants,
};

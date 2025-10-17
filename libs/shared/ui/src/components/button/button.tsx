import { cn } from "@taaply/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown, Loader2, type LucideIcon } from "lucide-react";
import Link, { type LinkProps } from "next/link";
import { Slot as SlotPrimitive } from "radix-ui";
import type * as React from "react";

const buttonVariants = cva(
	"group inline-flex cursor-pointer items-center justify-center whitespace-nowrap whitespace-nowrap font-semibold text-sm ring-offset-background transition-[color,box-shadow] focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-60 has-data-[arrow=true]:justify-between [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				contained: "",
				soft: "",
				outline: "border",
				text: "border-0 bg-transparent",
				dashed: "border border-dashed",
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
				ghost: "",
			},
			underline: {
				solid: "",
				dashed: "",
			},
			underlined: {
				solid: "",
				dashed: "",
			},
			size: {
				lg: "min-py-2 h-10 gap-1.5 rounded-md px-4 text-sm [&_svg:not([class*=size-])]:size-4",
				md: "h-8 gap-1.5 rounded-md px-3 text-[0.8125rem] [&_svg:not([class*=size-])]:size-4",
				sm: "h-7 gap-1.25 rounded-md px-2.5 text-xs [&_svg:not([class*=size-])]:size-3.5",
				icon: "size-8.5 shrink-0 rounded-md [&_svg:not([class*=size-])]:size-4",
			},
			autoHeight: {
				true: "",
				false: "",
			},
			shape: {
				default: "",
				pill: "rounded-full",
			},
			mode: {
				default:
					"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				icon: "shrink-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				link: "h-auto rounded-none bg-transparent p-0 text-primary hover:bg-transparent data-[state=open]:bg-transparent",
				input: `
            justify-start font-normal hover:bg-background [&_svg]:transition-colors [&_svg]:hover:text-foreground data-[state=open]:bg-background
            focus-visible:border-ring focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/30
            [[data-state=open]>&]:border-ring [[data-state=open]>&]:outline-hidden [[data-state=open]>&]:ring-[3px]
            [[data-state=open]>&]:ring-ring/30
            aria-invalid:border-error/60 aria-invalid:ring-error/10 dark:aria-invalid:border-error dark:aria-invalid:ring-error/20
           in-data-[invalid=true]:border-error/60 in-data-[invalid=true]:ring-error/10  dark:in-data-[invalid=true]:border-error dark:in-data-[invalid=true]:ring-error/20
          `,
			},
			placeholder: {
				true: "text-muted-foreground",
				false: "",
			},
		},
		compoundVariants: [
			// Contained variants
			{
				variant: "contained",
				color: "inherit",
				className:
					"bg-foreground text-background hover:bg-foreground/90 data-[state=open]:bg-foreground/90",
			},
			{
				variant: "contained",
				color: "primary",
				className:
					"bg-primary text-primary-foreground hover:bg-primary/90 data-[state=open]:bg-primary/90",
			},
			{
				variant: "contained",
				color: "secondary",
				className:
					"bg-secondary text-secondary-foreground hover:bg-secondary/90 data-[state=open]:bg-secondary/90",
			},
			{
				variant: "contained",
				color: "success",
				className:
					"bg-success text-success-foreground hover:bg-success/90 data-[state=open]:bg-success/90",
			},
			{
				variant: "contained",
				color: "warning",
				className:
					"bg-warning text-warning-foreground hover:bg-warning/90 data-[state=open]:bg-warning/90",
			},
			{
				variant: "contained",
				color: "error",
				className:
					"bg-error text-error-foreground hover:bg-error/90 data-[state=open]:bg-error/90",
			},
			{
				variant: "contained",
				color: "info",
				className:
					"bg-info text-info-foreground hover:bg-info/90 data-[state=open]:bg-info/90",
			},

			// Soft variants
			{
				variant: "soft",
				color: "inherit",
				className:
					"bg-foreground/10 text-foreground hover:bg-foreground/15 data-[state=open]:bg-foreground/15",
			},
			{
				variant: "soft",
				color: "primary",
				className:
					"bg-primary/10 text-primary hover:bg-primary/15 data-[state=open]:bg-primary/15",
			},
			{
				variant: "soft",
				color: "secondary",
				className:
					"bg-secondary/10 text-secondary hover:bg-secondary/15 data-[state=open]:bg-secondary/15",
			},
			{
				variant: "soft",
				color: "success",
				className:
					"bg-success/10 text-success hover:bg-success/15 data-[state=open]:bg-success/15",
			},
			{
				variant: "soft",
				color: "warning",
				className:
					"bg-warning/10 text-warning hover:bg-warning/15 data-[state=open]:bg-warning/15",
			},
			{
				variant: "soft",
				color: "error",
				className:
					"bg-error/10 text-error hover:bg-error/15 data-[state=open]:bg-error/15",
			},
			{
				variant: "soft",
				color: "info",
				className:
					"bg-info/10 text-info hover:bg-info/15 data-[state=open]:bg-info/15",
			},

			// Outline variants
			{
				variant: "outline",
				color: "inherit",
				className:
					"border-current bg-transparent text-foreground hover:border-none hover:bg-foreground/10 data-[state=open]:bg-accent",
			},
			{
				variant: "outline",
				color: "primary",
				className:
					"border-primary bg-background text-primary hover:bg-primary/10 data-[state=open]:bg-primary/10",
			},
			{
				variant: "outline",
				color: "secondary",
				className:
					"border-secondary bg-background text-secondary hover:bg-secondary/10 data-[state=open]:bg-secondary/10",
			},
			{
				variant: "outline",
				color: "success",
				className:
					"border-success bg-background text-success hover:bg-success/10 data-[state=open]:bg-success/10",
			},
			{
				variant: "outline",
				color: "warning",
				className:
					"border-warning bg-background text-warning hover:bg-warning/10 data-[state=open]:bg-warning/10",
			},
			{
				variant: "outline",
				color: "error",
				className:
					"border-error bg-background text-error hover:bg-error/10 data-[state=open]:bg-error/10",
			},
			{
				variant: "outline",
				color: "info",
				className:
					"border-info bg-background text-info hover:bg-info/10 data-[state=open]:bg-info/10",
			},

			// Text variants
			{
				variant: "text",
				color: "inherit",
				className: "text-foreground",
			},
			{
				variant: "text",
				color: "primary",
				className: "text-primary",
			},
			{
				variant: "text",
				color: "secondary",
				className: "text-secondary",
			},
			{
				variant: "text",
				color: "success",
				className: "text-success",
			},
			{
				variant: "text",
				color: "warning",
				className: "text-warning",
			},
			{
				variant: "text",
				color: "error",
				className: "text-error",
			},
			{
				variant: "text",
				color: "info",
				className: "text-info",
			},

			// Dashed variants
			{
				variant: "dashed",
				color: "inherit",
				className:
					"border-current bg-background text-foreground hover:bg-accent hover:text-accent-foreground data-[state=open]:text-accent-foreground",
			},
			{
				variant: "dashed",
				color: "primary",
				className:
					"border-primary bg-background text-primary hover:bg-primary/10 hover:text-primary data-[state=open]:text-primary",
			},
			{
				variant: "dashed",
				color: "secondary",
				className:
					"border-secondary bg-background text-secondary hover:bg-secondary/10 hover:text-secondary data-[state=open]:text-secondary",
			},
			{
				variant: "dashed",
				color: "success",
				className:
					"border-success bg-background text-success hover:bg-success/10 hover:text-success data-[state=open]:text-success",
			},
			{
				variant: "dashed",
				color: "warning",
				className:
					"border-warning bg-background text-warning hover:bg-warning/10 hover:text-warning data-[state=open]:text-warning",
			},
			{
				variant: "dashed",
				color: "error",
				className:
					"border-error bg-background text-error hover:bg-error/10 hover:text-error data-[state=open]:text-error",
			},
			{
				variant: "dashed",
				color: "info",
				className:
					"border-info bg-background text-info hover:bg-info/10 hover:text-info data-[state=open]:text-info",
			},

			// Icons opacity for default mode
			{
				variant: "outline",
				mode: "default",
				className:
					"[&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60",
			},
			{
				variant: "dashed",
				mode: "default",
				className:
					"[&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60",
			},

			// Icons opacity for input/icon mode
			{
				variant: "outline",
				mode: "input",
				className:
					"[&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60",
			},
			{
				variant: "outline",
				mode: "icon",
				className:
					"[&_svg:not([role=img]):not([class*=text-]):not([class*=opacity-])]:opacity-60",
			},

			// Auto height
			{
				size: "md",
				autoHeight: true,
				className: "h-auto min-h-8.5",
			},
			{
				size: "sm",
				autoHeight: true,
				className: "h-auto min-h-7",
			},
			{
				size: "lg",
				autoHeight: true,
				className: "h-auto min-h-10",
			},

			// Shadow support for contained variants
			{
				variant: "contained",
				mode: "default",
				appearance: "default",
				className: "shadow-black/5 shadow-xs",
			},
			{
				variant: "outline",
				mode: "default",
				appearance: "default",
				className: "shadow-black/5 shadow-xs",
			},
			{
				variant: "dashed",
				mode: "default",
				appearance: "default",
				className: "shadow-black/5 shadow-xs",
			},

			// Shadow support for icon mode
			{
				variant: "contained",
				mode: "icon",
				appearance: "default",
				className: "shadow-black/5 shadow-xs",
			},
			{
				variant: "outline",
				mode: "icon",
				appearance: "default",
				className: "shadow-black/5 shadow-xs",
			},
			{
				variant: "dashed",
				mode: "icon",
				appearance: "default",
				className: "shadow-black/5 shadow-xs",
			},

			// Link mode with colors
			{
				color: "primary",
				mode: "link",
				underline: "solid",
				className:
					"font-semibold text-primary hover:text-primary/90 hover:underline hover:decoration-solid hover:underline-offset-4 [&_svg:not([role=img]):not([class*=text-])]:opacity-60",
			},
			{
				color: "primary",
				mode: "link",
				underline: "dashed",
				className:
					"font-semibold text-primary decoration-1 hover:text-primary/90 hover:underline hover:decoration-dashed hover:underline-offset-4 [&_svg:not([role=img]):not([class*=text-])]:opacity-60",
			},
			{
				color: "primary",
				mode: "link",
				underlined: "solid",
				className:
					"font-semibold text-primary underline decoration-solid underline-offset-4 hover:text-primary/90 [&_svg:not([role=img]):not([class*=text-])]:opacity-60",
			},
			{
				color: "primary",
				mode: "link",
				underlined: "dashed",
				className:
					"font-semibold text-primary underline decoration-1 decoration-dashed underline-offset-4 hover:text-primary/90 [&_svg]:opacity-60",
			},

			{
				color: "inherit",
				mode: "link",
				underline: "solid",
				className:
					"font-semibold text-inherit hover:underline hover:decoration-solid hover:underline-offset-4 [&_svg:not([role=img]):not([class*=text-])]:opacity-60",
			},
			{
				color: "inherit",
				mode: "link",
				underline: "dashed",
				className:
					"font-semibold text-inherit decoration-1 hover:underline hover:decoration-dashed hover:underline-offset-4 [&_svg:not([role=img]):not([class*=text-])]:opacity-60",
			},
			{
				color: "inherit",
				mode: "link",
				underlined: "solid",
				className:
					"font-semibold text-inherit underline decoration-solid underline-offset-4 [&_svg:not([role=img]):not([class*=text-])]:opacity-60",
			},
			{
				color: "inherit",
				mode: "link",
				underlined: "dashed",
				className:
					"font-semibold text-inherit underline decoration-1 decoration-dashed underline-offset-4 [&_svg:not([role=img]):not([class*=text-])]:opacity-60",
			},

			// Ghost appearance overrides
			{
				variant: "contained",
				color: "primary",
				appearance: "ghost",
				className:
					"bg-transparent text-primary/90 hover:bg-primary/5 data-[state=open]:bg-primary/5",
			},
			{
				variant: "contained",
				color: "error",
				appearance: "ghost",
				className:
					"bg-transparent text-error/90 hover:bg-error/5 data-[state=open]:bg-error/5",
			},
			{
				variant: "contained",
				color: "inherit",
				appearance: "ghost",
				className:
					"bg-transparent text-foreground/90 hover:bg-secondary data-[state=open]:bg-secondary",
			},

			// Size adjustments for icon mode
			{
				size: "sm",
				mode: "icon",
				className: "h-7 w-7 p-0 [&_svg:not([class*=size-])]:size-3.5",
			},
			{
				size: "md",
				mode: "icon",
				className: "h-8.5 w-8.5 p-0 [&_svg:not([class*=size-])]:size-4",
			},
			{
				size: "icon",
				className: "h-8.5 w-8.5 p-0 [&_svg:not([class*=size-])]:size-4",
			},
			{
				size: "lg",
				mode: "icon",
				className: "h-10 w-10 p-0 [&_svg:not([class*=size-])]:size-4",
			},

			// Input mode
			{
				mode: "input",
				placeholder: true,
				variant: "outline",
				className: "font-normal text-muted-foreground",
			},
			{
				mode: "input",
				variant: "outline",
				size: "sm",
				className: "gap-1.25",
			},
			{
				mode: "input",
				variant: "outline",
				size: "md",
				className: "gap-1.5",
			},
			{
				mode: "input",
				variant: "outline",
				size: "lg",
				className: "gap-1.5",
			},
		],
		defaultVariants: {
			variant: "contained",
			color: "primary",
			mode: "default",
			size: "md",
			shape: "default",
			appearance: "default",
		},
	},
);

interface ButtonProps
	extends Omit<React.ComponentProps<"button">, "color">,
		VariantProps<typeof buttonVariants> {
	selected?: boolean;
	asChild?: boolean;
	href?: LinkProps["href"];
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	loading?: boolean;
	loadingText?: string;
}

function Button({
	className,
	selected,
	variant,
	color,
	shape,
	appearance,
	mode,
	size,
	autoHeight,
	underlined,
	underline,
	asChild = false,
	placeholder = false,
	href,
	leftIcon,
	rightIcon,
	loading = false,
	loadingText,
	children,
	...props
}: ButtonProps) {
	let Comp: React.ElementType = "button";
	if (asChild) {
		Comp = SlotPrimitive.Slot;
	} else if (href) {
		Comp = Link;
	}

	const buttonContent = (
		<>
			{loading && <Loader2 className="animate-spin" />}
			{!loading && leftIcon}
			{loading && loadingText ? loadingText : children}
			{!loading && rightIcon}
		</>
	);

	const buttonProps = {
		"data-slot": "button",
		className: cn(
			buttonVariants({
				variant,
				size,
				shape,
				appearance,
				mode,
				autoHeight,
				placeholder,
				underlined,
				underline,
				color,
				className,
			}),
			(asChild || href) && props.disabled && "pointer-events-none opacity-50",
		),
		...(selected && { "data-state": "open" }),
		...(href && { href }),
		...props,
	};

	return <Comp {...buttonProps}>{buttonContent}</Comp>;
}

interface ButtonArrowProps extends React.SVGProps<SVGSVGElement> {
	icon?: LucideIcon; // Allows passing any Lucide icon
}

function ButtonArrow({
	icon: Icon = ChevronDown,
	className,
	...props
}: ButtonArrowProps) {
	return (
		<Icon
			data-slot="button-arrow"
			className={cn("-me-1 ms-auto", className)}
			{...props}
		/>
	);
}

export { Button, ButtonArrow, buttonVariants };

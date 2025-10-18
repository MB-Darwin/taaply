// animations.ts

import { cubicBezier } from "motion"; // for custom easing
import type { Variants } from "motion/react";

export const containerVariants: Variants = {
	initial: {
		maxWidth: "80rem",
		paddingLeft: "1.5rem",
		paddingRight: "1.5rem",
	},
	scrolled: {
		maxWidth: "64rem",
		paddingLeft: "1.25rem",
		paddingRight: "1.25rem",
	},
};

export const mobileMenuVariants: Variants = {
	closed: { opacity: 0, height: 0 },
	open: { opacity: 1, height: "auto" },
};

export const mobileMenuListVariants: Variants = {
	closed: {},
	open: {},
};

export const menuItemVariants: Variants = {
	closed: { opacity: 0, x: -20 },
	open: { opacity: 1, x: 0 },
};

export const toggleLineVariants = {
	top: {
		closed: { rotate: 0, y: 0 },
		open: { rotate: 45, y: 4 },
	} satisfies Variants,
	bottom: {
		closed: { rotate: 0, y: 0 },
		open: { rotate: -45, y: -4 },
	} satisfies Variants,
};

export const logoVariants: Variants = {
	rest: { scale: 1 },
	hover: { scale: 1.05 },
};

// Optional, reuse transitions as constants in components
export const transitions = {
	container: {
		duration: 0.3,
		easing: cubicBezier(0.4, 0, 0.2, 1),
	},
	menuOpen: { duration: 0.3, easing: "ease-out" },
	menuClose: { duration: 0.2, easing: "ease-in-out" },
	quick: { duration: 0.2, easing: "ease-out" },
};

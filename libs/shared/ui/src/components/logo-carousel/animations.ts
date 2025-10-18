import { cubicBezier, stagger } from "motion";
import type { Variants } from "motion/react";

/**
 * Logo item hover animation
 */
export const logoItemVariants: Variants = {
	rest: {
		scale: 1,
		opacity: 0.8,
		filter: "grayscale(100%)",
	},
	hover: {
		scale: 1.1,
		opacity: 1,
		filter: "grayscale(0%)",
	},
};

/**
 * Container fade-in animation
 */
export const containerVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

/**
 * Title slide-in animation
 */
export const titleVariants: Variants = {
	hidden: { opacity: 0, x: -20 },
	visible: { opacity: 1, x: 0 },
};

/**
 * Slider fade-in animation
 */
export const sliderVariants: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

// Reusable transitions (use via the `transition` prop)
export const transitions = {
	easeOut: { duration: 0.3, easing: "ease-out" as const },
	easeOutMed: { duration: 0.5, easing: "ease-out" as const },
	container: {
		duration: 0.6,
		easing: cubicBezier(0.4, 0, 0.2, 1),
	},
	slider: { duration: 0.5, delay: 0.2, easing: "ease-out" as const },
	// For staggering children (option 1)
	listStagger: { delay: stagger(0.1) },
};

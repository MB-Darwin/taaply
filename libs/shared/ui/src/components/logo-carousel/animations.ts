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

import type { Variants } from "motion/react";

/**
 * Footer container fade-up animation
 */
export const footerVariants: Variants = {
	hidden: { opacity: 0, y: 40 },
	visible: { opacity: 1, y: 0 },
};

/**
 * Grid fade-in (stagger handled via transition on children)
 */
export const gridVariants: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

/**
 * Column slide-up animation
 */
export const columnVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

/**
 * Link list fade-in
 */
export const linkListVariants: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

export const linkItemVariants: Variants = {
	hidden: { opacity: 0, x: -10 },
	visible: { opacity: 1, x: 0 },
};

/**
 * Logo scale/rotate
 */
export const logoVariants: Variants = {
	rest: { scale: 1, rotate: 0 },
	hover: { scale: 1.05, rotate: 5 },
};

/**
 * Bottom bar slide-up
 */
export const bottomBarVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

"use client";

import type { Variants } from "motion/react";

export const containerVariants: Variants = {
	hidden: { opacity: 0, y: 6 },
	visible: { opacity: 1, y: 0 },
};

export const itemVariants: Variants = {
	hidden: { opacity: 0, scale: 0.96 },
	visible: { opacity: 1, scale: 1 },
};

export const attachmentItemVariants: Variants = {
	hidden: { opacity: 0, y: 6 },
	visible: { opacity: 1, y: 0 },
};

export const dialogCardVariants: Variants = {
	hidden: { opacity: 0, scale: 0.96 },
	visible: { opacity: 1, scale: 1 },
	exit: { opacity: 0, scale: 0.96 },
};

export const hoverScale = { scale: 1.02 };
export const tapScale = { scale: 0.98 };

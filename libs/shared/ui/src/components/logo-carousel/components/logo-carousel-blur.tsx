"use client";

import { cn } from "@taaply/utils";
import { ProgressiveBlur } from "../../progressive-blur/progressive-blur";
import type { LogoCarouselBlurProps } from "../types";

/**
 * LogoCarouselBlur - Progressive blur overlay
 * Creates fade-out effect on edges
 */
export function LogoCarouselBlur({
	direction,
	intensity = 1,
	width = 80,
	className,
}: LogoCarouselBlurProps) {
	return (
		<ProgressiveBlur
			blurIntensity={intensity}
			direction={direction}
			className={cn(
				"pointer-events-none absolute top-0 h-full",
				direction === "left" ? "left-0" : "right-0",
				className,
			)}
			style={{ width: `${width}px` }}
		/>
	);
}

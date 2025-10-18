"use client";

import { cn } from "@taaply/utils";
import { motion } from "motion/react";
import { InfiniteSlider } from "../../infinite-slider/infinite-slider";
import { sliderVariants } from "../animations";
import { useLogoCarousel } from "../hooks/use-logo-carousel";
import type { LogoCarouselSliderProps } from "../types";
import { LogoCarouselBlur } from "./logo-carousel-blur";

/**
 * LogoCarouselSlider - Infinite slider wrapper
 * Handles animation and blur overlays
 */
export function LogoCarouselSlider({
	children,
	enableBlur = true,
	blurIntensity = 1,
	className,
}: LogoCarouselSliderProps) {
	const { speed, speedOnHover, gap } = useLogoCarousel();

	return (
		<motion.div
			className={cn("relative py-6 md:w-[calc(100%-11rem)]", className)}
			variants={sliderVariants}
		>
			<InfiniteSlider gap={gap} speed={speed} speedOnHover={speedOnHover}>
				{children}
			</InfiniteSlider>

			{/* Blur Overlays */}
			{enableBlur && (
				<>
					<div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-background"></div>
					<div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-background"></div>
					<LogoCarouselBlur direction="left" intensity={blurIntensity} />
					<LogoCarouselBlur direction="right" intensity={blurIntensity} />
				</>
			)}
		</motion.div>
	);
}

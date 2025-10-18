"use client";

import { useContext } from "react";
import { LogoCarouselContext } from "../logo-carousel-context";

/**
 * Hook to access LogoCarousel context
 * @throws {Error} If used outside of LogoCarousel component
 * @example
 * ```tsx
 * const { speed, pause } = useLogoCarousel()
 * ```
 */
export function useLogoCarousel() {
	const context = useContext(LogoCarouselContext);

	if (!context) {
		throw new Error(
			"⚠️ useLogoCarousel must be used within <LogoCarousel>. " +
				"Wrap your component tree with <LogoCarousel>...</LogoCarousel>",
		);
	}

	return context;
}

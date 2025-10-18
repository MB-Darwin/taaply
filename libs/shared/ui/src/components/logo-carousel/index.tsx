/**
 * LogoCarousel - Compound Component Pattern
 *
 * An animated, infinite logo carousel with blur effects.
 * Built for Next.js 15 with motion/react.
 *
 * @module LogoCarousel
 */

import { LogoCarouselBlur } from "./components/logo-carousel-blur";
import { LogoCarouselContainer } from "./components/logo-carousel-container";
import { LogoCarouselItem } from "./components/logo-carousel-item";
import { LogoCarouselSlider } from "./components/logo-carousel-slider";
import { LogoCarouselTitle } from "./components/logo-carousel-title";
import { LogoCarousel as LogoCarouselRoot } from "./logo-carousel";

// Compound component composition
export const LogoCarousel = Object.assign(LogoCarouselRoot, {
	Container: LogoCarouselContainer,
	Title: LogoCarouselTitle,
	Slider: LogoCarouselSlider,
	Item: LogoCarouselItem,
	Blur: LogoCarouselBlur,
});

// Export hook and types
export { useLogoCarousel } from "./hooks/use-logo-carousel";
export type * from "./types";

// Default export
export default LogoCarousel;

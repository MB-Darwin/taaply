"use client";

import { LogoCarouselProvider } from "./logo-carousel-context";
import type { LogoCarouselProps } from "./types";

/**
 * LogoCarousel - Compound Component Root
 *
 * An infinite, animated logo carousel with blur effects and responsive design.
 * Built with motion/react for smooth animations.
 *
 * @example
 * ```tsx
 * <LogoCarousel speed={40} gap={112}>
 *   <LogoCarousel.Container>
 *     <LogoCarousel.Title>Trusted by 300+ companies</LogoCarousel.Title>
 *
 *     <LogoCarousel.Slider enableBlur>
 *       {logos.map((logo) => (
 *         <LogoCarousel.Item key={logo.alt}>
 *           <Image src={logo.src} alt={logo.alt} />
 *         </LogoCarousel.Item>
 *       ))}
 *     </LogoCarousel.Slider>
 *   </LogoCarousel.Container>
 * </LogoCarousel>
 * ```
 */
export function LogoCarousel({
	children,
	speed = 40,
	speedOnHover = 20,
	gap = 112,
	className,
}: LogoCarouselProps) {
	return (
		<LogoCarouselProvider speed={speed} speedOnHover={speedOnHover} gap={gap}>
			<section className={className} aria-label="Customer logos">
				{children}
			</section>
		</LogoCarouselProvider>
	);
}

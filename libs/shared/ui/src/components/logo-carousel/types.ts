import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";

export interface LogoCarouselContextValue {
	/** Slider speed in pixels per second */
	speed: number;
	/** Speed when hovering */
	speedOnHover: number;
	/** Gap between items in pixels */
	gap: number;
	/** Whether slider is paused */
	isPaused: boolean;
	/** Pause the slider */
	pause: () => void;
	/** Resume the slider */
	resume: () => void;
}

export interface LogoCarouselProps {
	children: ReactNode;
	/** Base slider speed (px/s) */
	speed?: number;
	/** Hover speed (px/s) */
	speedOnHover?: number;
	/** Gap between items (px) */
	gap?: number;
	/** Custom className */
	className?: string;
}

export interface LogoCarouselContainerProps {
	children: ReactNode;
	className?: string;
}

export interface LogoCarouselTitleProps {
	children: ReactNode;
	/** Title alignment */
	align?: "left" | "center" | "right";
	/** Show border separator */
	showBorder?: boolean;
	className?: string;
}

export interface LogoCarouselSliderProps {
	children: ReactNode;
	/** Enable blur edges */
	enableBlur?: boolean;
	/** Blur intensity (0-10) */
	blurIntensity?: number;
	className?: string;
}

export interface LogoCarouselItemProps {
	children: ReactNode;
	/** Item width */
	width?: number;
	/** Item height */
	height?: number;
	/** Alternative dark mode variant */
	darkInvert?: boolean;
	className?: string;
}

export interface LogoCarouselBlurProps {
	/** Blur direction */
	direction: "left" | "right";
	/** Blur intensity (0-10) */
	intensity?: number;
	/** Blur width */
	width?: number;
	className?: string;
}

export type Logo = {
	src: string | StaticImageData;
	alt: string;
	width?: number;
	height?: number;
};

"use client";

import { createContext, useCallback, useState } from "react";
import type { LogoCarouselContextValue, LogoCarouselProps } from "./types";

export const LogoCarouselContext =
	createContext<LogoCarouselContextValue | null>(null);

if (process.env.NODE_ENV === "development") {
	LogoCarouselContext.displayName = "LogoCarouselContext";
}

interface LogoCarouselProviderProps extends LogoCarouselProps {
	children: React.ReactNode;
}

/**
 * LogoCarousel Provider Component
 * Manages slider state and configuration
 */
export function LogoCarouselProvider({
	children,
	speed = 40,
	speedOnHover = 20,
	gap = 112,
}: LogoCarouselProviderProps) {
	const [isPaused, setIsPaused] = useState(false);

	const pause = useCallback(() => {
		setIsPaused(true);
	}, []);

	const resume = useCallback(() => {
		setIsPaused(false);
	}, []);

	const value: LogoCarouselContextValue = {
		speed,
		speedOnHover,
		gap,
		isPaused,
		pause,
		resume,
	};

	return (
		<LogoCarouselContext.Provider value={value}>
			{children}
		</LogoCarouselContext.Provider>
	);
}

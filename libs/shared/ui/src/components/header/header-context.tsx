"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { createContext, useCallback, useEffect, useState } from "react";
import type { HeaderContextValue, HeaderProps } from "./types";

export const HeaderContext = createContext<HeaderContextValue | null>(null);

if (process.env.NODE_ENV === "development") {
	HeaderContext.displayName = "HeaderContext";
}

interface HeaderProviderProps extends HeaderProps {
	children: React.ReactNode;
}

/**
 * Header Provider Component
 * Manages mobile menu state and scroll detection
 */
export function HeaderProvider({
	children,
	scrollThreshold = 0.05,
}: HeaderProviderProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);

	const { scrollYProgress } = useScroll();

	// Handle scroll changes with motion value
	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		setScrollProgress(latest);
		setIsScrolled(latest > scrollThreshold);
	});

	// Close menu when scrolling
	useEffect(() => {
		if (isScrolled && isMenuOpen) {
			setIsMenuOpen(false);
		}
	}, [isScrolled, isMenuOpen]);

	// Prevent body scroll when menu is open
	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [isMenuOpen]);

	const toggleMenu = useCallback(() => {
		setIsMenuOpen((prev) => !prev);
	}, []);

	const closeMenu = useCallback(() => {
		setIsMenuOpen(false);
	}, []);

	const value: HeaderContextValue = {
		isMenuOpen,
		toggleMenu,
		closeMenu,
		isScrolled,
		scrollProgress,
	};

	return (
		<HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
	);
}

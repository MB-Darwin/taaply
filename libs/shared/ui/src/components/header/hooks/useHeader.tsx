"use client";

import { useContext } from "react";
import { HeaderContext } from "../header-context";

/**
 * Hook to access Header context
 * @throws {Error} If used outside of Header component
 * @example
 * ```tsx
 * const { isMenuOpen, toggleMenu } = useHeader()
 * ```
 */
export function useHeader() {
	const context = useContext(HeaderContext);

	if (!context) {
		throw new Error(
			"⚠️ useHeader must be used within <Header>. " +
				"Wrap your component tree with <Header>...</Header>",
		);
	}

	return context;
}

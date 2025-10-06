"use client";

import type React from "react";
import { ParallaxProvider } from "react-scroll-parallax";

function Providers({ children }: { children: React.ReactNode }) {
	return <ParallaxProvider>{children}</ParallaxProvider>;
}

export default Providers;

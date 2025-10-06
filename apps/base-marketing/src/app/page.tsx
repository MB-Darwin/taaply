"use client";

import { HeroHeader } from "@taaply/ui";
import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { HeroSection } from "../components/hero-section";

export default function Page() {
	const containerRef = useRef<HTMLDivElement>(null);
	// Track progress within the container
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	});

	return (
		<>
			<HeroHeader />

			{/* Scrollable container with both sections */}
			<div ref={containerRef} className="relative h-screen">
				{/* Hero stays fixed at top */}

				<HeroSection scrollProgress={scrollYProgress} />
			</div>

			{/* Next section parallaxes up over hero */}
			<div className={"h-dvh"}>Test</div>
		</>
	);
}

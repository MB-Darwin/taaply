"use client";

import { CustomerLogos, FooterSection, HeroHeader } from "@taaply/ui";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { HeroSection } from "@/marketing/components/sections/hero-section";
import { ServicesSection } from "@/marketing/components/sections/services-section";

export function HomePageClient() {
	const containerRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	});

	const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

	return (
		<div ref={containerRef}>
			<HeroHeader />

			<motion.div style={{ y: heroY }}>
				<HeroSection scrollProgress={scrollYProgress} />
			</motion.div>

			<main className="relative z-10 min-h-screen bg-background">
				<CustomerLogos />
				<ServicesSection />
				<FooterSection />
			</main>
		</div>
	);
}

"use client";

import { Badge, BadgeDot, Particles } from "@taaply/ui";
import {
	type MotionValue,
	motion,
	useMotionValueEvent,
	useScroll,
	useSpring,
	useTransform,
} from "motion/react";
import React, { useEffect, useRef } from "react";
import { PromptInputBox } from "./ai-prompt-box";

const PROJECTS = [
	{ label: "Taaply Connect App", color: "text-primary" },
	{ label: "MS Web App", color: "text-success" },
	{ label: "Corporate Web App", color: "text-warning" },
	{ label: "SaaS Web App", color: "text-error" },
];

interface HeroSectionProps {
	scrollProgress: MotionValue<number>;
}

export function HeroSection({ scrollProgress }: HeroSectionProps) {
	const [palette, setPalette] = React.useState<string[]>(["#6366F1"]);
	const handleSend = (message: string, files?: File[]) => {
		console.log("Message:", message);
		console.log("Files:", files);
	};
	// Smooth spring config for all animations
	const springConfig = {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	};

	// Use window scroll for particle direction
	const { scrollY } = useScroll();

	// For particle direction
	type Dir = 1 | -1;
	const dirRef = useRef<Dir>(-1);
	const prevScrollY = useRef(0);

	useMotionValueEvent(scrollY, "change", (latest) => {
		const dy = prevScrollY.current - latest;
		dirRef.current = dy > 0 ? 1 : -1;
		prevScrollY.current = latest;
	});

	// Overall hero opacity and scale for curtain effect (applied to scene, not overlay)
	const heroOpacity = useSpring(
		useTransform(scrollProgress, [0, 0.3, 0.7, 1], [1, 1, 0.8, 0.3]),
		springConfig,
	);

	const heroScale = useSpring(
		useTransform(scrollProgress, [0, 0.5, 1], [1, 0.95, 0.9]),
		springConfig,
	);

	// Dynamic gaps that expand on scroll down, contract on scroll up
	const elementGap = useSpring(
		useTransform(
			scrollProgress,
			[0, 0.1, 0.3, 0.6, 1],
			[40, 60, 100, 150, 210],
		),
		springConfig,
	);

	const badgeToTitleGap = useSpring(
		useTransform(scrollProgress, [0, 0.1, 0.3, 0.6, 1], [16, 30, 50, 75, 105]),
		springConfig,
	);

	const titleToSubtitleGap = useSpring(
		useTransform(scrollProgress, [0, 0.1, 0.3, 0.6, 1], [12, 25, 40, 60, 84]),
		springConfig,
	);

	const promptSpacing = useSpring(
		useTransform(scrollProgress, [0, 0.2, 0.5, 1], [0, 40, 80, 130]),
		springConfig,
	);

	// Individual element parallax with smooth springs
	const badgeY = useSpring(
		useTransform(scrollProgress, [0, 0.3, 0.7, 1], [0, -30, -70, -120]),
		springConfig,
	);

	const titleY = useSpring(
		useTransform(scrollProgress, [0, 0.3, 0.7, 1], [0, -45, -100, -180]),
		springConfig,
	);

	const subtitleY = useSpring(
		useTransform(scrollProgress, [0, 0.3, 0.7, 1], [0, -60, -140, -240]),
		springConfig,
	);

	const promptY = useSpring(
		useTransform(scrollProgress, [0, 0.3, 0.7, 1], [0, -75, -175, -300]),
		springConfig,
	);

	// Scale effects
	const badgeScale = useSpring(
		useTransform(scrollProgress, [0, 0.5, 1], [1, 0.92, 0.85]),
		springConfig,
	);

	const titleScale = useSpring(
		useTransform(scrollProgress, [0, 0.5, 1], [1, 0.95, 0.9]),
		springConfig,
	);

	const subtitleScale = useSpring(
		useTransform(scrollProgress, [0, 0.5, 1], [1, 0.93, 0.88]),
		springConfig,
	);

	// Letter spacing animation
	const letterSpacing = useSpring(
		useTransform(scrollProgress, [0, 0.3, 0.7, 1], [0, 5, 12, 20]),
		springConfig,
	);

	// Projects animation
	const projectsGap = useSpring(
		useTransform(scrollProgress, [0, 0.3, 0.7, 1], [16, 24, 32, 48]),
		springConfig,
	);

	const projectsOpacity = useSpring(
		useTransform(scrollProgress, [0, 0.3, 0.7, 1], [1, 0.9, 0.6, 0.3]),
		springConfig,
	);

	// Blur + White overlay
	const blurAmount = useSpring(
		useTransform(scrollProgress, [0, 0.3, 0.7, 1], [0, 2, 8, 16]),
		springConfig,
	);
	const blurFilter = useTransform(blurAmount, (v) => `blur(${v}px)`);

	const whiteoutOpacity = useSpring(
		useTransform(scrollProgress, [0, 0.3, 0.7, 1], [0, 0.2, 0.6, 1]),
		springConfig,
	);

	// Palette hydration
	useEffect(() => {
		const css = getComputedStyle(document.documentElement);
		const get = (name: string, fb = "#6366F1") =>
			css.getPropertyValue(name).trim() || fb;
		setPalette([
			get("--primary"),
			get("--info", "#22d3ee"),
			get("--chart-3", "#f472b6"),
		]);
	}, []);

	return (
		<motion.div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
			{/* White overlay that ramps to full white; unaffected by hero opacity/scale */}
			<motion.div
				className="pointer-events-none absolute inset-0 z-30"
				style={{ background: "#fff", opacity: whiteoutOpacity }}
			/>

			{/* Scene wrapper: apply blur, opacity, scale, and gaps here */}
			<motion.div
				className="relative flex h-full w-full flex-col items-center justify-center"
				style={{
					opacity: heroOpacity,
					scale: heroScale,
					gap: elementGap,
					filter: blurFilter,
					willChange: "filter",
				}}
			>
				<div
					className="-z-20 absolute inset-0"
					style={{
						background:
							"radial-gradient(50% 50% at 50% 10%, #fff 70%, var(--muted) 100%)",
					}}
				/>

				{/* Particles background */}
				<Particles directionRef={dirRef} count={30} colors={palette} />

				{/* Text group container */}
				<motion.div className="flex flex-col items-center">
					{/* Badge */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						style={{
							y: badgeY,
							scale: badgeScale,
						}}
					>
						<Badge variant="outline" shape="pill" color="secondary" size="lg">
							<span className="relative flex">
								<BadgeDot
									color="primary"
									className="absolute inline-flex h-full w-full animate-ping opacity-75"
								/>
								<BadgeDot color="primary" className="relative inline-flex" />
							</span>
							Introducing TAI Agent Template
						</Badge>
					</motion.div>

					{/* Spacer between Badge and Title */}
					<motion.div aria-hidden style={{ height: badgeToTitleGap }} />

					{/* Title */}
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.1 }}
						className="text-center font-bold text-4xl md:text-6xl"
						style={{
							y: titleY,
							scale: titleScale,
							letterSpacing,
						}}
					>
						Welcome! I am <span className="text-primary">TAI</span>
					</motion.h1>

					{/* Spacer between Title and Subtitle */}
					<motion.div aria-hidden style={{ height: titleToSubtitleGap }} />

					{/* Subtitle */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.2 }}
						className="text-center text-base text-muted-foreground md:text-lg"
						style={{
							y: subtitleY,
							scale: subtitleScale,
						}}
					>
						AI empowering Africa's people and progress
					</motion.p>
				</motion.div>

				{/* Dynamic spacer before prompt */}
				<motion.div aria-hidden style={{ height: promptSpacing }} />

				{/* Prompt input and Projects */}
				<motion.section
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.3 }}
					className="w-full px-4 sm:px-6 lg:max-w-4xl"
					style={{
						y: promptY,
					}}
				>
					<PromptInputBox onSend={handleSend} />

					{/* Projects with dynamic gap */}
					<motion.div
						className="mt-6 flex flex-wrap items-center justify-center"
						style={{
							gap: projectsGap,
							opacity: projectsOpacity,
						}}
					>
						{PROJECTS.map((project, index) => (
							<motion.div
								key={index}
								initial={{
									opacity: 0,
									y: 30,
									scale: 0.8,
									x: index % 2 === 0 ? -20 : 20,
								}}
								animate={{
									opacity: 1,
									y: 0,
									scale: 1,
									x: 0,
								}}
								transition={{
									duration: 0.5,
									delay: 0.5 + index * 0.1,
									ease: [0.21, 0.47, 0.32, 0.98],
								}}
								whileHover={{
									scale: 1.05,
									y: -2,
									transition: { duration: 0.2 },
								}}
								whileTap={{ scale: 0.95 }}
							>
								<Badge
									color="inherit"
									className={`${project.color} transition-all duration-300`}
									shape="pill"
									size="lg"
								>
									{project.label}
								</Badge>
							</motion.div>
						))}
					</motion.div>
				</motion.section>
			</motion.div>
		</motion.div>
	);
}

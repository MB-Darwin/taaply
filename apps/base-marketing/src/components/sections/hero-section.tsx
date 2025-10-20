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
import { m } from "@/marketing/paraglide/messages"; // Add this import

const useTypingEffect = (text: string, speed: number = 100) => {
	const [displayedText, setDisplayedText] = React.useState("");
	const [isComplete, setIsComplete] = React.useState(false);

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout> | undefined;

		if (displayedText.length < text.length) {
			timeout = setTimeout(() => {
				setDisplayedText(text.slice(0, displayedText.length + 1));
			}, speed);
		} else {
			setIsComplete(true);
		}

		return () => {
			if (timeout) clearTimeout(timeout);
		};
	}, [displayedText, text, speed]);

	return { displayedText, isComplete };
};

// ✅ Moved inside component to access m.*
interface HeroSectionProps {
	scrollProgress: MotionValue<number>;
}

export function HeroSection({ scrollProgress }: HeroSectionProps) {
	// ✅ Projects array using translations
	const PROJECTS = [
		{ label: m.hero_project_taaply_connect_app(), color: "text-primary" },
		{ label: m.hero_project_ms_web_app(), color: "text-success" },
		{ label: m.hero_project_corporate_web_app(), color: "text-warning" },
		{ label: m.hero_project_saas_web_app(), color: "text-error" },
	];

	const [palette, setPalette] = React.useState<string[]>(["#6366F1"]);

	// ✅ Using translated strings
	const { displayedText: welcomeText, isComplete: welcomeComplete } =
		useTypingEffect(m.hero_title_welcome(), 80);
	const { displayedText: taiText } = useTypingEffect(
		welcomeComplete ? m.hero_title_ai_name() : "",
		100,
	);

	const springConfig = {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	};

	const { scrollY } = useScroll();

	type Dir = 1 | -1;
	const dirRef = useRef<Dir>(-1);
	const prevScrollY = useRef(0);

	useMotionValueEvent(scrollY, "change", (latest) => {
		const dy = prevScrollY.current - latest;
		dirRef.current = dy > 0 ? 1 : -1;
		prevScrollY.current = latest;
	});

	const heroOpacity = useSpring(
		useTransform(scrollProgress, [0, 0.5, 1], [1, 0.8, 0.5]),
		springConfig,
	);

	const badgeToTitleGap = useSpring(
		useTransform(scrollProgress, [0, 0.3, 0.6, 1], [24, 48, 80, 120]),
		springConfig,
	);
	const titleToSubtitleGap = useSpring(
		useTransform(scrollProgress, [0, 0.3, 0.6, 1], [16, 32, 56, 88]),
		springConfig,
	);
	const subtitleToPromptGap = useSpring(
		useTransform(scrollProgress, [0, 0.3, 0.6, 1], [32, 64, 104, 152]),
		springConfig,
	);
	const promptToProjectsGap = useSpring(
		useTransform(scrollProgress, [0, 0.3, 0.6, 1], [24, 40, 64, 96]),
		springConfig,
	);

	const letterSpacing = useSpring(
		useTransform(scrollProgress, [0, 0.5, 1], [0, 2, 4]),
		springConfig,
	);

	const projectsGap = useSpring(
		useTransform(scrollProgress, [0, 0.5, 1], [16, 24, 32]),
		springConfig,
	);
	const projectsOpacity = useSpring(
		useTransform(scrollProgress, [0, 0.5, 1], [1, 0.8, 0.6]),
		springConfig,
	);

	const blurAmount = useSpring(
		useTransform(scrollProgress, [0, 0.5, 1], [0, 4, 8]),
		springConfig,
	);
	const blurFilter = useTransform(blurAmount, (v) => `blur(${v}px)`);

	const gradientWhiteout = useSpring(
		useTransform(scrollProgress, [0, 0.4, 0.8, 1], [0, 0.3, 0.7, 1]),
		springConfig,
	);

	const whiteoutOpacity = useSpring(
		useTransform(scrollProgress, [0, 0.6, 1], [0, 0.3, 0.8]),
		springConfig,
	);

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
		<div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
			<motion.div
				className="-z-10 pointer-events-none absolute inset-0"
				style={{
					background:
						"radial-gradient(50% 50% at 50% 10%, #fff 70%, var(--muted) 100%)",
				}}
			/>

			<motion.div
				className="-z-10 pointer-events-none absolute inset-0"
				style={{
					background:
						"radial-gradient(50% 50% at 50% 10%, #fff 70%, #fff 100%)",
					opacity: gradientWhiteout,
				}}
			/>

			<motion.div
				className="pointer-events-none absolute inset-0 z-30"
				style={{ background: "#fff", opacity: whiteoutOpacity }}
			/>

			<motion.div
				className="relative flex h-full w-full flex-col items-center justify-center px-4"
				style={{
					opacity: heroOpacity,
					filter: blurFilter,
					willChange: "filter, opacity",
				}}
			>
				<Particles directionRef={dirRef} count={30} colors={palette} />

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<Badge variant="outline" shape="pill" color="secondary" size="lg">
						<span className="relative flex">
							<BadgeDot
								color="primary"
								className="absolute inline-flex h-full w-full animate-ping opacity-75"
							/>
							<BadgeDot color="primary" className="relative inline-flex" />
						</span>
						{m.hero_badge_introducing()}{" "}
						<span>
							<strong>T</strong>
							{m.hero_badge_taaply().slice(1)}
						</span>
						<span>
							<strong>A</strong>
							{m.hero_badge_artificial().slice(1)}
						</span>
						<span>
							<strong>I</strong>
							{m.hero_badge_intelligence().slice(1)}
						</span>
					</Badge>
				</motion.div>

				<motion.div aria-hidden style={{ height: badgeToTitleGap }} />

				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.1 }}
					className="min-h-[80px] text-balance text-center font-bold text-4xl md:text-6xl"
					style={{
						letterSpacing,
					}}
				>
					<span>{welcomeText}</span>
					<span className="text-primary">{taiText}</span>
					<span
						className={`ml-1 inline-block ${!welcomeComplete || taiText.length < 3 ? "animate-blink-cursor" : "opacity-0"}`}
					>
						|
					</span>
				</motion.h1>

				<motion.div aria-hidden style={{ height: titleToSubtitleGap }} />

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.2 }}
					className="text-pretty text-center text-base text-muted-foreground md:text-lg"
				>
					{m.hero_subtitle_tagline()}
				</motion.p>

				<motion.div aria-hidden style={{ height: subtitleToPromptGap }} />

				<motion.section
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.3 }}
					className="w-full sm:px-6 lg:max-w-4xl"
				>
					{/* <PromptSection /> */}
					<h5>Prompt input</h5>

					<motion.div aria-hidden style={{ height: promptToProjectsGap }} />

					<motion.div
						className="flex flex-wrap items-center justify-center"
						style={{
							gap: projectsGap,
							opacity: projectsOpacity,
						}}
					>
						{PROJECTS.map((project, index) => (
							<motion.div
								key={`${project.label} ${project.color}`}
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
		</div>
	);
}

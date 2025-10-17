"use client";

import {
	type MotionValue,
	motion,
	useMotionValueEvent,
	useScroll,
	useSpring,
	useTransform,
} from "motion/react";
import React, { useEffect, useRef } from "react";
import { PromptInputBox } from "../ai-prompt-box";
import { Badge, BadgeDot, Particles } from "@taaply/ui";

const useTypingEffect = (text: string, speed: number = 100) => {
	const [displayedText, setDisplayedText] = React.useState("");
	const [isComplete, setIsComplete] = React.useState(false);

	useEffect(() => {
		if (displayedText.length < text.length) {
			const timeout = setTimeout(() => {
				setDisplayedText(text.slice(0, displayedText.length + 1));
			}, speed);
			return () => clearTimeout(timeout);
		} else {
			setIsComplete(true);
		}
	}, [displayedText, text, speed]);

	return { displayedText, isComplete };
};

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
		console.log("[v0] Message:", message);
		console.log("[v0] Files:", files);
	};
	const { displayedText: welcomeText, isComplete: welcomeComplete } =
		useTypingEffect("Welcome! I'm ", 80);
	const { displayedText: taiText } = useTypingEffect(
		welcomeComplete ? "TAI" : "",
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
				className="pointer-events-none absolute inset-0 -z-10"
				style={{
					background:
						"radial-gradient(50% 50% at 50% 10%, #fff 70%, var(--muted) 100%)",
				}}
			/>

			<motion.div
				className="pointer-events-none absolute inset-0 -z-10"
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
						Introducing{" "}
						<span>
							<strong>T</strong>aaply
						</span>
						<span>
							<strong>A</strong>rtificial
						</span>
						<span>
							<strong>I</strong>ntelligence
						</span>
					</Badge>
				</motion.div>

				<motion.div aria-hidden style={{ height: badgeToTitleGap }} />

				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.1 }}
					className="text-balance text-center font-bold text-4xl md:text-6xl min-h-[80px]"
					style={{
						letterSpacing,
					}}
				>
					<span>{welcomeText}</span>
					<span className="text-primary">{taiText}</span>
					<span
						className={`inline-block ml-1 ${!welcomeComplete || taiText.length < 3 ? "animate-blink-cursor" : "opacity-0"}`}
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
					AI empowering Africa's people and progress
				</motion.p>

				<motion.div aria-hidden style={{ height: subtitleToPromptGap }} />

				<motion.section
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.3 }}
					className="w-full sm:px-6 lg:max-w-4xl"
				>
					<PromptInputBox onSend={handleSend} />

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

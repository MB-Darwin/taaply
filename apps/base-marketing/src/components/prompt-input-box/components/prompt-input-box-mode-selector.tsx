"use client";

import { cn } from "@taaply/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePromptInputBox } from "../hooks/use-prompt-input-box";

function Divider() {
	return (
		<div className="relative mx-1 h-6 w-[1.5px]">
			<div
				className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-primary/60 to-transparent"
				style={{
					clipPath:
						"polygon(0% 0%, 100% 0%, 100% 40%, 140% 50%, 100% 60%, 100% 100%, 0% 100%, 0% 60%, -40% 50%, 0% 40%)",
				}}
			/>
		</div>
	);
}

function ModePill({
	active,
	label,
	Icon,
	activeClass,
	onClick,
}: {
	active: boolean;
	label: string;
	Icon: React.ComponentType<{ className?: string }>;
	activeClass: string;
	onClick: () => void;
}) {
	const reduce = useReducedMotion();
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"flex h-8 items-center gap-1.5 rounded-full border px-1.5 py-1 transition-all duration-200",
				active
					? activeClass
					: "border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground",
			)}
			aria-pressed={active}
			aria-label={label}
		>
			<motion.div
				animate={{ rotate: active ? 360 : 0, scale: active ? 1.1 : 1 }}
				whileHover={{ rotate: active ? 360 : reduce ? 0 : 15, scale: 1.08 }}
				transition={{
					type: "spring",
					stiffness: 260,
					damping: 22,
					duration: reduce ? 0 : undefined,
				}}
				className="flex h-5 w-5 flex-shrink-0 items-center justify-center"
			>
				<Icon className="h-4 w-4" />
			</motion.div>
			<AnimatePresence mode="wait">
				{active && (
					<motion.span
						initial={{ width: 0, opacity: 0 }}
						animate={{ width: "auto", opacity: 1 }}
						exit={{ width: 0, opacity: 0 }}
						transition={{ duration: reduce ? 0 : 0.18 }}
						className="overflow-hidden whitespace-nowrap font-medium text-xs"
					>
						{label}
					</motion.span>
				)}
			</AnimatePresence>
		</button>
	);
}

/**
 * Mode selector with animated pills
 */
export function PromptInputBoxModeSelector({
	className,
}: {
	className?: string;
}) {
	const { mode, setMode, isRecording, modeConfig } = usePromptInputBox();

	const toggle = (m: "search" | "think" | "canvas") =>
		setMode(mode === m ? "idle" : m);

	return (
		<div
			className={cn(
				"flex items-center transition-opacity duration-300",
				isRecording && "invisible h-0 opacity-0",
				className,
			)}
		>
			<ModePill
				active={mode === "search"}
				label={modeConfig.search.label}
				Icon={modeConfig.search.Icon}
				activeClass={modeConfig.search.activeClass}
				onClick={() => toggle("search")}
			/>
			<Divider />
			<ModePill
				active={mode === "think"}
				label={modeConfig.think.label}
				Icon={modeConfig.think.Icon}
				activeClass={modeConfig.think.activeClass}
				onClick={() => toggle("think")}
			/>
			<Divider />
			<ModePill
				active={mode === "canvas"}
				label={modeConfig.canvas.label}
				Icon={modeConfig.canvas.Icon}
				activeClass={modeConfig.canvas.activeClass}
				onClick={() => toggle("canvas")}
			/>
		</div>
	);
}

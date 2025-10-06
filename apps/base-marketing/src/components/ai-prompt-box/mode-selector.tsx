"use client";

import { motion, AnimatePresence } from "motion/react";
import { Globe, BrainCog, FolderCode } from "lucide-react";
import { cn } from "@taaply/utils";
import type { Mode, ModeConfig } from "../../types/ai-prompt-box.types";

const MODE_CONFIG: Record<Exclude<Mode, "idle">, ModeConfig> = {
	search: {
		label: "Search",
		Icon: Globe,
		activeClass: "bg-sky-500/15 border-sky-500 text-sky-500 dark:text-sky-400",
		placeholder: "Search the web...",
	},
	think: {
		label: "Think",
		Icon: BrainCog,
		activeClass:
			"bg-violet-500/15 border-violet-500 text-violet-500 dark:text-violet-400",
		placeholder: "Think deeply...",
	},
	canvas: {
		label: "Canvas",
		Icon: FolderCode,
		activeClass:
			"bg-orange-500/15 border-orange-500 text-orange-500 dark:text-orange-400",
		placeholder: "Create on canvas...",
	},
};

interface ModePillProps {
	mode: Exclude<Mode, "idle">;
	activeMode: Mode;
	onToggle: (m: Mode) => void;
}

function ModePill({ mode, activeMode, onToggle }: ModePillProps) {
	const config = MODE_CONFIG[mode];
	const active = activeMode === mode;
	const { Icon } = config;

	return (
		<button
			type="button"
			onClick={() => onToggle(mode)}
			className={cn(
				"flex h-8 items-center gap-1.5 rounded-full border px-2.5 py-1 transition-all duration-200",
				active
					? config.activeClass
					: "border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground",
			)}
			aria-pressed={active}
			aria-label={config.label}
		>
			<motion.div
				animate={{ rotate: active ? 360 : 0, scale: active ? 1.1 : 1 }}
				whileHover={{
					rotate: active ? 360 : 15,
					scale: 1.08,
				}}
				transition={{ type: "spring", stiffness: 260, damping: 22 }}
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
						transition={{ duration: 0.18 }}
						className="overflow-hidden whitespace-nowrap font-medium text-xs"
					>
						{config.label}
					</motion.span>
				)}
			</AnimatePresence>
		</button>
	);
}

const Divider = () => (
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

interface ModeSelectorProps {
	mode: Mode;
	onModeChange: (mode: Mode) => void;
	isRecording?: boolean;
}

export function ModeSelector({
	mode,
	onModeChange,
	isRecording,
}: ModeSelectorProps) {
	const toggleMode = (m: Mode) => {
		onModeChange(mode === m ? "idle" : m);
	};

	return (
		<div
			className={cn(
				"flex items-center transition-opacity duration-300",
				isRecording && "invisible h-0 opacity-0",
			)}
		>
			<ModePill mode="search" activeMode={mode} onToggle={toggleMode} />
			<Divider />
			<ModePill mode="think" activeMode={mode} onToggle={toggleMode} />
			<Divider />
			<ModePill mode="canvas" activeMode={mode} onToggle={toggleMode} />
		</div>
	);
}

export { MODE_CONFIG };

"use client";

import { motion, stagger, useReducedMotion } from "motion/react";
import { containerVariants } from "../animations";
import { cn } from "@taaply/utils";
import { usePromptInputBox } from "../hooks/use-prompt-input-box";

/**
 * Visual container + dropzone for the input box
 */
export function PromptInputBoxContainer({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	const { handleDragOver, handleDrop, isRecording } = usePromptInputBox();
	const reduce = useReducedMotion();

	return (
		<motion.section
			role="form"
			aria-live="polite"
			aria-atomic="false"
			className={cn(
				// "rainbow-border relative items-center justify-center rounded-3xl text-sm after:absolute after:inset-0 after:block after:rounded-full after:-z-10",
				className,
			)}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			transition={{
				duration: reduce ? 0 : 0.25,
				delayChildren: stagger(0.04),
			}}
			data-recording={isRecording ? "true" : "false"}
		>
			<div
				className={cn(
					"w-full p-3 transition-all rounded-xl bg-accent duration-300 gap-2",
					// "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 focus-within:ring-offset-background",
				)}
			>
				{children}
			</div>
		</motion.section>
	);
}

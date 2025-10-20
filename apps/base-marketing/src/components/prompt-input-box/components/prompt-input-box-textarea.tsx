"use client";

import { Input } from "@taaply/ui";
import { cn } from "@taaply/utils";
import { useEffect, useRef } from "react";
import { usePromptInputBox } from "../hooks/use-prompt-input-box";

export function PromptInputBoxTextarea({
	className,
	disableAutosize = false,
}: {
	className?: string;
	disableAutosize?: boolean;
}) {
	const {
		input,
		setInput,
		handleSubmit,
		derivedPlaceholder,
		isLoading,
		isRecording,
		onPasteImage,
	} = usePromptInputBox();
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (disableAutosize || !textareaRef.current) return;
		const el = textareaRef.current;
		el.style.height = "auto";
		el.style.height = `${Math.min(el.scrollHeight, 240)}px`;
	});

	return (
		<div
			className={cn(
				"transition-all duration-300",
				isRecording ? "h-0 overflow-hidden opacity-0" : "opacity-100",
			)}
		>
			<Input
				// ref={textareaRef}
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter" && !e.shiftKey) {
						e.preventDefault();
						handleSubmit();
					}
				}}
				onPaste={(e) => {
					const items = e.clipboardData?.items;
					if (!items) return;
					for (let i = 0; i < items.length; i++) {
						if (items[i].type.startsWith("image/")) {
							const file = items[i].getAsFile();
							if (file) {
								e.preventDefault();
								onPasteImage(file);
								return;
							}
						}
					}
				}}
				placeholder={derivedPlaceholder}
				disabled={isLoading || isRecording}
				aria-label="Prompt input"
				className={cn(
					"h-auto resize border-border bg-transparent p-0 text-base shadow-none placeholder:text-sm focus-visible:ring-0",
					className,
				)}
			/>
		</div>
	);
}

"use client";

import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@taaply/ui";
import { ArrowUp, Mic, Square, StopCircle } from "lucide-react";
import { cn } from "@taaply/utils";
import { usePromptInputBox } from "../hooks/use-prompt-input-box";

export function PromptInputBoxSendButton({
	className,
}: {
	className?: string;
}) {
	const {
		isLoading,
		hasContent,
		handleSubmit,
		isRecording,
		setIsRecording,
		i18n,
		disableVoice,
	} = usePromptInputBox();

	const onClick = () => {
		if (isLoading) return;
		if (isRecording) setIsRecording(false);
		else if (hasContent) handleSubmit();
		else if (!disableVoice) setIsRecording(true);
	};

	const tooltip = isLoading
		? i18n.prompt_input_tooltip_stop_generation()
		: isRecording
			? i18n.prompt_input_tooltip_stop_recording()
			: hasContent
				? i18n.prompt_input_tooltip_send_message()
				: i18n.prompt_input_tooltip_voice_message();

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					color="inherit"
					size="icon"
					shape="pill"
					onClick={onClick}
					disabled={isLoading && !hasContent}
					className={cn(
						"transition-all duration-200",
						isRecording && "text-error hover:text-error/90",
						className,
					)}
				>
					{isLoading ? (
						<Square className="h-4 w-4 animate-pulse" />
					) : isRecording ? (
						<StopCircle className="h-5 w-5" />
					) : hasContent ? (
						<ArrowUp className="h-4 w-4" />
					) : (
						<Mic className="h-5 w-5" />
					)}
				</Button>
			</TooltipTrigger>
			<TooltipContent side="top">{tooltip}</TooltipContent>
		</Tooltip>
	);
}

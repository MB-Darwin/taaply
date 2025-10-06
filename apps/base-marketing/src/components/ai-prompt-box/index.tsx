"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ArrowUp, Paperclip, Square, StopCircle, Mic } from "lucide-react";
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@taaply/ui";
import { cn } from "@taaply/utils";
import {
	PromptInput,
	PromptInputTextarea,
	PromptInputActions,
	// useMergedRefs,
} from "./prompt-input";
import { VoiceRecorder } from "./voice-recorder";
import { ImageViewDialog } from "./image-view-dialog";
import { ModeSelector, MODE_CONFIG } from "./mode-selector";
import { AttachmentPreview } from "./attachment-preview";
import type {
	Mode,
	Attachment,
	PromptInputBoxProps,
} from "../../types/ai-prompt-box.types";

export function PromptInputBox({
	onSend = () => {},
	isLoading = false,
	placeholder,
	className,
}: PromptInputBoxProps) {
	const [input, setInput] = useState("");
	const [attachments, setAttachments] = useState<Attachment[]>([]);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [isRecording, setIsRecording] = useState(false);
	const [mode, setMode] = useState<Mode>("idle");

	const uploadInputRef = useRef<HTMLInputElement>(null);
	const localRef = useRef<HTMLDivElement>(null);

	// File validation
	const isImageFile = (file: File) => file.type.startsWith("image/");
	const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

	const processFile = useCallback((file: File) => {
		if (!isImageFile(file)) {
			console.warn("Only image files are allowed");
			return;
		}
		if (file.size > MAX_FILE_SIZE) {
			console.warn("File too large (max 10MB)");
			return;
		}

		const url = URL.createObjectURL(file);
		setAttachments((prev) => {
			// Clean up previous URLs
			prev.forEach((att) => URL.revokeObjectURL(att.previewUrl));
			return [
				{
					id: crypto.randomUUID(),
					file,
					kind: "image",
					previewUrl: url,
				},
			];
		});
	}, [isImageFile]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			attachments.forEach((att) => URL.revokeObjectURL(att.previewUrl));
		};
	}, [attachments]);

	// Drag & Drop handlers
	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			const files = Array.from(e.dataTransfer.files);
			const image = files.find((f) => isImageFile(f));
			if (image) processFile(image);
		},
		[processFile, isImageFile],
	);

	const handleRemoveAttachment = (id: string) => {
		setAttachments((prev) => {
			const att = prev.find((a) => a.id === id);
			if (att) URL.revokeObjectURL(att.previewUrl);
			return prev.filter((a) => a.id !== id);
		});
	};

	const handleSubmit = () => {
		if (!input.trim() && attachments.length === 0) return;

		const prefix =
			mode === "search"
				? "[Search: "
				: mode === "think"
					? "[Think: "
					: mode === "canvas"
						? "[Canvas: "
						: "";
		const formatted = prefix ? `${prefix}${input}]` : input;

		onSend(
			formatted,
			attachments.map((a) => a.file),
		);

		// Reset state
		setInput("");
		setAttachments((prev) => {
			prev.forEach((att) => URL.revokeObjectURL(att.previewUrl));
			return [];
		});
		setMode("idle");
	};

	const handleStartRecording = () => {
		// Implement MediaRecorder API here
		console.log("Starting recording...");
	};

	const handleStopRecording = (duration: number) => {
		setIsRecording(false);
		onSend(`[Voice message - ${duration} seconds]`, []);
	};

	const hasContent = input.trim() !== "" || attachments.length > 0;

	const derivedPlaceholder =
		placeholder ??
		(mode !== "idle" && MODE_CONFIG[mode as Exclude<Mode, "idle">]
			? MODE_CONFIG[mode as Exclude<Mode, "idle">].placeholder
			: "Type your message here...");

	return (
		<div className="rainbow-border after:-z-10 relative items-center justify-center rounded-3xl text-sm after:absolute after:inset-0 after:block after:rounded-full">
			<PromptInput
				ref={localRef}
				value={input}
				onValueChange={setInput}
				isLoading={isLoading}
				onSubmit={handleSubmit}
				disabled={isLoading || isRecording}
				className={cn(
					"w-full transition-all duration-300 ease-in-out",

					className,
				)}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				onPasteImage={processFile}
			>
				<AttachmentPreview
					attachments={attachments}
					onRemove={handleRemoveAttachment}
					onImageClick={setSelectedImage}
					isRecording={isRecording}
				/>

				<div
					className={cn(
						"transition-all duration-300",
						isRecording ? "h-0 overflow-hidden opacity-0" : "opacity-100",
					)}
				>
					<PromptInputTextarea placeholder={derivedPlaceholder} />
				</div>

				{isRecording && (
					<VoiceRecorder
						isRecording={isRecording}
						onStartRecording={handleStartRecording}
						onStopRecording={handleStopRecording}
					/>
				)}

				<PromptInputActions>
					<div className="flex items-center gap-2">
						<Tooltip>
							<TooltipTrigger asChild disabled={isRecording}>
								<button
									onClick={() => uploadInputRef.current?.click()}
									className={cn(
										"flex h-8 w-8 cursor-pointer items-center justify-center rounded-full",
										"text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground",
										"disabled:cursor-not-allowed disabled:opacity-50",
									)}
									disabled={isRecording}
									aria-label="Upload image"
								>
									<Paperclip className="h-5 w-5" />
									<input
										ref={uploadInputRef}
										type="file"
										className="hidden"
										accept="image/*"
										onChange={(e) => {
											const f = e.target.files?.[0];
											if (f) processFile(f);
											e.currentTarget.value = "";
										}}
									/>
								</button>
							</TooltipTrigger>
							<TooltipContent side="top">Upload image</TooltipContent>
						</Tooltip>

						<ModeSelector
							mode={mode}
							onModeChange={setMode}
							isRecording={isRecording}
						/>
					</div>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								color="inherit"
								appearance={hasContent ? "default" : "ghost"}
								size="icon"
								shape="pill"
								onClick={() => {
									if (isLoading) return; // Add stop generation logic if needed
									if (isRecording) setIsRecording(false);
									else if (hasContent) handleSubmit();
									else setIsRecording(true);
								}}
								disabled={isLoading && !hasContent}
								className={cn(
									"transition-all duration-200",
									isRecording && "text-destructive hover:text-destructive/90",
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
						<TooltipContent side="top">
							{isLoading
								? "Stop generation"
								: isRecording
									? "Stop recording"
									: hasContent
										? "Send message"
										: "Voice message"}
						</TooltipContent>
					</Tooltip>
				</PromptInputActions>
			</PromptInput>

			<ImageViewDialog
				imageUrl={selectedImage}
				onClose={() => setSelectedImage(null)}
			/>
		</div>
	);
}

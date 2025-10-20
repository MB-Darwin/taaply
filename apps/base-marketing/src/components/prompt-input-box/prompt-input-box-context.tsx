"use client";

import { createContext, useEffect, useState } from "react";
import type {
	PromptInputBoxContextValue,
	PromptInputBoxProps,
	Mode,
	Attachment,
	PromptInputBoxI18n,
	ModeConfig,
} from "./types";
import { BrainCog, FolderCode, Globe } from "lucide-react";

export const PromptInputBoxContext =
	createContext<PromptInputBoxContextValue | null>(null);

if (process.env.NODE_ENV === "development") {
	PromptInputBoxContext.displayName = "PromptInputBoxContext";
}

const DEFAULT_I18N: PromptInputBoxI18n = {
	prompt_input_warning_images_only: () => "Only image files are supported.",
	prompt_input_warning_file_too_large: () => "File is too large.",
	prompt_input_prefix_search: () => "[search:",
	prompt_input_prefix_think: () => "[think:",
	prompt_input_prefix_canvas: () => "[canvas:",
	prompt_input_placeholder_default: () => "Ask anything...",
	prompt_input_console_start_recording: () => "Starting voice recording…",
	prompt_input_voice_message_format: ({ duration }) =>
		`Voice message (${duration})`,
	prompt_input_aria_upload_image: () => "Upload image",
	prompt_input_tooltip_upload_image: () => "Attach image",
	prompt_input_tooltip_stop_generation: () => "Stop generation",
	prompt_input_tooltip_stop_recording: () => "Stop recording",
	prompt_input_tooltip_send_message: () => "Send message",
	prompt_input_tooltip_voice_message: () => "Start voice message",
};

const DEFAULT_MODE_CONFIG: Record<Exclude<Mode, "idle">, ModeConfig> = {
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

export function PromptInputBoxProvider({
	children,
	className,
	style,
	isLoading = false,
	placeholder,
	accept = "image/*",
	maxFileSize = 10 * 1024 * 1024,
	onSend = () => {},
	value,
	onValueChange,
	disableVoice,
	defaultMode = "idle",
	i18n: i18nOverrides,
}: PromptInputBoxProps) {
	const i18n = { ...DEFAULT_I18N, ...i18nOverrides };
	const [input, setInputInternal] = useState(value ?? "");
	const [attachments, setAttachments] = useState<Attachment[]>([]);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [isRecording, setIsRecording] = useState(false);
	const [mode, setMode] = useState<Mode>(defaultMode);

	// Controlled/uncontrolled value sync
	useEffect(() => {
		if (value !== undefined) setInputInternal(value);
	}, [value]);

	const setInput = (v: string) => {
		setInputInternal(v);
		onValueChange?.(v);
	};

	const isImageFile = (file: File) => file.type.startsWith("image/");

	const processFile = (file: File) => {
		if (!isImageFile(file)) {
			console.warn(i18n.prompt_input_warning_images_only());
			return;
		}
		if (file.size > maxFileSize) {
			console.warn(i18n.prompt_input_warning_file_too_large());
			return;
		}
		const url = URL.createObjectURL(file);
		setAttachments((prev) => {
			// revoke previous previews to avoid leaks (single image UX)
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
	};

	const removeAttachment = (id: string) => {
		setAttachments((prev) => {
			const found = prev.find((a) => a.id === id);
			if (found) URL.revokeObjectURL(found.previewUrl);
			return prev.filter((a) => a.id !== id);
		});
	};

	const clearAttachments = () => {
		setAttachments((prev) => {
			prev.forEach((att) => URL.revokeObjectURL(att.previewUrl));
			return [];
		});
	};

	useEffect(() => {
		return () => {
			attachments.forEach((att) => URL.revokeObjectURL(att.previewUrl));
		};
	}, [attachments]);

	const onPasteImage = (file: File) => processFile(file);

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		const files = Array.from(e.dataTransfer.files);
		const image = files.find((f) => isImageFile(f));
		if (image) processFile(image);
	};

	const hasContent = input.trim().length > 0 || attachments.length > 0;

	const derivedPlaceholder =
		placeholder ??
		(mode !== "idle"
			? DEFAULT_MODE_CONFIG[mode as Exclude<Mode, "idle">].placeholder
			: i18n.prompt_input_placeholder_default());

	const handleSubmit = () => {
		if (!hasContent) return;

		const prefix =
			mode === "search"
				? i18n.prompt_input_prefix_search()
				: mode === "think"
					? i18n.prompt_input_prefix_think()
					: mode === "canvas"
						? i18n.prompt_input_prefix_canvas()
						: "";
		const formatted = prefix ? `${prefix}${input}]` : input;

		onSend(
			formatted,
			attachments.map((a) => a.file),
		);

		// reset
		setInput("");
		clearAttachments();
		setMode("idle");
	};

	const onStartRecording = () => {
		// hook for integrating real audio; currently cosmetic
		// eslint-disable-next-line no-console
		console.log(i18n.prompt_input_console_start_recording());
	};

	const onStopRecording = (durationSec: number) => {
		setIsRecording(false);
		const mins = Math.floor(durationSec / 60);
		const secs = (durationSec % 60).toString().padStart(2, "0");
		const label = `${mins.toString().padStart(2, "0")}:${secs}`;
		onSend(i18n.prompt_input_voice_message_format({ duration: label }), []);
	};

	const valueObj: PromptInputBoxContextValue = {
		isLoading,
		input,
		setInput,
		attachments,
		processFile,
		removeAttachment,
		clearAttachments,
		selectedImage,
		setSelectedImage,
		isRecording,
		setIsRecording,
		mode,
		setMode,
		accept,
		maxFileSize,
		disableVoice,
		i18n,
		modeConfig: DEFAULT_MODE_CONFIG,
		hasContent,
		derivedPlaceholder,
		handleSubmit,
		handleDragOver,
		handleDrop,
		onPasteImage,
		onStartRecording,
		onStopRecording,
	};

	if (process.env.NODE_ENV === "development") {
		if (!children) {
			// eslint-disable-next-line no-console
			console.warn("PromptInputBox: children prop is required");
		}
		if (typeof window !== "undefined" && !window.requestAnimationFrame) {
			// eslint-disable-next-line no-console
			console.warn(
				"PromptInputBox: Animations require requestAnimationFrame support",
			);
		}
	}

	return (
		<PromptInputBoxContext.Provider value={valueObj}>
			{children}
		</PromptInputBoxContext.Provider>
	);
}

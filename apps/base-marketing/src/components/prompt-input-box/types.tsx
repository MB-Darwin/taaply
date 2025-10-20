import type { ReactNode, CSSProperties } from "react";

export type Mode = "idle" | "search" | "think" | "canvas";

export type AttachmentKind = "image";

export interface Attachment {
	id: string;
	file: File;
	kind: AttachmentKind;
	previewUrl: string;
}

export interface ModeConfig {
	label: string;
	// lucide-react icon type signature
	Icon: React.ComponentType<{ className?: string }>;
	activeClass: string;
	placeholder: string;
}

/**
 * i18n boundary. Plug your own messages (e.g. paraglide `m`) via `i18n`.
 */
export interface PromptInputBoxI18n {
	prompt_input_warning_images_only: () => string;
	prompt_input_warning_file_too_large: () => string;
	prompt_input_prefix_search: () => string;
	prompt_input_prefix_think: () => string;
	prompt_input_prefix_canvas: () => string;
	prompt_input_placeholder_default: () => string;
	prompt_input_console_start_recording: () => string;
	prompt_input_voice_message_format: (params: { duration: string }) => string;
	prompt_input_aria_upload_image: () => string;
	prompt_input_tooltip_upload_image: () => string;
	prompt_input_tooltip_stop_generation: () => string;
	prompt_input_tooltip_stop_recording: () => string;
	prompt_input_tooltip_send_message: () => string;
	prompt_input_tooltip_voice_message: () => string;
}

export interface PromptInputBoxProps {
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
	/**
	 * Loading state indicates model is responding. Used to flip send button to stop icon.
	 */
	isLoading?: boolean;
	/**
	 * Optional initial placeholder. Derives from mode when not provided.
	 */
	placeholder?: string;
	/**
	 * Accept attribute for file inputs (defaults to "image/*")
	 */
	accept?: string;
	/**
	 * Max file size in bytes (defaults to 10 MB)
	 */
	maxFileSize?: number;
	/**
	 * Controlled value (optional). If omitted, component manages value internally.
	 */
	value?: string;
	onValueChange?: (value: string) => void;
	/**
	 * Called when user submits a message.
	 * Files mirrors currently attached files.
	 */
	onSend?: (message: string, files?: File[]) => void;
	/**
	 * Disable the voice recorder path
	 */
	disableVoice?: boolean;
	/**
	 * Optional starting mode (default: 'idle')
	 */
	defaultMode?: Mode;
	/**
	 * Optional i18n messages source
	 */
	i18n?: Partial<PromptInputBoxI18n>;
}

export interface PromptInputBoxContextValue {
	// state
	isLoading: boolean;
	input: string;
	setInput: (v: string) => void;
	attachments: Attachment[];
	processFile: (file: File) => void;
	removeAttachment: (id: string) => void;
	clearAttachments: () => void;
	selectedImage: string | null;
	setSelectedImage: (url: string | null) => void;
	isRecording: boolean;
	setIsRecording: (v: boolean) => void;
	mode: Mode;
	setMode: (m: Mode) => void;
	// config
	accept: string;
	maxFileSize: number;
	disableVoice?: boolean;
	i18n: PromptInputBoxI18n;
	modeConfig: Record<Exclude<Mode, "idle">, ModeConfig>;
	// derived
	hasContent: boolean;
	derivedPlaceholder: string;
	// actions
	handleSubmit: () => void;
	handleDragOver: (e: React.DragEvent) => void;
	handleDrop: (e: React.DragEvent) => void;
	onPasteImage: (file: File) => void;
	// voice events
	onStartRecording: () => void;
	onStopRecording: (durationSec: number) => void;
}

export type Mode = "idle" | "search" | "think" | "canvas";

export type Attachment = {
	id: string;
	file: File;
	kind: "image";
	previewUrl: string;
};

export interface PromptInputBoxProps {
	onSend?: (message: string, files?: File[]) => void;
	isLoading?: boolean;
	placeholder?: string;
	className?: string;
}

export interface ModeConfig {
	label: string;
	Icon: React.ComponentType<{ className?: string }>;
	activeClass: string;
	placeholder: string;
}

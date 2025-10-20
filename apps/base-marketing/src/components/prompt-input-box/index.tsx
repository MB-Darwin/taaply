/**
 * PromptInputBox - Compound Component
 * Next.js 15.4 + Motion v12 + React 19 Compiler
 */

import { PromptInputBoxActions } from "./components/prompt-input-box-actions";
import { PromptInputBoxAttachmentItem } from "./components/prompt-input-box-attachment-item";
import { PromptInputBoxAttachments } from "./components/prompt-input-box-attachments";
import { PromptInputBoxContainer } from "./components/prompt-input-box-container";
import { PromptInputBoxHeader } from "./components/prompt-input-box-header";
import { PromptInputBoxImageDialog } from "./components/prompt-input-box-image-dialog";
import { PromptInputBoxItem } from "./components/prompt-input-box-item";
import { PromptInputBoxModeSelector } from "./components/prompt-input-box-mode-selector";
import { PromptInputBoxSendButton } from "./components/prompt-input-box-send-button";
import { PromptInputBoxTextarea } from "./components/prompt-input-box-textarea";
import { PromptInputBoxUploadButton } from "./components/prompt-input-box-upload-button";
import { PromptInputBoxVoiceRecorder } from "./components/prompt-input-box-voice-recorder";
import { PromptInputBox as Root } from "./prompt-input-box";

export const PromptInputBox = Object.assign(Root, {
	Container: PromptInputBoxContainer,
	Header: PromptInputBoxHeader,
	Item: PromptInputBoxItem,
	Attachments: PromptInputBoxAttachments,
	AttachmentItem: PromptInputBoxAttachmentItem,
	Textarea: PromptInputBoxTextarea,
	Actions: PromptInputBoxActions,
	ModeSelector: PromptInputBoxModeSelector,
	UploadButton: PromptInputBoxUploadButton,
	SendButton: PromptInputBoxSendButton,
	ImageDialog: PromptInputBoxImageDialog,
	VoiceRecorder: PromptInputBoxVoiceRecorder,
});

// Hook and types
export { usePromptInputBox } from "./hooks/use-prompt-input-box";
export type * from "./types";

export default PromptInputBox;

/**
 * PromptInputBox - Compound Component
 * Next.js 15.4 + Motion v12 + React 19 Compiler
 */

import { PromptInputBox as Root } from "./prompt-input-box";
import { PromptInputBoxContainer } from "./components/prompt-input-box-container";
import { PromptInputBoxItem } from "./components/prompt-input-box-item";
import { PromptInputBoxHeader } from "./components/prompt-input-box-header";
import { PromptInputBoxAttachments } from "./components/prompt-input-box-attachments";
import { PromptInputBoxAttachmentItem } from "./components/prompt-input-box-attachment-item";
import { PromptInputBoxTextarea } from "./components/prompt-input-box-textarea";
import { PromptInputBoxActions } from "./components/prompt-input-box-actions";
import { PromptInputBoxModeSelector } from "./components/prompt-input-box-mode-selector";
import { PromptInputBoxUploadButton } from "./components/prompt-input-box-upload-button";
import { PromptInputBoxSendButton } from "./components/prompt-input-box-send-button";
import { PromptInputBoxImageDialog } from "./components/prompt-input-box-image-dialog";
import { PromptInputBoxVoiceRecorder } from "./components/prompt-input-box-voice-recorder";

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

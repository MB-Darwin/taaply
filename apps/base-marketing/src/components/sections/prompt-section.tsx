"use client";

import { useState } from "react";
import { m } from "@/marketing/paraglide/messages";
import { PromptInputBox } from "../prompt-input-box";

export function PromptSection() {
	const [value, setValue] = useState<string>("");
	const handleSend = (message: string, files?: File[]) => {
		console.log("Message:", message);
		console.log("Files:", files);
		// Handle submission logic here
	};

	return (
		<PromptInputBox
			value={value}
			onValueChange={setValue}
			onSend={handleSend}
			isLoading={false}
			i18n={{
				// delegate to your i18n system
				prompt_input_warning_images_only: m.prompt_input_warning_images_only,
				prompt_input_warning_file_too_large:
					m.prompt_input_warning_file_too_large,
				prompt_input_prefix_search: m.prompt_input_prefix_search,
				prompt_input_prefix_think: m.prompt_input_prefix_think,
				prompt_input_prefix_canvas: m.prompt_input_prefix_canvas,
				prompt_input_placeholder_default: m.prompt_input_placeholder_default,
				prompt_input_console_start_recording:
					m.prompt_input_console_start_recording,
				prompt_input_voice_message_format: m.prompt_input_voice_message_format,
				prompt_input_aria_upload_image: m.prompt_input_aria_upload_image,
				prompt_input_tooltip_upload_image: m.prompt_input_tooltip_upload_image,
				prompt_input_tooltip_stop_generation:
					m.prompt_input_tooltip_stop_generation,
				prompt_input_tooltip_stop_recording:
					m.prompt_input_tooltip_stop_recording,
				prompt_input_tooltip_send_message: m.prompt_input_tooltip_send_message,
				prompt_input_tooltip_voice_message:
					m.prompt_input_tooltip_voice_message,
			}}
			disableVoice
		>
			<PromptInputBox.Container className="w-full">
				<PromptInputBox.Attachments />
				<PromptInputBox.Textarea />
				{/* <PromptInputBox.VoiceRecorder /> */}
				<PromptInputBox.Actions>
					<div className="flex items-center gap-2">
						<PromptInputBox.UploadButton />
						{/* <PromptInputBox.ModeSelector /> */}
					</div>
					<PromptInputBox.SendButton />
				</PromptInputBox.Actions>
			</PromptInputBox.Container>

			<PromptInputBox.ImageDialog />
		</PromptInputBox>
	);
}

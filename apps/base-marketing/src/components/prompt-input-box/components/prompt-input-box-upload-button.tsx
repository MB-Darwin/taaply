"use client";

import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@taaply/ui";
import { Paperclip } from "lucide-react";
import { useRef } from "react";
import { usePromptInputBox } from "../hooks/use-prompt-input-box";

export function PromptInputBoxUploadButton() {
	const inputRef = useRef<HTMLInputElement>(null);
	const { i18n, isRecording, accept, processFile } = usePromptInputBox();

	return (
		<Tooltip>
			<TooltipTrigger asChild disabled={isRecording}>
				<Button
					onClick={() => inputRef.current?.click()}
					variant={"contained"}
					appearance="ghost"
					size="icon"
					shape="pill"
					color="inherit"
					disabled={isRecording}
					aria-label={i18n.prompt_input_aria_upload_image()}
				>
					<Paperclip className="h-5 w-5" />
					<input
						ref={inputRef}
						type="file"
						hidden
						accept={accept}
						onChange={(e) => {
							const f = e.target.files?.[0];
							if (f) processFile(f);
							e.currentTarget.value = "";
						}}
					/>
				</Button>
			</TooltipTrigger>
			<TooltipContent side="top">
				{i18n.prompt_input_tooltip_upload_image()}
			</TooltipContent>
		</Tooltip>
	);
}

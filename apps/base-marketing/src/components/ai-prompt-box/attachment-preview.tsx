"use client";

import { cn } from "@taaply/utils";
import { X } from "lucide-react";
import type { Attachment } from "../../types/ai-prompt-box.types";

interface AttachmentPreviewProps {
	attachments: Attachment[];
	onRemove: (id: string) => void;
	onImageClick: (url: string) => void;
	isRecording?: boolean;
}

export function AttachmentPreview({
	attachments,
	onRemove,
	onImageClick,
	isRecording,
}: AttachmentPreviewProps) {
	if (attachments.length === 0 || isRecording) return null;

	return (
		<div className="flex flex-wrap gap-2 p-0 pb-2 transition-all duration-300">
			{attachments.map((att) => (
				<div key={att.id} className="group relative">
					{att.kind === "image" && (
						<div
							className="h-20 w-20 cursor-pointer overflow-hidden rounded-xl border border-border/50 transition-all duration-300 hover:border-border hover:shadow-md"
							onClick={() => onImageClick(att.previewUrl)}
							role="button"
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									onImageClick(att.previewUrl);
								}
							}}
						>
							<img
								src={att.previewUrl}
								alt="Attachment preview"
								className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
							/>
							<button
								onClick={(e) => {
									e.stopPropagation();
									onRemove(att.id);
								}}
								className={cn(
									"absolute top-1 right-1 rounded-full bg-background/90 p-1",
									"opacity-0 transition-opacity duration-200 group-hover:opacity-100",
									"hover:bg-background focus:opacity-100",
								)}
								aria-label="Remove image"
							>
								<X className="h-3 w-3 text-foreground" />
							</button>
						</div>
					)}
				</div>
			))}
		</div>
	);
}

"use client";

import { cn } from "@taaply/utils";
import { X } from "lucide-react";
import Image from "next/image";
import { usePromptInputBox } from "../hooks/use-prompt-input-box";

export function PromptInputBoxAttachmentItem({
	attachment,
}: {
	attachment: import("../types").Attachment;
}) {
	const { removeAttachment, setSelectedImage } = usePromptInputBox();

	const open = () => setSelectedImage(attachment.previewUrl);
	const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			open();
		}
	};

	return (
		<div className="group relative">
			{/* Use div with role=button to avoid nested interactive elements */}
			<div
				role="button"
				tabIndex={0}
				aria-label="View image attachment"
				onClick={open}
				onKeyDown={onKey}
				className={cn(
					"relative h-20 w-20 cursor-pointer overflow-hidden rounded-xl border border-border/50 transition-all duration-300",
					"hover:border-border hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				)}
			>
				<Image
					src={attachment.previewUrl}
					alt="Attachment preview"
					fill
					sizes="80px"
					className="object-cover transition-transform duration-300 group-hover:scale-110"
				/>
			</div>

			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					removeAttachment(attachment.id);
				}}
				className={cn(
					"absolute top-1 right-1 rounded-full bg-background/90 p-1",
					"opacity-0 transition-opacity duration-200 focus:opacity-100 group-hover:opacity-100",
					"hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				)}
				aria-label="Remove image"
			>
				<X className="h-3 w-3 text-foreground" />
			</button>
		</div>
	);
}

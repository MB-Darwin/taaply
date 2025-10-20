"use client";

import { cn } from "@taaply/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { attachmentItemVariants } from "../animations";
import { usePromptInputBox } from "../hooks/use-prompt-input-box";
import { PromptInputBoxAttachmentItem } from "./prompt-input-box-attachment-item";

export function PromptInputBoxAttachments({
	className,
}: {
	className?: string;
}) {
	const { attachments, isRecording } = usePromptInputBox();
	const reduce = useReducedMotion();

	if (attachments.length === 0 || isRecording) return null;

	return (
		<motion.div
			className={cn("mb-2 flex flex-wrap", className)}
			initial="hidden"
			animate="visible"
			transition={{
				duration: reduce ? 0 : 0.2,
			}}
		>
			<AnimatePresence initial={false}>
				{attachments.map((att) => (
					<motion.div
						key={att.id}
						variants={attachmentItemVariants}
						initial="hidden"
						animate="visible"
						exit={{ opacity: 0, scale: 0.98 }}
						transition={{ duration: reduce ? 0 : 0.15 }}
						className="relative"
					>
						<PromptInputBoxAttachmentItem attachment={att} />
					</motion.div>
				))}
			</AnimatePresence>
		</motion.div>
	);
}

"use client";

import { Dialog, DialogContent, DialogTitle } from "@taaply/ui";
import { motion } from "motion/react";

interface ImageViewDialogProps {
	imageUrl: string | null;
	onClose: () => void;
}

export function ImageViewDialog({ imageUrl, onClose }: ImageViewDialogProps) {
	if (!imageUrl) return null;

	return (
		<Dialog open={!!imageUrl} onOpenChange={() => onClose()}>
			<DialogContent className="max-w-[90vw] border-none bg-transparent p-0 shadow-none md:max-w-[800px]">
				<DialogTitle className="sr-only">Image Preview</DialogTitle>
				<motion.div
					initial={{ opacity: 0, scale: 0.96 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.96 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
					className="relative overflow-hidden rounded-2xl bg-card shadow-2xl"
				>
					<img
						src={imageUrl}
						alt="Full preview"
						className="max-h-[80vh] w-full rounded-2xl object-contain"
					/>
				</motion.div>
			</DialogContent>
		</Dialog>
	);
}

"use client";

import { Dialog, DialogContent, DialogTitle } from "@taaply/ui";
import { motion } from "motion/react";
import { dialogCardVariants } from "../animations";
import { usePromptInputBox } from "../hooks/use-prompt-input-box";

export function PromptInputBoxImageDialog() {
	const { selectedImage, setSelectedImage } = usePromptInputBox();
	if (!selectedImage) return null;

	return (
		<Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
			<DialogContent className="max-w-[90vw] border-none bg-transparent p-0 shadow-none md:max-w-[800px]">
				<DialogTitle className="sr-only">Image Preview</DialogTitle>
				<motion.div
					className="relative overflow-hidden rounded-2xl bg-card shadow-2xl"
					variants={dialogCardVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
					transition={{ duration: 0.2, ease: "easeOut" }}
				>
					{/* Use native img to fit object-contain height easily */}
					<img
						src={selectedImage}
						alt="Full preview"
						className="max-h-[80vh] w-full rounded-lg object-contain"
					/>
				</motion.div>
			</DialogContent>
		</Dialog>
	);
}

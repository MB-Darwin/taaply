"use client";

import { motion } from "motion/react";
import { PromptInputBox } from "./ai-prompt-box";

export function PromptSection() {
	const handleSend = (message: string, files?: File[]) => {
		console.log("Message:", message);
		console.log("Files:", files);
		// Handle submission logic here
	};

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.3 }}
			className="w-full px-4 sm:px-8 lg:max-w-4xl"
		>
			<PromptInputBox onSend={handleSend} />
		</motion.section>
	);
}

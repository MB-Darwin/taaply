"use client";

import { cn } from "@taaply/utils";
import { motion } from "motion/react";
import { useState } from "react";
import { columnVariants } from "../animations";
import type { FooterNewsletterProps } from "../types";

/**
 * FooterNewsletter - Newsletter signup section
 * With form validation and loading states
 */
export function FooterNewsletter({
	title = "Subscribe to our newsletter",
	placeholder = "Enter your email",
	buttonText = "Subscribe",
	onSubmit,
	className,
}: FooterNewsletterProps) {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email || !email.includes("@")) {
			setStatus("error");
			return;
		}

		setIsLoading(true);

		try {
			await onSubmit?.(email);
			setStatus("success");
			setEmail("");
		} catch (_error) {
			setStatus("error");
		} finally {
			setIsLoading(false);

			// Reset status after 3 seconds
			setTimeout(() => setStatus("idle"), 3000);
		}
	};

	return (
		<motion.div
			className={cn("space-y-3", className)}
			variants={columnVariants}
			transition={{
				duration: 0.5,
				ease: "easeOut",
				delayChildren: 0.2,
				staggerChildren: 0.08,
				// delay: 0.2 + i * 0.08,
			}}
		>
			<h3 className="font-medium text-foreground text-sm">{title}</h3>

			<form onSubmit={handleSubmit} className="space-y-2">
				<div className="flex gap-2">
					<input
						type="name"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder={placeholder}
						disabled={isLoading}
						className={cn(
							"flex-1 rounded-md border bg-background px-3 py-2 text-sm",
							"placeholder:text-muted-foreground",
							"focus:outline-none focus:ring-2 focus:ring-ring",
							"disabled:cursor-not-allowed disabled:opacity-50",
							status === "error" && "border-destructive",
						)}
						aria-label="Email address"
						aria-invalid={status === "error"}
					/>

					<motion.button
						type="submit"
						disabled={isLoading || !email}
						className={cn(
							"rounded-md bg-primary px-4 py-2 font-medium text-sm",
							"text-primary-foreground transition-colors",
							"hover:bg-primary/90 focus:outline-none focus:ring-2",
							"focus:ring-ring focus:ring-offset-2",
							"disabled:cursor-not-allowed disabled:opacity-50",
						)}
						whileTap={{ scale: 0.95 }}
					>
						{isLoading ? "Subscribing..." : buttonText}
					</motion.button>
				</div>

				{status === "success" && (
					<motion.p
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-green-600 text-xs dark:text-green-400"
					>
						✓ Successfully subscribed!
					</motion.p>
				)}

				{status === "error" && (
					<motion.p
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-destructive text-xs"
					>
						Please enter a valid email address
					</motion.p>
				)}
			</form>
		</motion.div>
	);
}

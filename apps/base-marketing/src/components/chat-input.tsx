"use client";

import { cn } from "@taaply/utils";
import { Mic } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

interface ChatInputContextValue {
	value: string;
	setValue: (value: string) => void;
	isFocused: boolean;
	setIsFocused: (focused: boolean) => void;
	isRecording: boolean;
	setIsRecording: (recording: boolean) => void;
}

const ChatInputContext = React.createContext<ChatInputContextValue | undefined>(
	undefined,
);

function useChatInput() {
	const context = React.useContext(ChatInputContext);
	if (!context) {
		throw new Error("ChatInput components must be used within ChatInput");
	}
	return context;
}

interface ChatInputProps {
	children: React.ReactNode;
	defaultValue?: string;
	onSubmit?: (value: string) => void;
	className?: string;
}

function ChatInputRoot({
	children,
	defaultValue = "",
	onSubmit,
	className,
}: ChatInputProps) {
	const [value, setValue] = React.useState(defaultValue);
	const [isFocused, setIsFocused] = React.useState(false);
	const [isRecording, setIsRecording] = React.useState(false);

	const handleSubmit = React.useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			if (value.trim() && onSubmit) {
				onSubmit(value);
				setValue("");
			}
		},
		[value, onSubmit],
	);

	return (
		<ChatInputContext.Provider
			value={{
				value,
				setValue,
				isFocused,
				setIsFocused,
				isRecording,
				setIsRecording,
			}}
		>
			<motion.form
				onSubmit={handleSubmit}
				className={cn(
					"relative w-full max-w-2xl rounded-[1.5rem] bg-white shadow-lg transition-shadow",
					isFocused && "shadow-xl",
					className,
				)}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, ease: "easeOut" }}
			>
				{children}
			</motion.form>
		</ChatInputContext.Provider>
	);
}

interface ChatInputFieldProps {
	placeholder?: string;
	className?: string;
}

function ChatInputField({
	placeholder = "Écrivez votre message ici...",
	className,
}: ChatInputFieldProps) {
	const { value, setValue, setIsFocused } = useChatInput();
	const textareaRef = React.useRef<HTMLTextAreaElement>(null);

	React.useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, []);

	return (
		<textarea
			ref={textareaRef}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			placeholder={placeholder}
			rows={1}
			className={cn(
				"w-full resize-none border-0 bg-transparent px-6 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none",
				"max-h-[12rem] min-h-[3.5rem]",
				className,
			)}
		/>
	);
}

interface ChatInputActionsProps {
	children: React.ReactNode;
	position?: "left" | "right";
	className?: string;
}

function ChatInputActions({
	children,
	position = "left",
	className,
}: ChatInputActionsProps) {
	return (
		<div
			className={cn(
				"flex items-center gap-1 px-3 pb-3",
				position === "left" ? "justify-start" : "justify-end",
				className,
			)}
		>
			{children}
		</div>
	);
}

interface ChatInputActionProps {
	icon: React.ReactNode;
	onClick?: () => void;
	label?: string;
	variant?: "default" | "primary";
	className?: string;
}

function ChatInputAction({
	icon,
	onClick,
	label,
	variant = "default",
	className,
}: ChatInputActionProps) {
	const [isHovered, setIsHovered] = React.useState(false);

	return (
		<motion.button
			type="button"
			onClick={onClick}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
			aria-label={label}
			className={cn(
				"relative flex h-10 w-10 items-center justify-center rounded-full transition-colors",
				variant === "default" &&
					"text-muted-foreground hover:bg-accent hover:text-accent-foreground",
				variant === "primary" &&
					"bg-primary text-primary-foreground hover:bg-primary/90",
				className,
			)}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			transition={{ duration: 0.2 }}
		>
			<motion.div
				animate={{ rotate: isHovered ? 5 : 0 }}
				transition={{ duration: 0.2 }}
			>
				{icon}
			</motion.div>
		</motion.button>
	);
}

interface ChatInputRecordButtonProps {
	onStartRecording?: () => void;
	onStopRecording?: () => void;
	className?: string;
}

function ChatInputRecordButton({
	onStartRecording,
	onStopRecording,
	className,
}: ChatInputRecordButtonProps) {
	const { isRecording, setIsRecording } = useChatInput();

	const handleClick = () => {
		if (isRecording) {
			setIsRecording(false);
			onStopRecording?.();
		} else {
			setIsRecording(true);
			onStartRecording?.();
		}
	};

	return (
		<motion.button
			type="button"
			onClick={handleClick}
			aria-label={isRecording ? "Stop recording" : "Start recording"}
			className={cn(
				"relative flex h-12 w-12 items-center justify-center rounded-full transition-colors",
				isRecording
					? "bg-destructive text-destructive-foreground"
					: "bg-primary text-primary-foreground hover:bg-primary/90",
				className,
			)}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			transition={{ duration: 0.2 }}
		>
			<AnimatePresence mode="wait">
				{isRecording ? (
					<motion.div
						key="recording"
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0, opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="h-4 w-4 rounded-sm bg-current"
					/>
				) : (
					<motion.div
						key="idle"
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0, opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<Mic className="h-5 w-5" />
					</motion.div>
				)}
			</AnimatePresence>

			{isRecording && (
				<motion.div
					className="absolute inset-0 rounded-full bg-destructive"
					initial={{ scale: 1, opacity: 0.5 }}
					animate={{ scale: 1.5, opacity: 0 }}
					transition={{
						duration: 1.5,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeOut",
					}}
				/>
			)}
		</motion.button>
	);
}

export const ChatInput = Object.assign(ChatInputRoot, {
	Field: ChatInputField,
	Actions: ChatInputActions,
	Action: ChatInputAction,
	RecordButton: ChatInputRecordButton,
});

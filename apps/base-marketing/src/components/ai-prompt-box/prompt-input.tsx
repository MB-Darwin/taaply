"use client";

import { Textarea, TooltipProvider } from "@taaply/ui";
import { cn } from "@taaply/utils";
import type { ComponentProps, ReactNode } from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

// Context
interface PromptInputContextType {
	isLoading: boolean;
	value: string;
	setValue: (value: string) => void;
	maxHeight: number | string;
	onSubmit?: () => void;
	disabled?: boolean;
	onPasteImage?: (file: File) => void;
}

const PromptInputContext = createContext<PromptInputContextType | null>(null);

export function usePromptInput() {
	const context = useContext(PromptInputContext);
	if (!context) {
		throw new Error("usePromptInput must be used within PromptInput");
	}
	return context;
}

// Utilities
export function useMergedRefs<T>(
	...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
	return useCallback(
		(value: T) => {
			for (const ref of refs) {
				if (!ref) continue;
				if (typeof ref === "function") ref(value);
				else (ref as React.MutableRefObject<T | null>).current = value;
			}
		},
		[refs],
	);
}

// Root Component
interface PromptInputProps extends ComponentProps<"div"> {
	isLoading?: boolean;
	value?: string;
	onValueChange?: (value: string) => void;
	maxHeight?: number | string;
	onSubmit?: () => void;
	disabled?: boolean;
	onPasteImage?: (file: File) => void;
	children: ReactNode;
}

export function PromptInput({
	className,
	isLoading = false,
	maxHeight = 240,
	value,
	onValueChange,
	onSubmit,
	children,
	disabled = false,
	onPasteImage,
	...rest
}: PromptInputProps) {
	const [internalValue, setInternalValue] = useState(value ?? "");

	const setValue = useCallback(
		(v: string) => {
			setInternalValue(v);
			onValueChange?.(v);
		},
		[onValueChange],
	);

	return (
		<TooltipProvider delayDuration={150}>
			<PromptInputContext.Provider
				value={{
					isLoading,
					value: value ?? internalValue,
					setValue,
					maxHeight,
					onSubmit,
					disabled,
					onPasteImage,
				}}
			>
				<div
					data-loading={isLoading ? "true" : "false"}
					className={cn(
						"rounded-3xl border border-input bg-card p-3 shadow-lg transition-all duration-300",
						"focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 focus-within:ring-offset-background",
						className,
					)}
					{...rest}
				>
					{children}
				</div>
			</PromptInputContext.Provider>
		</TooltipProvider>
	);
}

// Textarea Component
interface PromptInputTextareaProps extends ComponentProps<typeof Textarea> {
	disableAutosize?: boolean;
}

export function PromptInputTextarea({
	className,
	onKeyDown,
	onPaste,
	disableAutosize = false,
	placeholder,
	...props
}: PromptInputTextareaProps) {
	const { value, setValue, maxHeight, onSubmit, disabled, onPasteImage } =
		usePromptInput();
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (disableAutosize || !textareaRef.current) return;
		const el = textareaRef.current;
		el.style.height = "auto";
		const target =
			typeof maxHeight === "number"
				? Math.min(el.scrollHeight, maxHeight)
				: el.scrollHeight;
		el.style.height = `${target}px`;
	}, [maxHeight, disableAutosize]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSubmit?.();
		}
		onKeyDown?.(e);
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
		const items = e.clipboardData?.items;
		if (!items) return onPaste?.(e);

		for (let i = 0; i < items.length; i++) {
			if (items[i].type.startsWith("image/")) {
				const file = items[i].getAsFile();
				if (file) {
					e.preventDefault();
					onPasteImage?.(file);
					return;
				}
			}
		}
		onPaste?.(e);
	};

	return (
		<Textarea
			ref={textareaRef}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			onKeyDown={handleKeyDown}
			onPaste={handlePaste}
			placeholder={placeholder}
			disabled={disabled}
			className={cn(
				"min-h-[48px] resize-none border-0 bg-transparent p-3 text-base shadow-none focus-visible:ring-0",
				typeof maxHeight === "string"
					? `h-auto max-h-[${maxHeight}]`
					: "h-auto",
				className,
			)}
			{...props}
		/>
	);
}

// Actions Container
interface PromptInputActionsProps
	extends React.HTMLAttributes<HTMLDivElement> {}

export function PromptInputActions({
	children,
	className,
	...props
}: PromptInputActionsProps) {
	return (
		<div
			className={cn(
				"flex items-center justify-between gap-2 p-0 pt-2",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

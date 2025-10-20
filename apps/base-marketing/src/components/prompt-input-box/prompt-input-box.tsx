"use client";

import type { PromptInputBoxProps } from "./types";
import { PromptInputBoxProvider } from "./prompt-input-box-context";
import { cn } from "@taaply/utils";

/**
 * PromptInputBox - Compound component root.
 * Provides context and renders a simple wrapper.
 *
 * @example
 * <PromptInputBox onSend={...}>
 *   <PromptInputBox.Container>...</PromptInputBox.Container>
 * </PromptInputBox>
 */
export function PromptInputBox({
	children,
	className,
	style,
	...rest
}: PromptInputBoxProps) {
	return (
		<PromptInputBoxProvider {...rest}>
			<div className={cn(className)} style={style}>
				{children}
			</div>
		</PromptInputBoxProvider>
	);
}

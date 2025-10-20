"use client";

import { cn } from "@taaply/utils";
import { PromptInputBoxProvider } from "./prompt-input-box-context";
import type { PromptInputBoxProps } from "./types";

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

"use client";

import { useContext } from "react";
import { PromptInputBoxContext } from "../prompt-input-box-context";

/**
 * Access PromptInputBox context
 * @throws If used outside of <PromptInputBox>
 * @example
 * const { input, setInput } = usePromptInputBox()
 */
export function usePromptInputBox() {
	const ctx = useContext(PromptInputBoxContext);
	if (!ctx) {
		throw new Error(
			"⚠️ usePromptInputBox must be used within <PromptInputBox>. Wrap your tree with <PromptInputBox>…</PromptInputBox>.",
		);
	}
	return ctx;
}

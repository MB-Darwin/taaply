"use client";

import { LanguageOutline } from "@taaply/assets/icons/language-outline";
import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../select";

interface LangSwitcherProps {
	defaultLocale?: () => "en" | "fr";
	setLocale?: (
		newLocale: "en" | "fr",
		options?: { reload?: boolean },
	) => void | Promise<void>;
	locales?: readonly ["en", "fr"];
}

export function LanguageSwitcher({
	defaultLocale = () => "en",
	setLocale,
	locales = ["en", "fr"],
}: LangSwitcherProps) {
	const id = React.useId();

	return (
		<Select defaultValue={defaultLocale()} onValueChange={setLocale}>
			<SelectTrigger
				aria-label="Select language"
				className="border-none bg-transparent px-2 capitalize shadow-none hover:cursor-pointer hover:text-accent-foreground [&>svg]:shrink-0 [&>svg]:text-muted-foreground/80"
				id={`language-${id}`}
			>
				<LanguageOutline aria-hidden="true" />
				<SelectValue className="hidden sm:inline-flex" />
			</SelectTrigger>
			<SelectContent className="[&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8">
				{locales.map((locale) => (
					<SelectItem key={locale} value={locale}>
						<span className="flex items-center gap-2">
							<span className="truncate capitalize">{locale}</span>
						</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

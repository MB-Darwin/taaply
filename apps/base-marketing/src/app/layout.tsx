import "./global.css";
import { headers } from "next/headers";
import { cache } from "react";
import {
	assertIsLocale,
	baseLocale,
	type Locale,
	overwriteGetLocale,
	overwriteGetUrlOrigin,
} from "../paraglide/runtime";
import Providers from "../providers";

export const metadata = {
	title: "Taaply",
	description: "Taaply - All-in-one platform for businesses",
	generator: "Next.js",
	manifest: "/manifest.json",
	keywords: ["taaply", "taaply com"],
};

const ssrLocale = cache(() => ({
	locale: baseLocale,
	origin: "http://localhost",
}));

overwriteGetLocale(() => assertIsLocale(ssrLocale().locale));
overwriteGetUrlOrigin(() => ssrLocale().origin);

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const headersList = await headers();
	ssrLocale().locale = (headersList.get("x-paraglide-locale") ||
		"en") as Locale;

	ssrLocale().origin = new URL(
		headersList.get("x-paraglide-request-url") || "http://localhost",
	).origin;

	return (
		<html lang="en">
			<body>
				<Providers>{children} </Providers>
			</body>
		</html>
	);
}

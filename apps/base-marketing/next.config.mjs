//@ts-check

import { paraglideWebpackPlugin } from "@inlang/paraglide-js";
import { composePlugins, withNx } from "@nx/next";

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
	// Use this to set Nx-specific options
	// See: https://nx.dev/recipes/next/next-config-setup
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [{ protocol: "https", hostname: "tailark.com" }],
	},
	webpack: (config) => {
		config.plugins.push(
			paraglideWebpackPlugin({
				outdir: "./src/paraglide",
				project: "./project.inlang",
				strategy: ["url", "cookie", "baseLocale"],
			}),
		);
		return config;
	},
	nx: {
		// Set this to true if you would like to use svgr
		svgr: false,
	},
};

const plugins = [
	// Add more Next.js plugins to this list if needed.
	withNx,
];

export default composePlugins(...plugins)(nextConfig);

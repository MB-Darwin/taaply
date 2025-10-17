/// <reference types='vitest' />

import * as path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(() => ({
	root: __dirname,
	cacheDir: "../../../node_modules/.vite/libs/shared/ui",
	plugins: [
		react(),
		dts({
			entryRoot: "src",
			tsconfigPath: path.join(__dirname, "tsconfig.lib.json"),
		}),
	],
	resolve: {
		alias: {
			"@taaply/utils": path.resolve(__dirname, "../utils/src/index.ts"),
			"@taaply/assets": path.resolve(__dirname, "../assets/src"),
		},
	},
	// Uncomment this if you are using workers.
	// worker: {
	//  plugins: [ nxViteTsPaths() ],
	// },
	// Configuration for building your library.
	// See: https://vitejs.dev/guide/build.html#library-mode
	build: {
		outDir: path.join(__dirname, "dist"),
		emptyOutDir: true,
		reportCompressedSize: true,
		commonjsOptions: {
			transformMixedEsModules: true,
		},
		lib: {
			// Could also be a dictionary or array of multiple entry points.
			entry: "src/index.ts",
			name: "@taaply/ui",
			fileName: "index",
			// Change this to the formats you want to support.
			// Don't forget to update your package.json as well.
			formats: ["es" as const],
		},
		rollupOptions: {
			// External packages that should not be bundled into your library.
			external: [
				"react",
				"react-dom",
				"react/jsx-runtime",
				// Externalize image imports
				/\.png$/,
				/\.jpg$/,
				/\.svg$/,
			],
		},
	},
}));

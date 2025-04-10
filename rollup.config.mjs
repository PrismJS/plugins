// Built-in modules
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Dependencies
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import rollupTerser from '@rollup/plugin-terser';

function getPluginsList () {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	const root = path.resolve(__dirname);

	return fs.readdirSync(root).filter(file => {
		const fullPath = path.join(root, file);

		return (
			fs.statSync(fullPath).isDirectory() &&
			fs.existsSync(path.join(fullPath, `prism-${file}.ts`))
		);
	});
}

// Generate Rollup configuration for each plugin
export default getPluginsList().map(
	plugin =>
		/**
		 * @type {import('rollup').RollupOptions}
		 */
		({
			input: `${plugin}/prism-${plugin}.ts`,
			output: {
				file: `${plugin}/prism-${plugin}.js`,
				format: 'es',
			},
			plugins: [
				resolve(),
				typescript({
					module: 'esnext',
				}),
				rollupTerser({
					ecma: 2020,
					module: true,
					compress: {
						passes: 4,
						unsafe: true,
						unsafe_arrows: true,
						unsafe_math: true,
						unsafe_regexp: true,
					},
					format: {
						comments: false,
					},
					keep_classnames: true,
				}),
			],
		})
);

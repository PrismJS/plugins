import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const baseConfig = JSON.parse(
	readFileSync(
		resolve(__dirname, './node_modules/prismjs-website/node_modules/prismjs/.prettierrc'),
		'utf8'
	)
);

/** @type {import("prettier").Options} */
export default {
	...baseConfig,
};

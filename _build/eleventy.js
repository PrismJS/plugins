import baseConfig from "prismjs-website/_build/eleventy.js";

export default config => {
	let base = baseConfig(config);

	config.ignores.add("README.md");

	let data = {
		// TODO: change to https://prismjs.com when ready
		base_url: "https://deploy-preview-16--prismjs-website.netlify.app",
		subdomain: "plugins",
		permalink: `{{ page.filePathStem | replace("README", "index") }}.html`,
	};

	for (let p in data) {
		config.addGlobalData(p, data[p]);
	}

	return {
		...base,
		dir: {
			...base.dir,
			input: ".",
			includes: "./node_modules/prismjs-website/_includes",
			layouts: "./node_modules/prismjs-website/_layouts",
		},
	};
};

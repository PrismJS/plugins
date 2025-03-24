import baseConfig from "prismjs-website/_build/eleventy.js";

export default config => {
	let base = baseConfig(config);

	config.ignores.add("README.md");

	let data = {
		layout: "plugin.njk",
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
	};
};

import baseConfig from "prismjs-website/_build/eleventy.js";

export default config => {
	let base = baseConfig(config);

	let data = {
		layout: "plugin.njk",
		tags: ["plugin"],
		// TODO: change to https://prismjs.com when ready
		base_url: "https://staging.prismjs.com",
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

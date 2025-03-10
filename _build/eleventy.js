import markdownItAnchor from "markdown-it-anchor";
import markdownItAttrs from "markdown-it-attrs";
import markdownItDeflist from "markdown-it-deflist";
import pluginTOC from "eleventy-plugin-toc";
import * as filters from "./filters.js";

export default config => {
	let data = {
		layout: "page.njk",
		isPlugin: true,
		permalink: `{{ page.filePathStem | replace("README", "index") }}.html`,
	};

	for (let p in data) {
		config.addGlobalData(p, data[p]);
	}

	for (let f in filters) {
		config.addFilter(f, filters[f]);
	}

	config.amendLibrary("md", md => {
		md.options.typographer = true;
		md.options.linkify = true;
		md.use(markdownItAnchor, {
			permalink: markdownItAnchor.permalink.headerLink(),
		});
		md.use(markdownItAttrs);
		md.use(markdownItDeflist);
	});

	config.addPlugin(pluginTOC, {
		tags: ["h1", "h2", "h3"],
	});

	return {
		markdownTemplateEngine: "njk",
		templateFormats: ["md", "njk"],
		dir: {
			output: ".",
		},
	};
};

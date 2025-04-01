import baseComputed from "prismjs-website/_data/eleventyComputed.js";

export default {
	themes: baseComputed.themes,
	id (data) {
		let parts = data.page.inputPath.slice(2).split("/");
		if (parts.length === 1) {
			// Root
			return;
		}

		// Folder name ↔ plugin id
		return parts[0];
	},
	optional (data) {
		let optional = data?.optional;
		if (!optional) {
			return;
		}

		return Array.isArray(optional) ? optional : [optional];
	},
	require (data) {
		let require = data?.require;
		if (!require) {
			return;
		}

		return Array.isArray(require) ? require : [require];
	},
	resources (data) {
		let { id, resources = [] } = data;
		let ret = [];

		resources = Array.isArray(resources) ? resources : [resources];
		ret.push(...resources);

		if (!id) {
			return ret;
		}

		ret.push(`./prism-${id}.js`);

		if (!data.noCSS) {
			ret.push(`./prism-${id}.css`);
		}

		return ret;
	},
};

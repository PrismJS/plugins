import baseComputed from "prismjs-website/_data/eleventyComputed.js";

export default {
	plugins: baseComputed.plugins,
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
	title (data) {
		if (data.title) {
			return data.title;
		}

		let { plugins, id } = data;
		return plugins?.[id]?.title;
	},
	description (data) {
		if (data.description) {
			return data.description;
		}

		let { plugins, id } = data;
		return plugins?.[id]?.description;
	},
	hasCSS (data) {
		let { plugins, id } = data;
		return !plugins?.[id]?.noCSS;
	},
	resources (data) {
		let { id, resources } = data;
		let ret = { head: [], body: [] };

		for (let to in resources) {
			let array = resources[to];
			if (!Array.isArray(array)) {
				array = [array];
			}

			ret[to].push(...array);
		}

		if (!id) {
			return ret;
		}

		if (!data.exclude_js) {
			ret.body.push(`./prism-${id}.min.js`);
		}

		if (data.hasCSS && !data.exclude_css) {
			ret.head.push(`./prism-${id}.min.css`);
		}

		return ret;
	},
};

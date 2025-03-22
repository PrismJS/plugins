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
		let { id, resources, attributes } = data;

		if (!id) {
			return resources;
		}

		resources = [ ...(resources ?? []), `${id}/prism-${id}.min.js { ${ attributes || "" } }` ];

		if (data.hasCSS) {
			resources.push(`${id}/prism-${id}.min.css`);
		}

		return resources;
	},
};

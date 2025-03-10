export default {
	plugins (data) {
		return data.components.plugins;
	},
	themes (data) {
		return data.components.themes;
	},
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
};

export default async () => {
	let components = await (await fetch("https://dev.prismjs.com/components.json")).json();
	let plugins = components.plugins;
	let themes = components.themes;
	delete plugins.meta;
	delete themes.meta;
	return { plugins, themes };
};

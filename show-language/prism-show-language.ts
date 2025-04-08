import { getParentPre } from 'prismjs/src/shared/dom-util';
import { getTitle } from 'prismjs/src/shared/meta/title-data';
import toolbar from '../toolbar/prism-toolbar';
import type { PluginProto } from 'prismjs/src/types';

export default {
	id: 'show-language',
	require: toolbar,
	effect (Prism) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const toolbar = Prism.plugins.toolbar!;

		return toolbar.registerButton('show-language', env => {
			const pre = getParentPre(env.element);
			if (!pre) {
				return;
			}

			const title = pre.getAttribute('data-language') || getTitle(env.language);
			if (!title) {
				return;
			}

			const element = document.createElement('span');
			element.textContent = title;
			return element;
		});
	},
} as PluginProto<'show-language'>;

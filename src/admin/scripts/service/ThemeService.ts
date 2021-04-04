import { storage } from 'javascript-es6-helpers';

import CFG from '../../../config/global.json';

class ThemeService {
	init() {
		document.querySelector(':root').setAttribute('theme', this.get());
	}

	get() {
		return storage.get(CFG.CMS.STORAGE_KEY_THEME) || 'default';
	}

	set(theme) {
		document.querySelector(':root').setAttribute('theme', theme);
		storage.set(CFG.CMS.STORAGE_KEY_THEME, theme);
	}
}

export default new ThemeService();

import { storage } from '../../../libs/js/utils';

import CFG from '../../../config/global.json';

class ThemeService {
	init() {
		document.querySelector(':root').setAttribute('theme', this.get());
		storage.set(CFG.CMS.STORAGE_KEY_THEME, this.get());
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

import { storage } from '../../../libs/js/utils';
import global from '../../../config/global.json';

class ThemeService {
	init() {
		document.querySelector(':root').setAttribute('theme', this.get());
		storage.set(global.CMS.STORAGE_KEY_THEME, this.get());
	}

	get() {
		return storage.get(global.CMS.STORAGE_KEY_THEME) || 'default';
	}

	set(theme) {
		document.querySelector(':root').setAttribute('theme', theme);
		storage.set(global.CMS.STORAGE_KEY_THEME, theme);
	}
}

export default new ThemeService();

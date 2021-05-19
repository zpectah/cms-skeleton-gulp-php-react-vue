import { storage } from '../../../libs/js/utils';
import global from '../../../config/global.json';

class LangService {
	get() {
		return storage.get(global.CMS.STORAGE_KEY_LANG) || global.CMS.LANG_DEFAULT;
	}

	set(lang) {
		storage.set(global.CMS.STORAGE_KEY_LANG, lang);
	}
}

export default new LangService();

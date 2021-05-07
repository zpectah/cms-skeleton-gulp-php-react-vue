import { storage } from '../../../libs/js/utils';

import CFG from '../../../config/global.json';

class LangService {
	get() {
		return storage.get(CFG.CMS.STORAGE_KEY_LANG) || CFG.CMS.LANG_DEFAULT;
	}

	set(lang) {
		storage.set(CFG.CMS.STORAGE_KEY_LANG, lang);
	}
}

export default new LangService();

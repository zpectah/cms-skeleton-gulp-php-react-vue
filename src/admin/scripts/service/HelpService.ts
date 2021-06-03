import { storage } from '../../../libs/js/utils';
import global from '../../../config/global.json';

class HelpService {
	init() {
		storage.set(global.CMS.STORAGE_KEY_HELP, this.get());
	}

	get() {
		return storage.get(global.CMS.STORAGE_KEY_HELP) || 'true';
	}

	set(value) {
		storage.set(global.CMS.STORAGE_KEY_HELP, value);
	}
}

export default new HelpService();

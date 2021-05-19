import environmental from '../../config/environmental.json';
import locales from '../../config/locales.json';
import global from '../../config/global.json';
import nums from '../../config/nums.json';
import options from '../../config/options.json';
import LanguageService from './service/LanguageService';

const build_env = window.WARP_ENVIRONMENT;
const build_timestamp = window.WARP_TIMESTAMP;

export default {
	TIMESTAMP: build_timestamp,
	ROOT_PATH: environmental[build_env].ROOT_PATH,
	LOCALES: locales[LanguageService.get()],
	LOCALES_LIST: locales,
	GLOBAL: global,
	NUMS: nums,
	OPTIONS: options,
};

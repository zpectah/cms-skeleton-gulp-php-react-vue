import environmental from '../../config/environmental.json';
import locales from '../../config/locales.json';
import global from '../../config/global.json';
import nums from '../../config/nums.json';
import options from '../../config/options.json';
import LanguageService from './service/LanguageService';

const build_env = window.WARP_ENVIRONMENT;
const build_timestamp = window.WARP_TIMESTAMP;
const env_root_path = environmental[build_env].ROOT_PATH;
const uploads_path = env_root_path + global.PATH.uploads;

export default {
	CMS_TOKEN: window.CMS_TOKEN,
	TIMESTAMP: build_timestamp,
	LOCALES: locales[LanguageService.get()],
	LOCALES_LIST: locales,
	GLOBAL: global,
	NUMS: nums,
	OPTIONS: options,
	UPLOADS_PATH: {
		image: {
			default: uploads_path + 'image/',
			thumbnail: uploads_path + 'image/thumbnail/',
			medium: uploads_path + 'image/medium/',
			large: uploads_path + 'image/large/',
			/* follow by 'src/config/options.json' -> uploads -> image -> format -> [] -> key */
			custom_1: uploads_path + 'image/custom_1/',
		},
		audio: uploads_path + 'audio/',
		video: uploads_path + 'video/',
		document: uploads_path + 'document/',
		archive: uploads_path + 'archive/',
	},
};

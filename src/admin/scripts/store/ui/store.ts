import { storage } from '../../../../libs/js/utils';
import config from '../../config';
import LangService from '../../service/LanguageService';
import ThemeService from '../../service/ThemeService';
import { storeProps } from '../../types';

const UiStoreState: storeProps['ui'] = {
	language: LangService.get(),
	theme: ThemeService.get(),
	sideBarOpen: storage.get(config.GLOBAL.CMS.STORAGE_KEY_UI_SIDEBAR) === 'true',
	loadingData: false,
	dataError: false,
};

export default UiStoreState;

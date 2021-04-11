import { storage } from 'javascript-es6-helpers';
import CFG from '../../../../config/global.json';
import LangService from '../../service/LanguageService';
import ThemeService from '../../service/ThemeService';
import { storeProps } from '../../types';

const UiStoreState: storeProps['ui'] = {
	language: LangService.get(),
	theme: ThemeService.get(),
	sideBarOpen: storage.get(CFG.CMS.STORAGE_KEY_UI_SIDEBAR) === 'true',
	loadingData: false,
	dataError: false,
};

export default UiStoreState;

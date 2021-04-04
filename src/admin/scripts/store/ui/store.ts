import { storage } from 'javascript-es6-helpers';
import CFG from '../../../../config/global.json';
import LangService from '../../service/LanguageService';
import ThemeService from '../../service/ThemeService';

interface UiStoreProps {
	language: string;
	theme: string;
	sideBarOpen: boolean;
}

const UiStoreState: UiStoreProps = {
	language: LangService.get(),
	theme: ThemeService.get(),
	sideBarOpen: storage.get(CFG.CMS.STORAGE_KEY_UI_SIDEBAR) === 'true',
};

export default UiStoreState;

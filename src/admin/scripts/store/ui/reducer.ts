import { storage } from '../../../../libs/js/utils';
import config from '../../config';
import LangService from '../../service/LanguageService';
import ThemeService from '../../service/ThemeService';
import HelpService from '../../service/HelpService';
import UiStoreState from './store';
import {
	LANGUAGE_TOGGLE,
	SIDEBAR_TOGGLE,
	THEME_TOGGLE,
	HELP_TOGGLE,
} from './types';

function UiReducer(state = UiStoreState, action) {
	switch (action.type) {
		case LANGUAGE_TOGGLE:
			LangService.set(action.payload);
			return Object.assign({}, state, {
				language: action.payload,
			});

		case THEME_TOGGLE:
			ThemeService.set(action.payload);
			return Object.assign({}, state, {
				theme: action.payload,
			});

		case HELP_TOGGLE:
			HelpService.set(action.payload);
			console.log(typeof action.payload, action.payload);
			return Object.assign({}, state, {
				help: action.payload,
			});

		case SIDEBAR_TOGGLE:
			storage.set(config.GLOBAL.CMS.STORAGE_KEY_UI_SIDEBAR, action.payload);
			return Object.assign({}, state, {
				sideBarOpen: action.payload,
			});
	}

	return state;
}

export default UiReducer;

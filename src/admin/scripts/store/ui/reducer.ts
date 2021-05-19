import { storage } from '../../../../libs/js/utils';
import config from '../../config';
import LangService from '../../service/LanguageService';
import ThemeService from '../../service/ThemeService';
import UiStoreState from './store';
import {
	LANGUAGE_TOGGLE,
	SIDEBAR_TOGGLE,
	THEME_TOGGLE,
	SET_DATA_LOADING,
	SET_DATA_ERROR,
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

		case SIDEBAR_TOGGLE:
			storage.set(config.GLOBAL.CMS.STORAGE_KEY_UI_SIDEBAR, action.payload);
			return Object.assign({}, state, {
				sideBarOpen: action.payload,
			});

		case SET_DATA_LOADING:
			return Object.assign({}, state, {
				loadingData: action.payload,
			});

		case SET_DATA_ERROR:
			return Object.assign({}, state, {
				dataError: action.payload,
			});
	}

	return state;
}

export default UiReducer;

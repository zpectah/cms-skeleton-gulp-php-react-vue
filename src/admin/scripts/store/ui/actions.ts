import {
	LANGUAGE_TOGGLE,
	SIDEBAR_TOGGLE,
	THEME_TOGGLE,
	SET_DATA_LOADING,
} from './types';

export function languageToggle(payload) {
	return { type: LANGUAGE_TOGGLE, payload };
}

export function sidebarToggle(payload) {
	return { type: SIDEBAR_TOGGLE, payload };
}

export function themeToggle(payload) {
	return { type: THEME_TOGGLE, payload };
}

export function setDataLoading(payload) {
	return { type: SET_DATA_LOADING, payload };
}

import { LANGUAGE_TOGGLE, SIDEBAR_TOGGLE, THEME_TOGGLE } from './types';

export function languageToggle(payload) {
	return { type: LANGUAGE_TOGGLE, payload };
}

export function sidebarToggle(payload) {
	return { type: SIDEBAR_TOGGLE, payload };
}

export function themeToggle(payload) {
	return { type: THEME_TOGGLE, payload };
}

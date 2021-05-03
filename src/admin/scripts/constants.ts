export const PALETTE = {
	red: 'rgb(211,47,47)',
	pink: 'rgb(194,24,91)',
	purple: 'rgb(123,31,162)',
	deepPurple: 'rgb(81,45,168)',
	indigo: 'rgb(48,63,159)',
	blue: 'rgb(25,118,210)',
	lightBlue: 'rgb(2,136,209)',
	cyan: 'rgb(0,151,167)',
	teal: 'rgb(0,121,107)',
	green: 'rgb(56,142,60)',
	lightGreen: 'rgb(104,159,56)',
	lime: 'rgb(175,180,43)',
	yellow: 'rgb(251,192,45)',
	amber: 'rgb(255,160,0)',
	orange: 'rgb(245,124,0)',
	deepOrange: 'rgb(230,74,25)',
	brown: 'rgb(93,64,55)',
	grey: 'rgb(97,97,97)',
	blueGrey: 'rgb(69,90,100)',
	white: 'rgb(253,253,253)',
	black: 'rgb(2,2,2)',
};
export const STYLES = {
	spacer: '1rem',
	components: {
		Sidebar: {
			width: 250,
		},
	},
};
export const PIXEL_COEFFICIENT = 0.02;
export const BREAKPOINTS = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	xxl: 1400,
};
export const zINDEX = {
	main: 10,
	header: 15,
	footer: 15,
	sidebar: 99,
	modal: 125,
};
export const EMAIL_REGEX = /^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$/;
export const SUBMIT_TIMEOUT = 750;
export const RELOAD_HOOK_TIMEOUT = 350;
export const MESSAGE_SUCCESS_DURATION = 2.5;
export const MESSAGE_ERROR_DURATION = 5;

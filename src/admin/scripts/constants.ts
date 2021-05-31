export const THEMES = ['default'];
export const PIXEL_COEFFICIENT = 0.02;
export const BREAKPOINTS = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	xxl: 1400,
};
export const EMAIL_REGEX = /^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$/;
export const SUBMIT_TIMEOUT = 750;
export const RELOAD_HOOK_TIMEOUT = 350;
export const MESSAGE_SUCCESS_DURATION = 2.5;
export const MESSAGE_ERROR_DURATION = 5;
export const TABLE_ITEMS_PER_PAGE = 30;
export const CMS_MAPBOX_TOKEN =
	'pk.eyJ1IjoienBlY3RlciIsImEiOiJja3BhYm5qMDIwc2plMnVuMTUzb3cxdWl6In0.BmfujOqcuQklZDV3HB-JCA'; // TODO: This is private key !!!
export const MAPBOX_DEFAULTS = {
	longitude: 14.501273600376752,
	latitude: 50.08322927731517,
	zoom: 10,
};

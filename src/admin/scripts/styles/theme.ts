import { PALETTE, STYLES } from '../constants';
import defaultTheme from '../styles/theme/default';
import darkTheme from '../styles/theme/dark';

export const themes = {
	default: defaultTheme,
	dark: darkTheme,
};

export const getStyles = () => {
	// Return styles by theme

	return {
		palette: {
			primary: 'rgb(30,136,229)',
			primary_lighter: 'rgb(66,165,245)',
			primary_darker: 'rgb(13,71,161)',
			secondary: 'rgb(84,110,122)',
			secondary_lighter: 'rgb(120,144,156)',
			secondary_darker: 'rgb(38,50,56)',
			light: 'rgb(245,245,245)',
			light_lighter: 'rgb(250,250,250)',
			light_darker: 'rgb(238,238,238)',
			dark: 'rgb(33,33,33)',
			dark_lighter: 'rgb(77,77,77)',
			dark_darker: 'rgb(15,15,15)',
			...PALETTE,
		},
		layout: {
			link: 'rgb(30,136,229)',
			active_bg: 'rgb(30,136,229)',
			active_text: 'rgb(245,245,245)',
			overlay_bg: 'rgba(33,33,33,.5)',
			overlay_text: 'rgb(200,200,200)',
			body_bg: 'rgb(238,238,238)',
			body_text: 'rgb(77,77,77)',
			body_muted_text: 'rgba(77,77,77, .5)',
			sidebar_bg: 'rgb(238,238,238)',
			sidebar_text: 'rgb(77,77,77)',
			sidebar_panel_bg: 'rgba(238,238,238, .75)',
			sidebar_panel_text: 'rgb(77,77,77)',
			sidebar_block_bg: 'rgb(238,238,238)',
			sidebar_block_text: 'rgb(77,77,77)',
			sidebar_border_color: 'rgb(220,220,220)',
			sidebar_shadow_color: 'rgba(100,100,100, .125)',
			main_bg: 'rgb(238,238,238)',
			main_text: 'rgb(77,77,77)',
			main_block_bg: 'rgb(200,200,200)',
			main_block_text: 'rgb(77,77,77)',
			header_bg: 'rgb(238,238,238)',
			header_text: 'rgb(80,80,80)',
			header_border_color: 'rgb(230,230,230)',
			footer_bg: 'rgb(238,238,238)',
			footer_text: 'rgb(80,80,80)',
			footer_border_color: 'rgb(230,230,230)',
		},
		...STYLES,
	};
};

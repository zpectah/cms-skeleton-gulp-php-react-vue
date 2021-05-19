import palette from '../palette';

const color = {
	...palette,
	brand: palette.pink,
	primary: palette.deepPurple,
	secondary: palette.blueGrey,
	muted: 'rgba(69,90,100, .75)',
};

export default {
	color: color,
	button: {
		default: {
			text: '',
			bg: '',
			border: '',
			textHover: '',
			bgHover: '',
			borderHover: '',
			textActive: '',
			bgActive: '',
			borderActive: '',
		},
		defaultOutline: {
			text: '',
			bg: '',
			border: '',
			textHover: '',
			bgHover: '',
			borderHover: '',
			textActive: '',
			bgActive: '',
			borderActive: '',
		},
		primary: {
			text: color.white,
			bg: color.primary,
			border: color.primary,
			textHover: color.white,
			bgHover: color.primary, // lighter
			borderHover: color.primary, // lighter
			textActive: color.white,
			bgActive: color.primary, // darker
			borderActive: color.primary, // darker
		},
		primaryOutline: {
			text: color.primary,
			bg: 'transparent',
			border: color.primary,
			textHover: color.primary, // lighter
			bgHover: 'transparent',
			borderHover: color.primary, // lighter
			textActive: color.primary, // darker
			bgActive: 'transparent',
			borderActive: color.primary, // darker
		},
		secondary: {
			text: '',
			bg: '',
			border: '',
			textHover: '',
			bgHover: '',
			borderHover: '',
			textActive: '',
			bgActive: '',
			borderActive: '',
		},
		secondaryOutline: {
			text: '',
			bg: '',
			border: '',
			textHover: '',
			bgHover: '',
			borderHover: '',
			textActive: '',
			bgActive: '',
			borderActive: '',
		},
		/*
		success: {
			text: '',
			bg: '',
			border: '',
			textHover: '',
			bgHover: '',
			borderHover: '',
			textActive: '',
			bgActive: '',
			borderActive: '',
		},
		successOutline: {
			text: '',
			bg: '',
			border: '',
			textHover: '',
			bgHover: '',
			borderHover: '',
			textActive: '',
			bgActive: '',
			borderActive: '',
		},
		*/
	},
	form: {
		input: {
			text: '',
			bg: '',
			border: '',
			textHover: '',
			bgHover: '',
			borderHover: '',
			textActive: '',
			bgActive: '',
			borderActive: '',
		},
	},
	page: {
		text: palette.black,
		muted: color.muted,
		background: 'rgb(250,250,250)',
		link: 'rgb(48,63,159)',
		linkHover: 'rgb(26,35,126)',
		linkActive: 'rgb(40,53,147)',
		block: {},
	},
	body: {
		text: 'rgb(77,77,77)',
		muted: 'rgba(77,77,77, .5)',
		bg: 'transparent',
		link: 'inherit',
		linkHover: 'inherit',
		linkActive: 'inherit',
		block: {
			text: 'rgb(77,77,77)',
			bg: 'rgb(238,238,238)',
			block: {},
		},
	},
	sidebar: {
		navItemHoverBg: 'rgb(235, 235, 235)',
		navItemBorder: 'rgb(225, 225, 225)',
		navItemActiveColor: palette.white,
		navItemActiveBg: color.primary,
		barText: 'rgb(77,77,77)',
		barBg: 'rgb(238,238,238)',
		barBorder: 'rgb(220,220,220)',
		panelText: 'rgb(77,77,77)',
		panelBg: 'rgb(225,225,225)',
		panelBorder: 'rgb(220,220,220)',
		triggerHover: color.primary,
	},
	header: {
		text: 'rgb(80,80,80)',
		bg: 'transparent',
		border: 'rgb(230,230,230)',
	},
	footer: {
		text: 'rgb(80,80,80)',
		bg: 'transparent',
		border: 'rgb(230,230,230)',
	},
};

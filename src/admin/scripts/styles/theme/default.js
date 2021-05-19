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
			placeholder: color.muted,
			text: color.black,
			bg: color.white,
			border: color.muted,
			textHover: color.black,
			bgHover: color.white,
			borderHover: color.primary,
			shadowHover: 'none',
			textActive: color.black,
			bgActive: color.white,
			borderActive: color.primary,
			shadowActive: '0 0 0 2px rgb(24 144 255 / 20%)',
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
		navItemHoverText: 'rgb(50,50,50)',
		navItemHoverBg: 'rgb(235, 235, 235)',
		navItemBorder: 'rgba(50,50,50,.5)',
		navItemActiveColor: palette.white,
		navItemActiveBg: color.primary,
		barText: 'rgb(200,200,200)',
		barBg: 'rgb(25,25,25)',
		barBorder: 'rgba(50,50,50,.75)',
		panelText: 'rgb(200,200,200)',
		panelBg: 'rgb(33,33,33)',
		panelBorder: 'rgba(50,50,50,.75)',
		triggerHover: color.white,
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

import palette, { color as Color } from '../palette';

const color = {
	...palette,
	brand: palette.pink,
	primary: palette.deepPurple,
	secondary: palette.blueGrey,
	muted: palette.blueGrey.alpha(0.75),
	action: {
		default: Color('rgb(48,63,159)'),
		hover: Color('rgb(26,35,126)'),
		active: Color('rgb(40,53,147)'),
		disabled: palette.black.alpha(0.5),
	},
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
	link: {
		default: color.action.default,
		hover: color.action.hover,
		active: color.action.active,
		disabled: color.action.disabled,
	},
	page: {
		bg: color.white,
		selection: {
			text: color.white,
			bg: color.primary,
		},
	},
	body: {
		text: color.black.alpha(0.85),
		muted: color.muted,
		bg: color.white,
		//
		link: 'inherit',
		linkHover: 'inherit',
		linkActive: 'inherit',
		//
	},
	block: {
		text: Color('rgb(77,77,77)'),
		bg: Color('rgb(238,238,238)'),
		border: '',
		shadow: '',
		block: {},
	},
	sidebar: {
		navItemHoverText: 'rgb(235, 235, 235)',
		navItemHoverBg: 'rgba(235, 235, 235, .05)',
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
	_: {
		alert: {
			text: color.black,
			bg: color.white,
			success: {
				text: color.green,
				border: `1px solid ${color.green.lighten(0.5)}`,
			},
			info: {
				text: color.lightBlue,
				border: `1px solid ${color.lightBlue.lighten(0.5)}`,
			},
			warning: {
				text: color.amber,
				border: `1px solid ${color.amber.lighten(0.5)}`,
			},
			error: {
				text: color.red,
				border: `1px solid ${color.red.lighten(0.5)}`,
			},
		},
		anchor: {
			text: color.black.alpha(0.85),
			textActive: color.primary,
			bg: color.white,
			border: `2px solid ${color.primary}`,
		},
		input: {
			text: color.black.alpha(0.85),
			bg: color.white.darken(0.05),
			border: `1px solid ${color.white.darken(0.15)}`,
			muted: color.black.alpha(0.45),
			shadow: '',
			hover: {
				text: '',
				bg: '',
				border: '',
				shadow: '',
			},
			active: {
				text: color.action.active,
				bg: '',
				border: '',
				shadow: '',
			},
			focus: {
				text: '',
				bg: '',
				border: color.action.default,
				shadow: '0 0 0 2px rgba(24, 144, 255, 0.2)',
			},
			disabled: {
				text: color.black.alpha(0.35),
				bg: color.white.darken(0.125),
				border: '',
				shadow: '',
				active: {
					text: '',
					bg: '',
					border: '',
					shadow: '',
				},
			},
		},
		select: {
			selector: {
				border: color.action.default,
			},
			single: {
				item: {
					text: color.white.darken(0.15),
				},
			},
			multiple: {
				item: {
					text: color.white.darken(0.15),
					border: color.white.darken(0.25),
				},
			},
			dropdown: {
				shadow: `0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)`,
			},
		},
		popOver: {
			text: color.muted,
		},
	},
};

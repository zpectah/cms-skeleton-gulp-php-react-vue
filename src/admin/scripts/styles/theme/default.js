import palette from '../palette';

const color = {
	...palette,
	primary: 'rgb(233,30,99)',
	secondary: 'rgb(38,50,56)',
	muted: 'rgb(69,90,100)',
};

export default {
	color: color,
	page: {
		text: palette.black,
		muted: 'rgba(69,90,100,.75)',
		background: 'rgb(250,250,250)',
		link: 'rgb(48,63,159)',
		linkHover: 'rgb(26,35,126)',
		linkActive: 'rgb(40,53,147)',
		block: {},
	},
	body: {
		text: 'rgb(77,77,77)',
		muted: 'rgba(77,77,77, .5)',
		bg: 'rgb(238,238,238)',
		link: 'inherit',
		linkHover: 'inherit',
		linkActive: 'inherit',
		block: {
			block: {},
		},
	},
	sidebar: {
		text: 'rgb(77,77,77)',
		bg: 'rgb(238,238,238)',
		navItemHoverBg: 'rgb(235, 235, 235)',
		navItemBorder: 'rgb(225, 225, 225)',
		navItemActiveColor: palette.white,
		navItemActiveBg: color.primary,
		barText: 'rgb(77,77,77)',
		barBg: 'rgb(238,238,238)',
		barBorder: 'rgb(220,220,220)',
		panelText: 'rgb(77,77,77)',
		panelBg: 'rgba(238,238,238, .75)',
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

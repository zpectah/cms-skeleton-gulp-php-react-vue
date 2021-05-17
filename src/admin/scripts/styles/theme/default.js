import palette from '../palette';

export default {
	color: {
		...palette,
		primary: 'rgb(233,30,99)',
		secondary: 'rgb(38,50,56)',
		muted: 'rgb(69,90,100)',
		link: 'rgb(48,63,159)',
		linkHover: 'rgb(26,35,126)',
		linkActive: 'rgb(40,53,147)',
	},
	page: {
		text: palette.black,
		muted: '',
		background: 'rgb(250,250,250)',
		link: '',
		linkHover: '',
		linkActive: '',
		block: {},
	},
	body: {
		text: '',
		muted: '',
		background: '',
		link: '',
		linkHover: '',
		linkActive: '',
		block: {
			block: {},
		},
	},
	sidebar: {
		text: '',
		muted: '',
		background: '',
		link: '',
		linkHover: '',
		linkActive: '',
		bar: {
			text: '',
			muted: '',
			background: '',
			link: '',
			linkHover: '',
			linkActive: '',
		},
	},
	header: {},
	footer: {},
};

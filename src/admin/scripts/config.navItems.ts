import routes from './config.routes';

const app = [
	{
		key: 1,
		label: routes.app.dashboard.label,
		path: routes.app.dashboard.path,
		active: true,
	},
	{
		key: 2,
		label: routes.app.settings.label,
		path: routes.app.settings.path,
		active: true,
	},
	{
		key: 3,
		label: routes.app.users.label,
		path: routes.app.users.path,
		active: true,
	},
	{
		key: 4,
		label: routes.app.posts.label,
		path: routes.app.posts.path,
		active: true,
	},
	{
		key: 5,
		label: routes.app.tags.label,
		path: routes.app.tags.path,
		active: true,
	},
	{
		key: 6,
		label: routes.app.categories.label,
		path: routes.app.categories.path,
		active: true,
	},
	{
		key: 7,
		label: routes.app.translations.label,
		path: routes.app.translations.path,
		active: true,
	},
	{
		key: 8,
		label: routes.app.pages.label,
		path: routes.app.pages.path,
		active: true,
	},
	{
		key: 9,
		label: routes.app.uploads.label,
		path: routes.app.uploads.path,
		active: true,
	},
	{
		key: 10,
		label: routes.app.menu.label,
		path: routes.app.menu.path,
		active: true,
	},
	{
		key: 11,
		label: routes.app.messages.label,
		path: routes.app.messages.path,
		active: true,
	},
];

const crm = [
	{
		key: 1,
		label: routes.crm.dashboard.label,
		path: routes.crm.dashboard.path,
		active: false,
	},
	{
		key: 2,
		label: routes.crm.campaigns.label,
		path: routes.crm.campaigns.path,
		active: true,
	},
];

const members = [
	{
		key: 1,
		label: routes.members.dashboard.label,
		path: routes.members.dashboard.path,
		active: false,
	},
	{
		key: 2,
		label: routes.members.members.label,
		path: routes.members.members.path,
		active: true,
	},
];

const market = [
	{
		key: 1,
		label: routes.market.dashboard.label,
		path: routes.market.dashboard.path,
		active: true,
	},
	{
		key: 2,
		label: routes.market.products.label,
		path: routes.market.products.path,
		active: true,
	},
];

export default {
	app: app,
	crm: crm,
	members: members,
	market: market,
};

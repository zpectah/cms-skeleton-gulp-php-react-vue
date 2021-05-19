import routes from './config.routes';

type NavItemProps = {
	key: number;
	label: string;
	path: string | null; // TODO
	active: boolean;
	auth: number;
};

const app: NavItemProps[] = [
	{
		key: 1,
		label: routes.app.dashboard.label,
		path: routes.app.dashboard.path,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 2,
		label: routes.app.settings.label,
		path: routes.app.settings.path,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 3,
		label: routes.app.users.label,
		path: routes.app.users.path,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 4,
		label: routes.app.posts.label,
		path: routes.app.posts.path,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 5,
		label: routes.app.tags.label,
		path: routes.app.tags.path,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 6,
		label: routes.app.categories.label,
		path: routes.app.categories.path,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 7,
		label: routes.app.translations.label,
		path: routes.app.translations.path,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 8,
		label: routes.app.pages.label,
		path: routes.app.pages.path,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 9,
		label: routes.app.uploads.label,
		path: routes.app.uploads.path,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 10,
		label: routes.app.menu.label,
		path: routes.app.menu.path,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 11,
		label: routes.app.messages.label,
		path: routes.app.messages.path,
		active: true,
		auth: 2, // TODO
	},
];

const crm: NavItemProps[] = [
	{
		key: 1,
		label: routes.crm.dashboard.label,
		path: routes.crm.dashboard.path,
		active: false,
		auth: 2, // TODO
	},
	{
		key: 2,
		label: routes.crm.campaigns.label,
		path: routes.crm.campaigns.path,
		active: true,
		auth: 2, // TODO
	},
];

const members: NavItemProps[] = [
	{
		key: 1,
		label: routes.members.dashboard.label,
		path: routes.members.dashboard.path,
		active: false,
		auth: 2, // TODO
	},
	{
		key: 2,
		label: routes.members.members.label,
		path: routes.members.members.path,
		active: true,
		auth: 2, // TODO
	},
];

const market: NavItemProps[] = [
	{
		key: 1,
		label: routes.market.dashboard.label,
		path: routes.market.dashboard.path,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 2,
		label: routes.market.products.label,
		path: routes.market.products.path,
		active: true,
		auth: 2, // TODO
	},
];

const add: NavItemProps[] = [
	{
		key: 0,
		label: 'model_newItem.Posts',
		path: routes.app.posts.pathDetail,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 1,
		label: 'model_newItem.Users',
		path: routes.app.users.pathDetail,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 2,
		label: 'model_newItem.Tags',
		path: routes.app.tags.pathDetail,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 3,
		label: 'model_newItem.Translations',
		path: routes.app.translations.pathDetail,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 4,
		label: 'model_newItem.Categories',
		path: routes.app.categories.pathDetail,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 5,
		label: 'model_newItem.Pages',
		path: routes.app.pages.pathDetail,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 6,
		label: 'model_newItem.Uploads',
		path: routes.app.uploads.pathDetail,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 7,
		label: 'model_newItem.Menu',
		path: routes.app.menu.pathDetail,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 8,
		label: 'model_newItem.Messages',
		path: routes.app.messages.pathDetail,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 9,
		label: 'model_newItem.Members',
		path: routes.members.members.pathDetail,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 10,
		label: 'model_newItem.Campaigns',
		path: routes.crm.campaigns.pathDetail,
		active: true,
		auth: 2, // TODO
	},
	{
		key: 11,
		label: 'model_newItem.Products',
		path: routes.market.products.pathDetail,
		active: true,
		auth: 2, // TODO
	},

	{
		key: 12,
		label: 'model_newItem.Deliveries',
		// path: routes.market.deliveries.pathDetail, // TODO
		path: null,
		active: false,
		auth: 2, // TODO
	},
	{
		key: 13,
		label: 'model_newItem.Distributors',
		// path: routes.market.distributors.pathDetail, // TODO
		path: null,
		active: false,
		auth: 2, // TODO
	},
	{
		key: 14,
		label: 'model_newItem.Payments',
		// path: routes.market.payments.pathDetail, // TODO
		path: null,
		active: false,
		auth: 2, // TODO
	},
	{
		key: 15,
		label: 'model_newItem.Producers',
		// path: routes.market.producers.pathDetail, // TODO
		path: null,
		active: false,
		auth: 2, // TODO
	},
	{
		key: 16,
		label: 'model_newItem.Stores',
		// path: routes.market.stores.pathDetail, // TODO
		path: null,
		active: false,
		auth: 2, // TODO
	},
];

export default {
	app: app,
	crm: crm,
	members: members,
	market: market,
	add: add,
};

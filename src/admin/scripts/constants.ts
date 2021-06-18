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
export const RELOAD_HOOK_TIMEOUT = 125;
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
export const USER_LEVEL = {
	demo: {
		id: 0,
		key: 'demo',
	},
	redactor: {
		id: 2,
		key: 'redactor',
	},
	chief_redactor: {
		id: 3,
		key: 'chief_redactor',
	},
	admin: {
		id: 5,
		key: 'admin',
	},
	super_admin: {
		id: 7,
		key: 'super_admin',
	},
};
export const ROUTE_PATH_SUFFIX_DETAIL = '/detail';
export const ROUTE_PATH_ATTR_DETAIL_ID = ROUTE_PATH_SUFFIX_DETAIL + '/:id';
export const ROUTE_PATH_ATTR_PANEL = '/:panel';
export const ROUTE_PATH_ATTR_TOKEN = '/token/:token';
export const IMAGE_CROP_OPTIONS = [
	{
		label: '1:1',
		value: 1 / 1,
	},
	{
		label: '3:2',
		value: 3 / 2,
	},
	{
		label: '4:3',
		value: 4 / 3,
	},
	{
		label: '16:9',
		value: 16 / 9,
	},
	//
	{
		label: '2:3',
		value: 2 / 3,
	},
	{
		label: '3:4',
		value: 3 / 4,
	},
	{
		label: '9:16',
		value: 9 / 16,
	},
];

export const ROUTES = {
	app: {
		'error-404': {
			path: null,
			name: 'error-404',
			label: null,
			auth: 0,
		},
		login: {
			path: '/admin/login',
			name: 'login',
			label: null,
			auth: 0,
		},
		'lost-password': {
			path: '/admin/lost-password',
			name: 'lost-password',
			label: null,
			auth: 0,
		},
		dashboard: {
			path: '/admin',
			name: 'dashboard',
			label: 'Dashboard.label',
			auth: USER_LEVEL.redactor.id,
		},
		settings: {
			path: '/admin/settings',
			name: 'settings',
			label: 'Settings.label',
			auth: USER_LEVEL.admin.id,
		},
		posts: {
			path: '/admin/posts',
			name: 'posts',
			label: 'Posts.label',
			auth: USER_LEVEL.redactor.id,
		},
		users: {
			path: '/admin/users',
			name: 'users',
			label: 'Users.label',
			auth: USER_LEVEL.admin.id,
		},
		tags: {
			path: '/admin/tags',
			name: 'tags',
			label: 'Tags.label',
			auth: USER_LEVEL.redactor.id,
		},
		translations: {
			path: '/admin/translations',
			name: 'translations',
			label: 'Translations.label',
			auth: USER_LEVEL.chief_redactor.id,
		},
		categories: {
			path: '/admin/categories',
			name: 'categories',
			label: 'Categories.label',
			auth: USER_LEVEL.redactor.id,
		},
		pages: {
			path: '/admin/pages',
			name: 'pages',
			label: 'Pages.label',
			auth: USER_LEVEL.chief_redactor.id,
		},
		uploads: {
			path: '/admin/uploads',
			name: 'uploads',
			label: 'Uploads.label',
			auth: USER_LEVEL.redactor.id,
		},
		messages: {
			path: '/admin/messages',
			name: 'messages',
			label: 'Messages.label',
			auth: USER_LEVEL.admin.id,
		},
		requests: {
			path: '/admin/requests',
			name: 'requests',
			label: 'Requests.label',
			auth: USER_LEVEL.admin.id,
		},
		menu: {
			path: '/admin/menu',
			name: 'menu',
			label: 'Menu.label',
			auth: USER_LEVEL.chief_redactor.id,
		},
	},
	members: {
		dashboard: {
			path: '/admin/members',
			name: 'dashboard',
			label: 'MembersDashboard.label',
			auth: USER_LEVEL.chief_redactor.id,
		},
		members: {
			path: '/admin/members/items',
			name: 'members',
			label: 'Members.label',
			auth: USER_LEVEL.chief_redactor.id,
		},
	},
	market: {
		dashboard: {
			path: '/admin/market',
			name: 'dashboard',
			label: 'MarketDashboard.label',
			auth: USER_LEVEL.chief_redactor.id,
		},
		products: {
			path: '/admin/market/products',
			name: 'products',
			label: 'Products.label',
			auth: USER_LEVEL.chief_redactor.id,
		},
		'products-options': {
			path: '/admin/market/products-options',
			name: 'products-options',
			label: 'ProductsOptions.label',
			auth: USER_LEVEL.chief_redactor.id,
		},
		stores: {
			path: '/admin/market/stores',
			name: 'stores',
			label: 'Stores.label',
			auth: USER_LEVEL.chief_redactor.id,
		},
		deliveries: {
			path: '/admin/market/deliveries',
			name: 'deliveries',
			label: 'Deliveries.label',
			auth: USER_LEVEL.chief_redactor.id,
		},
		distributors: {
			path: '/admin/market/distributors',
			name: 'distributors',
			label: 'Distributors.label',
			auth: USER_LEVEL.chief_redactor.id,
		},
		payments: {
			path: '/admin/market/payments',
			name: 'payments',
			label: 'Payments.label',
			auth: USER_LEVEL.chief_redactor.id,
		},
		producers: {
			path: '/admin/market/producers',
			name: 'producers',
			label: 'Producers.label',
			auth: USER_LEVEL.chief_redactor.id,
		},
	},
};

export const NAV_ITEMS = {
	app: [
		{
			key: 1,
			label: ROUTES.app.dashboard.label,
			path: ROUTES.app.dashboard.path,
			active: true,
			auth: USER_LEVEL.redactor.id,
		},
		{
			key: 2,
			label: ROUTES.app.settings.label,
			path: ROUTES.app.settings.path,
			active: true,
			auth: USER_LEVEL.admin.id,
		},
		{
			key: 3,
			label: ROUTES.app.users.label,
			path: ROUTES.app.users.path,
			active: true,
			auth: USER_LEVEL.admin.id,
		},
		{
			key: 4,
			label: ROUTES.app.posts.label,
			path: ROUTES.app.posts.path,
			active: true,
			auth: USER_LEVEL.redactor.id,
		},
		{
			key: 5,
			label: ROUTES.app.tags.label,
			path: ROUTES.app.tags.path,
			active: true,
			auth: USER_LEVEL.redactor.id,
		},
		{
			key: 6,
			label: ROUTES.app.categories.label,
			path: ROUTES.app.categories.path,
			active: true,
			auth: USER_LEVEL.redactor.id,
		},
		{
			key: 7,
			label: ROUTES.app.translations.label,
			path: ROUTES.app.translations.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 8,
			label: ROUTES.app.pages.label,
			path: ROUTES.app.pages.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 9,
			label: ROUTES.app.uploads.label,
			path: ROUTES.app.uploads.path,
			active: true,
			auth: USER_LEVEL.redactor.id,
		},
		{
			key: 10,
			label: ROUTES.app.menu.label,
			path: ROUTES.app.menu.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 11,
			label: ROUTES.app.messages.label,
			path: ROUTES.app.messages.path,
			active: true,
			auth: USER_LEVEL.admin.id,
		},
		{
			key: 12,
			label: ROUTES.app.requests.label,
			path: ROUTES.app.requests.path,
			active: true,
			auth: USER_LEVEL.admin.id,
		},
	],
	members: [
		{
			key: 1,
			label: ROUTES.members.dashboard.label,
			path: ROUTES.members.dashboard.path,
			active: false,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 2,
			label: ROUTES.members.members.label,
			path: ROUTES.members.members.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
	],
	market: [
		{
			key: 1,
			label: ROUTES.market.dashboard.label,
			path: ROUTES.market.dashboard.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 2,
			label: ROUTES.market.products.label,
			path: ROUTES.market.products.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 3,
			label: ROUTES.market['products-options'].label,
			path: ROUTES.market['products-options'].path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 4,
			label: ROUTES.market.deliveries.label,
			path: ROUTES.market.deliveries.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 5,
			label: ROUTES.market.distributors.label,
			path: ROUTES.market.distributors.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 6,
			label: ROUTES.market.payments.label,
			path: ROUTES.market.payments.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 7,
			label: ROUTES.market.producers.label,
			path: ROUTES.market.producers.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 8,
			label: ROUTES.market.stores.label,
			path: ROUTES.market.stores.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
	],
	add: [
		{
			key: 0,
			label: 'model_newItem.Posts',
			path: ROUTES.app.posts.path,
			active: true,
			auth: USER_LEVEL.redactor.id,
		},
		{
			key: 1,
			label: 'model_newItem.Users',
			path: ROUTES.app.users.path,
			active: true,
			auth: USER_LEVEL.admin.id,
		},
		{
			key: 2,
			label: 'model_newItem.Tags',
			path: ROUTES.app.tags.path,
			active: true,
			auth: USER_LEVEL.redactor.id,
		},
		{
			key: 3,
			label: 'model_newItem.Translations',
			path: ROUTES.app.translations.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 4,
			label: 'model_newItem.Categories',
			path: ROUTES.app.categories.path,
			active: true,
			auth: USER_LEVEL.redactor.id,
		},
		{
			key: 5,
			label: 'model_newItem.Pages',
			path: ROUTES.app.pages.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 6,
			label: 'model_newItem.Uploads',
			path: ROUTES.app.uploads.path,
			active: true,
			auth: USER_LEVEL.redactor.id,
		},
		{
			key: 7,
			label: 'model_newItem.Menu',
			path: ROUTES.app.menu.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 9,
			label: 'model_newItem.Members',
			path: ROUTES.members.members.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 11,
			label: 'model_newItem.Products',
			path: ROUTES.market.products.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 12,
			label: 'model_newItem.ProductsOptions',
			path: ROUTES.market['products-options'].path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 13,
			label: 'model_newItem.Deliveries',
			path: ROUTES.market.deliveries.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 14,
			label: 'model_newItem.Distributors',
			path: ROUTES.market.distributors.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 15,
			label: 'model_newItem.Payments',
			path: ROUTES.market.payments.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 16,
			label: 'model_newItem.Producers',
			path: ROUTES.market.producers.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
		{
			key: 17,
			label: 'model_newItem.Stores',
			path: ROUTES.market.stores.path,
			active: true,
			auth: USER_LEVEL.chief_redactor.id,
		},
	],
};

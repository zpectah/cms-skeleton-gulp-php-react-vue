const app = {
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
		auth: 2,
	},
	settings: {
		path: '/admin/settings',
		name: 'settings',
		label: 'Settings.label',
		auth: 7,
	},
	posts: {
		path: '/admin/posts',
		name: 'posts',
		label: 'Posts.label',
		auth: 2,
	},
	users: {
		path: '/admin/users',
		name: 'users',
		label: 'Users.label',
		auth: 7,
	},
	tags: {
		path: '/admin/tags',
		name: 'tags',
		label: 'Tags.label',
		auth: 2,
	},
	translations: {
		path: '/admin/translations',
		name: 'translations',
		label: 'Translations.label',
		auth: 2,
	},
	categories: {
		path: '/admin/categories',
		name: 'categories',
		label: 'Categories.label',
		auth: 2,
	},
	pages: {
		path: '/admin/pages',
		name: 'pages',
		label: 'Pages.label',
		auth: 2,
	},
	uploads: {
		path: '/admin/uploads',
		name: 'uploads',
		label: 'Uploads.label',
		auth: 2,
	},
	messages: {
		path: '/admin/messages',
		name: 'messages',
		label: 'Messages.label',
		auth: 2,
	},
	menu: {
		path: '/admin/menu',
		name: 'menu',
		label: 'Menu.label',
		auth: 2,
	},
};

const members = {
	dashboard: {
		path: '/admin/members',
		name: 'dashboard',
		label: 'MembersDashboard.label',
		auth: 2,
	},
	members: {
		path: '/admin/members/items',
		name: 'members',
		label: 'Members.label',
		auth: 2,
	},
};

const market = {
	dashboard: {
		path: '/admin/market',
		name: 'dashboard',
		label: 'MarketDashboard.label',
		auth: 2,
	},
	products: {
		path: '/admin/market/products',
		name: 'products',
		label: 'Products.label',
		auth: 2,
	},
	stores: {
		path: '/admin/market/stores',
		name: 'stores',
		label: 'Stores.label',
		auth: 2,
	},
	deliveries: {
		path: '/admin/market/deliveries',
		name: 'deliveries',
		label: 'Deliveries.label',
		auth: 2,
	},
	distributors: {
		path: '/admin/market/distributors',
		name: 'distributors',
		label: 'Distributors.label',
		auth: 2,
	},
	payments: {
		path: '/admin/market/payments',
		name: 'payments',
		label: 'Payments.label',
		auth: 2,
	},
	producers: {
		path: '/admin/market/producers',
		name: 'producers',
		label: 'Producers.label',
		auth: 2,
	},
};

export default {
	app: app,
	members: members,
	market: market,
};

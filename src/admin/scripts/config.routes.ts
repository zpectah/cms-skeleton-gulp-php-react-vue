const app = {
	'error-404': {
		path: null,
		pathDetail: null,
		name: 'error-404',
		label: null,
		auth: 0,
	},
	login: {
		path: '/admin/login',
		pathDetail: null,
		name: 'login',
		label: null,
		auth: 0,
	},
	'lost-password': {
		path: '/admin/lost-password',
		pathDetail: null,
		name: 'lost-password',
		label: null,
		auth: 0,
	},
	dashboard: {
		path: '/admin',
		pathDetail: null,
		name: 'dashboard',
		label: 'Dashboard.label',
		auth: 2,
	},
	settings: {
		path: '/admin/settings',
		pathDetail: null,
		name: 'settings',
		label: 'Settings.label',
		auth: 7,
	},
	posts: {
		path: '/admin/posts',
		pathDetail: '/admin/posts/detail',
		name: 'posts',
		label: 'Posts.label',
		auth: 2,
	},
	users: {
		path: '/admin/users',
		pathDetail: '/admin/users/detail',
		name: 'users',
		label: 'Users.label',
		auth: 7,
	},
	tags: {
		path: '/admin/tags',
		pathDetail: '/admin/tags/detail',
		name: 'tags',
		label: 'Tags.label',
		auth: 2,
	},
	translations: {
		path: '/admin/translations',
		pathDetail: '/admin/translations/detail',
		name: 'translations',
		label: 'Translations.label',
		auth: 2,
	},
	categories: {
		path: '/admin/categories',
		pathDetail: '/admin/categories/detail',
		name: 'categories',
		label: 'Categories.label',
		auth: 2,
	},
	pages: {
		path: '/admin/pages',
		pathDetail: '/admin/pages/detail',
		name: 'pages',
		label: 'Pages.label',
		auth: 2,
	},
	uploads: {
		path: '/admin/uploads',
		pathDetail: '/admin/uploads/detail',
		name: 'uploads',
		label: 'Uploads.label',
		auth: 2,
	},
	messages: {
		path: '/admin/messages',
		pathDetail: '/admin/messages/detail',
		name: 'messages',
		label: 'Messages.label',
		auth: 2,
	},
	menu: {
		path: '/admin/menu',
		pathDetail: '/admin/menu/detail',
		name: 'menu',
		label: 'Menu.label',
		auth: 2,
	},
};

const crm = {
	dashboard: {
		path: '/admin/crm',
		pathDetail: null,
		name: 'dashboard',
		label: 'CrmDashboard.label',
		auth: 2,
	},
	campaigns: {
		path: '/admin/crm/campaigns',
		pathDetail: '/admin/crm/campaigns/detail',
		name: 'campaigns',
		label: 'Campaigns.label',
		auth: 2,
	},
};

const members = {
	dashboard: {
		path: '/admin/members',
		pathDetail: null,
		name: 'dashboard',
		label: 'MembersDashboard.label',
		auth: 2,
	},
	members: {
		path: '/admin/members/items',
		pathDetail: '/admin/members/items/detail',
		name: 'members',
		label: 'Members.label',
		auth: 2,
	},
};

const market = {
	dashboard: {
		path: '/admin/market',
		pathDetail: null,
		name: 'dashboard',
		label: 'MarketDashboard.label',
		auth: 2,
	},
	products: {
		path: '/admin/market/products',
		pathDetail: '/admin/market/products/detail',
		name: 'products',
		label: 'Products.label',
		auth: 2,
	},
};

export default {
	app: app,
	crm: crm,
	members: members,
	market: market,
};

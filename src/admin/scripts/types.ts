export interface storeProps {
	ui: {
		language: string;
		theme: string;
		help: string;
		sideBarOpen: boolean;
	};
}

export interface appProps {
	app: 'App' | 'Members' | 'Market';
	modelApp:
		| 'Posts'
		| 'Users'
		| 'Tags'
		| 'Translations'
		| 'Categories'
		| 'Pages'
		| 'Requests'
		| 'Messages'
		| 'Uploads'
		| 'Menu'
		| 'MenuItems';
	modelMembers: 'Members';
	modelMarket:
		| 'Products'
		| 'Producers'
		| 'Distributors'
		| 'Stores'
		| 'Payments'
		| 'Deliveries';
	// TODO: new model
}

export interface routeProps {
	path: string | null;
	name: string;
	label: string | null;
	auth: number;
}

export interface commonModelProps {
	is_new?: boolean;
	id: string | number;
	active: number | boolean;
	deleted?: number | boolean;
}

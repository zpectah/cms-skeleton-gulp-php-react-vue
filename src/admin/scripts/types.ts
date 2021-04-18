export interface storeProps {
	ui: {
		language: string;
		theme: string;
		sideBarOpen: boolean;
		loadingData: boolean;
		dataError: boolean;
	};
	user: {
		user?: {
			// TODO
			id: string;
			email: string;
			nickname: string;
			name_first: string;
			name_middle: string;
			name_last: string;
		};
	};
	App: {
		Settings: any[]; // TODO
		Posts: any[]; // TODO
		Users: any[]; // TODO
		Tags: any[]; // TODO
	};
	Members: {};
	Crm: {};
	Market: {};
}

export interface appProps {
	app: 'App' | 'Members' | 'Crm' | 'Market';
	model: 'Posts' | 'Users' | 'Tags'; // TODO
}

export interface routeProps {
	path: string | null;
	pathDetail: string | null;
	name: string;
	label: string | null;
	auth: number;
}

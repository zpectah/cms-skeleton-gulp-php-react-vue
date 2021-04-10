export interface storeProps {
	ui: {
		language: string;
		theme: string;
		sideBarOpen: boolean;
		loadingData: boolean;
	};
	user: {
		user?: {
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
	};
	Crm: {};
	Market: {};
}

export interface appProps {
	app: 'App' | 'Crm' | 'Market';
	model: 'Posts' | 'Users'; // TODO
}

export interface routeProps {
	path: string | null;
	pathDetail: string | null;
	name: string;
	label: string | null;
	auth: number;
}

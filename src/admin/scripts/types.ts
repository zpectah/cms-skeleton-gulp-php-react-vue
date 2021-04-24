export interface storeProps {
	ui: {
		language: string;
		theme: string;
		sideBarOpen: boolean;
		loadingData: boolean;
		dataError: boolean;
	};
}

export interface appProps {
	app: 'App' | 'Members' | 'Crm' | 'Market';
	model: 'Posts' | 'Users' | 'Tags'; // TODO: new model
}

export interface routeProps {
	path: string | null;
	pathDetail: string | null;
	name: string;
	label: string | null;
	auth: number;
}

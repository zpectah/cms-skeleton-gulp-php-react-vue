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
	model: 'Posts' | 'Users' | 'Tags' | 'Translations'; // TODO: new model
}

export interface routeProps {
	path: string | null;
	pathDetail: string | null;
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

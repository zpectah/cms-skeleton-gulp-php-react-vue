import { UsersItemProps, PostsItemProps, TagsItemProps } from './App/types';

export interface storeProps {
	ui: {
		language: string;
		theme: string;
		sideBarOpen: boolean;
		loadingData: boolean;
		dataError: boolean;
	};
	user: {
		user?: UsersItemProps;
	};
	app: {
		// Settings: any[];
		Posts: PostsItemProps[];
		Users: UsersItemProps[];
		Tags: TagsItemProps[];
	};
	members: {};
	crm: {};
	market: {};
}

export interface appProps {
	app: 'App' | 'Members' | 'Crm' | 'Market';
	// TODO: MODEL
	model: 'Posts' | 'Users' | 'Tags';
}

export interface routeProps {
	path: string | null;
	pathDetail: string | null;
	name: string;
	label: string | null;
	auth: number;
}

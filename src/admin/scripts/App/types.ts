import { commonModelProps } from '../types';

export interface UsersItemProps extends commonModelProps {
	email: string;
	password: string;
	nickname: string;
	first_name: string;
	middle_name?: string;
	last_name: string;
	user_level: number;
	user_group: string;
	user_avatar?: string;
}

export interface PostsItemProps extends commonModelProps {
	type: 'article' | 'blog' | 'event' | 'media' | 'reference' | 'custom_1';
	name: string;
	category?: string[];
	tags?: string[];
	event_start?: string;
	event_end?: string;
	event_location?: string;
	post_options?: string;
	media?: string[];
	img_main?: string;
	img_thumbnail?: string;
	author?: number;
	published?: string;
	lang?: {
		title: string;
		perex?: string;
		content: string;
	};
}

export interface TagsItemProps extends commonModelProps {
	name: string;
}

export interface TranslationsItemProps extends commonModelProps {
	name: string;
	lang?: {
		t_value: string;
	};
}

export interface CategoriesItemProps extends commonModelProps {
	type: 'default' | 'primary' | 'secondary';
	name: string;
	parent?: string;
	img_main?: string;
	img_thumbnail?: string;
	lang?: {
		title: string;
		perex?: string;
		content?: string;
	};
}

export interface PagesItemProps extends commonModelProps {
	type: 'default' | 'system' | 'category' | 'tags';
	name: string;
	lang?: {
		title: string;
		content: string;
	};
}

export interface UploadsItemProps extends commonModelProps {
	type: 'undefined' | 'image' | 'audio' | 'video' | 'document' | 'archive';
	name: string;
	extension: string;
	file_name: string;
	file_mime: string;
	file_size: string;
	category: any[];
	lang?: {
		title: string;
	};
}

export interface MenuItemProps extends commonModelProps {
	type: 'default' | 'primary' | 'secondary' | 'tertiary';
	name: string;
	parent?: string;
}

export interface MenuItemsItemProps extends commonModelProps {
	type: 'default' | 'external';
	name: string;
	link: string;
	parent?: string;
	menu?: string;
	lang?: {
		title: string;
	};
}

export interface MessagesItemProps {
	is_new?: boolean;
	id: number;
	type: 'default' | 'system';
	sender: string;
	recipients: string[];
	subject: string;
	content: string;
	status: number;
}

export interface RequestsItemProps {
	id: number;
	type: 'default' | 'user' | 'system';
	context: string;
	value: string;
	token: string;
	status: number;
}

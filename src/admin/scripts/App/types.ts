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
	media?: string[];
	img_main?: string;
	img_thumbnail?: string;
	author?: number;
	published?: string;
}

export interface TagsItemProps extends commonModelProps {
	name: string;
}

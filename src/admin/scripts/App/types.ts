import { commonModelProps } from '../types';

export interface UsersItemProps extends commonModelProps {
	email: string;
	password: string;
	nickname: string;
	first_name: string;
	middle_name: string;
	last_name: string;
	level: number;
	group: string[];
}

export interface PostsItemProps extends commonModelProps {
	name: string;
}

export interface TagsItemProps extends commonModelProps {
	name: string;
}

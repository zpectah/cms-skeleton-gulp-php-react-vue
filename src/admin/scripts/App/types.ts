export interface commonModelProps {
	is_new?: boolean;
	id: string | number;
	active: boolean;
}

export interface UsersItemProps extends commonModelProps {
	email: string;
	nickname?: string;
}

export interface PostsItemProps extends commonModelProps {
	name: string;
}

export interface TagsItemProps extends commonModelProps {
	name: string;
}

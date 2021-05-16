import { commonModelProps } from '../types';

export interface MembersItemProps extends commonModelProps {
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

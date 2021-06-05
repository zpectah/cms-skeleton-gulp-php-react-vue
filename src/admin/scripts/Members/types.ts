import { commonModelProps } from '../types';

export interface MembersItemProps extends commonModelProps {
	email: string;
	password: string;
	nickname: string;
	first_name: string;
	middle_name?: string;
	last_name: string;
	member_level: number;
	member_group: string;
	img_avatar?: string;
	member_country?: string;
	member_city?: string;
	member_address?: string;
	member_zip?: string;
	member_phone?: string[];
	member_email?: string[];
	description?: string;
}

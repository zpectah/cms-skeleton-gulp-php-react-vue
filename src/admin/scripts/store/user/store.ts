interface UserStoreProps {
	user?: {
		id: string;
		email: string;
		nickname: string;
		name_first: string;
		name_middle: string;
		name_last: string;
	};
}

const UserStoreState: UserStoreProps = {
	user: null,
};

export default UserStoreState;

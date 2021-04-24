import useSWR from 'swr';
import { UsersItemProps } from './types';

function useUser() {
	const User: UsersItemProps = {
		id: 1,
		email: 'default@user.cms',
		active: true,
	};

	return {
		User: User,
	};
}

function useSettings(inputData?: any) {
	const { data, error } = useSWR(`/api/get_settings`);

	return {
		Settings: data?.data,
		loading: !error && !data,
		error: error,
	};
}

function useUsers(inputData?: any) {
	const { data, error } = useSWR(`/api/get_users`);

	return {
		Users: data?.data,
		loading: !error && !data,
		error: error,
	};
}

function usePosts(inputData?: any) {
	const { data, error } = useSWR(`/api/get_posts`);

	return {
		Posts: data?.data,
		loading: !error && !data,
		error: error,
	};
}

function useTags(inputData?: any) {
	const { data, error } = useSWR(`/api/get_tags`);

	return {
		Tags: data?.data,
		loading: !error && !data,
		error: error,
	};
}

export { useUser, useSettings, useUsers, usePosts, useTags };

import useSWR, { mutate } from 'swr';

import api from '../utils/api';
import { UsersItemProps } from './types';

function useProfile() {
	// TODO
	// const { data, error } = useSWR(`/api/get_profile`);
	const Profile: UsersItemProps = {
		id: 1,
		email: 'default@user.cms',
		password: '...',
		nickname: 'Nickname',
		first_name: '...',
		middle_name: '...',
		last_name: '...',
		user_level: 7,
		user_group: '',
		active: true,
		deleted: 0,
	};

	return {
		Profile: Profile,
		// isProfileLoading: !data && !error,
		// isProfileError: error,
		// reloadProfile: () => mutate(`/api/get_profile`),
		updateProfile: (data: any) => api.post('/api/update_profile', data),
		userLogin: (data: any) => api.post('/api/user_login', data),
		userLogout: (data: any) => api.post('/api/user_logout', data),
		userLostPassword: (data: any) => api.post('/api/user_lost_password', data),
		userLostPasswordReset: (data: any) =>
			api.post('/api/user_lost_password_reset', data),
	};
}

function useSettings() {
	const { data, error } = useSWR(`/api/get_settings`);

	return {
		Settings: data?.data,
		isSettingsLoading: !data && !error,
		isSettingsError: error,
		reloadSettings: () => mutate(`/api/get_settings`),
		updateSettings: (data: any) => api.post('/api/update_settings', data),
	};
}

function useUsers() {
	const { data, error } = useSWR(`/api/get_users`);

	return {
		Users: data?.data,
		isUsersLoading: !data && !error,
		isUsersError: error,
		reloadUsers: () => mutate(`/api/get_users`),
		updateUsers: (data: any) => api.post('/api/update_users', data),
		createUsers: (data: any) => api.post('/api/create_users', data),
		deleteUsers: (data: any) => api.post('/api/delete_users', data),
		toggleUsers: (data: any) => api.post('/api/toggle_users', data),
	};
}

function usePosts() {
	const { data, error } = useSWR(`/api/get_posts`);

	return {
		Posts: data?.data,
		isPostsLoading: !data && !error,
		isPostsError: error,
		reloadPosts: () => mutate(`/api/get_posts`),
		updatePosts: (data: any) => api.post('/api/update_posts', data),
		createPosts: (data: any) => api.post('/api/create_posts', data),
		deletePosts: (data: any) => api.post('/api/delete_posts', data),
		togglePosts: (data: any) => api.post('/api/toggle_posts', data),
	};
}

function useTags() {
	const { data, error } = useSWR(`/api/get_tags`);

	return {
		Tags: data?.data,
		isTagsLoading: !data && !error,
		isTagsError: error,
		reloadTags: () => mutate(`/api/get_tags`),
		updateTags: (data: any) => api.post('/api/update_tags', data),
		createTags: (data: any) => api.post('/api/create_tags', data),
		deleteTags: (data: any) => api.post('/api/delete_tags', data),
		toggleTags: (data: any) => api.post('/api/toggle_tags', data),
	};
}

function useRequests() {
	const { data, error } = useSWR(`/api/get_requests`);

	return {
		Requests: data?.data,
		isRequestsLoading: !data && !error,
		isRequestError: error,
		reloadRequests: () => mutate(`/api/get_requests`),
		createRequests: (data: any) => api.post('/api/create_requests', data),
		deleteRequests: (data: any) => api.post('/api/delete_requests', data),
	};
}

function useMessages() {
	const { data, error } = useSWR(`/api/get_messages`); // TODO

	return {
		Messages: data?.data,
		isMessagesLoading: !data && !error,
		isMessagesError: error,
		reloadMessages: () => mutate(`/api/get_messages`),
		createMessages: (data: any) => api.post('/api/create_messages', data),
		deleteMessages: (data: any) => api.post('/api/delete_messages', data),
	};
}

function useTranslations() {
	const { data, error } = useSWR(`/api/get_translations`);

	return {
		Translations: data?.data,
		isTranslationsLoading: !data && !error,
		isTranslationsError: error,
		reloadTranslations: () => mutate(`/api/get_translations`),
		updateTranslations: (data: any) =>
			api.post('/api/update_translations', data),
		createTranslations: (data: any) =>
			api.post('/api/create_translations', data),
		deleteTranslations: (data: any) =>
			api.post('/api/delete_translations', data),
		toggleTranslations: (data: any) =>
			api.post('/api/toggle_translations', data),
	};
}

export {
	useProfile,
	useSettings,
	useUsers,
	usePosts,
	useTags,
	useRequests,
	useMessages,
	useTranslations,
};

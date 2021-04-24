import useSWR from 'swr';

import api from '../utils/api';
import { UsersItemProps } from './types';

function useProfile() {
	// const { data, error } = useSWR(`/api/get_profile`);
	const Profile: UsersItemProps = {
		id: 1,
		email: 'default@user.cms',
		active: true,
	};

	return {
		Profile: Profile,
		updateProfile: (data: any) => api.post('/api/update_profile', data),
	};
}

function useSettings() {
	const { data, error } = useSWR(`/api/get_settings`);

	return {
		Settings: data?.data,
		isLoading: !error && !data,
		isError: error,
		updateSettings: (data: any) => api.post('/api/update_settings', data),
	};
}

function useUsers() {
	const { data, error } = useSWR(`/api/get_users`);

	return {
		Users: data?.data,
		isLoading: !error && !data,
		isError: error,
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
		isLoading: !error && !data,
		isError: error,
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
		isLoading: !error && !data,
		isError: error,
		updateTags: (data: any) => api.post('/api/update_tags', data),
		createTags: (data: any) => api.post('/api/create_tags', data),
		deleteTags: (data: any) => api.post('/api/delete_tags', data),
		toggleTags: (data: any) => api.post('/api/toggle_tags', data),
	};
}

export { useProfile, useSettings, useUsers, usePosts, useTags };

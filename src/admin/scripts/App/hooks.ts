import useSWR from 'swr';

import api from '../utils/api';
import { UsersItemProps } from './types';

function useProfile() {
	const Profile: UsersItemProps = {
		id: 1,
		email: 'default@user.cms',
		active: true,
	};

	return {
		Profile: Profile,
		updateProfile: (data?: any) => {
			// TODO
			// create 'fake handler' for posting in hook
			console.log('fake handler: updateProfile', data);
		},
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
		updateUsers: (data: any) => {
			// TODO
			// create 'fake handler' for posting in hook
			console.log('fake handler: updateUsers', data);
		},
		createUsers: (data: any) => {
			// TODO
			// create 'fake handler' for posting in hook
			console.log('fake handler: createUsers', data);
		},
		deleteUsers: (data: any) => {
			// TODO
			// create 'fake handler' for posting in hook
			console.log('fake handler: deleteUsers', data);
		},
		toggleUsers: (data: any) => {
			// TODO
			// create 'fake handler' for posting in hook
			console.log('fake handler: toggleUsers', data);
		},
	};
}

function usePosts() {
	const { data, error } = useSWR(`/api/get_posts`);

	return {
		Posts: data?.data,
		isLoading: !error && !data,
		isError: error,
		updatePosts: (data: any) => {
			// TODO
			// create 'fake handler' for posting in hook
			console.log('fake handler: updatePosts', data);
		},
		createPosts: (data: any) => {
			// TODO
			// create 'fake handler' for posting in hook
			console.log('fake handler: createPosts', data);
		},
		deletePosts: (data: any) => {
			// TODO
			// create 'fake handler' for posting in hook
			console.log('fake handler: deletePosts', data);
		},
		togglePosts: (data: any) => {
			// TODO
			// create 'fake handler' for posting in hook
			console.log('fake handler: togglePosts', data);
		},
	};
}

function useTags() {
	const { data, error } = useSWR(`/api/get_tags`);

	return {
		Tags: data?.data,
		isLoading: !error && !data,
		isError: error,
		updateTags: (data: any) => {
			// TODO
			// create 'fake handler' for posting in hook
			console.log('fake handler: updateTags', data);
		},
		createTags: (data: any) => {
			// TODO
			// create 'fake handler' for posting in hook
			console.log('fake handler: createTags', data);
		},
		deleteTags: (data: any) => {
			// TODO
			// create 'fake handler' for posting in hook
			console.log('fake handler: deleteTags', data);
		},
		toggleTags: (data: any) => {
			// TODO
			// create 'fake handler' for posting in hook
			console.log('fake handler: toggleTags', data);
		},
	};
}

export { useProfile, useSettings, useUsers, usePosts, useTags };

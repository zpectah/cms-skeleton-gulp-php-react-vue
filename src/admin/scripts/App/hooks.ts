import useSWR, { mutate } from 'swr';

import api from '../utils/api';

function useSystemApi() {
	return {
		installLanguage: (data: any) => api.post('/api/install_language', data),
		installModule: (data: any) => api.post('/api/install_module', data),
		repairLanguageTables: (data: any) =>
			api.post('/api/repair_language_tables', data),
		exportSqlDump: (data: any) => api.postRaw('/api/export_table_dump', data),
		importSqlDump: (data: any) => api.post('/api/import_table_data', data),
	};
}

function useProfile() {
	const { data, error } = useSWR(`/api/get_profile`, api.get);

	return {
		Profile: data?.data,
		isProfileLoading: !data && !error,
		isProfileError: error,
		reloadProfile: () => mutate(`/api/get_profile`),
		updateProfile: (data: any) => api.post('/api/update_profile', data),
		userLogin: (data: any) => api.post('/api/user_login', data),
		userLogout: (data: any) => api.post('/api/user_logout', data),
		userLostPassword: (data: any) => api.post('/api/user_lost_password', data),
		userLostPasswordReset: (data: any) =>
			api.post('/api/user_lost_password_reset', data),
		userShouldShow: (level: number) => {
			const userLevel = data?.data?.user_level;

			return Number(userLevel) >= Number(level);
		},
	};
}

function useSettings() {
	const { data, error } = useSWR(`/api/get_settings`, api.get);

	return {
		Settings: data?.data,
		isSettingsLoading: !data && !error,
		isSettingsError: error,
		reloadSettings: () => mutate(`/api/get_settings`),
		updateSettings: (data: any) => api.post('/api/update_settings', data),
	};
}

function useUsers() {
	const { data, error } = useSWR(`/api/get_users`, api.get);

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
	const { data, error } = useSWR(`/api/get_posts`, api.get);

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

function usePages() {
	const { data, error } = useSWR(`/api/get_pages`, api.get);

	return {
		Pages: data?.data,
		isPagesLoading: !data && !error,
		isPagesError: error,
		reloadPages: () => mutate(`/api/get_pages`),
		updatePages: (data: any) => api.post('/api/update_pages', data),
		createPages: (data: any) => api.post('/api/create_pages', data),
		deletePages: (data: any) => api.post('/api/delete_pages', data),
		togglePages: (data: any) => api.post('/api/toggle_pages', data),
	};
}

function useTags() {
	const { data, error } = useSWR(`/api/get_tags`, api.get);

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
	const { data, error } = useSWR(`/api/get_requests`, api.get);

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
	const { data, error } = useSWR(`/api/get_messages`, api.get);

	return {
		Messages: data?.data,
		isMessagesLoading: !data && !error,
		isMessagesError: error,
		reloadMessages: () => mutate(`/api/get_messages`),
		createMessages: (data: any) => api.post('/api/create_messages', data),
		deleteMessages: (data: any) => api.post('/api/delete_messages', data),
		toggleMessages: (data: any) => api.post('/api/toggle_messages', data),
	};
}

function useTranslations() {
	const { data, error } = useSWR(`/api/get_translations`, api.get);

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

function useCategories() {
	const { data, error } = useSWR(`/api/get_categories`, api.get);

	return {
		Categories: data?.data,
		isCategoriesLoading: !data && !error,
		isCategoriesError: error,
		reloadCategories: () => mutate(`/api/get_categories`),
		updateCategories: (data: any) => api.post('/api/update_categories', data),
		createCategories: (data: any) => api.post('/api/create_categories', data),
		deleteCategories: (data: any) => api.post('/api/delete_categories', data),
		toggleCategories: (data: any) => api.post('/api/toggle_categories', data),
	};
}

function useUploads() {
	const { data, error } = useSWR(`/api/get_uploads`, api.get);

	return {
		Uploads: data?.data,
		isUploadsLoading: !data && !error,
		isUploadsError: error,
		reloadUploads: () => mutate(`/api/get_uploads`),
		updateUploads: (data: any) => api.post('/api/update_uploads', data),
		createUploads: (data: any) => api.post('/api/create_uploads', data),
		deleteUploads: (data: any) => api.post('/api/delete_uploads', data),
		toggleUploads: (data: any) => api.post('/api/toggle_uploads', data),
	};
}

function useMenu() {
	const { data, error } = useSWR(`/api/get_menu`, api.get);

	return {
		Menu: data?.data,
		isMenuLoading: !data && !error,
		isMenuError: error,
		reloadMenu: () => mutate(`/api/get_menu`),
		updateMenu: (data: any) => api.post('/api/update_menu', data),
		createMenu: (data: any) => api.post('/api/create_menu', data),
		deleteMenu: (data: any) => api.post('/api/delete_menu', data),
		toggleMenu: (data: any) => api.post('/api/toggle_menu', data),
	};
}

function useMenuItems() {
	const { data, error } = useSWR(`/api/get_menuItems`, api.get);

	return {
		MenuItems: data?.data,
		isMenuItemsLoading: !data && !error,
		isMenuItemsError: error,
		reloadMenuItems: () => mutate(`/api/get_menuItems`),
		updateMenuItems: (data: any) => api.post('/api/update_menuItems', data),
		createMenuItems: (data: any) => api.post('/api/create_menuItems', data),
		deleteMenuItems: (data: any) => api.post('/api/delete_menuItems', data),
		toggleMenuItems: (data: any) => api.post('/api/toggle_menuItems', data),
	};
}

export {
	useProfile,
	useSettings,
	useUsers,
	usePosts,
	usePages,
	useTags,
	useRequests,
	useMessages,
	useTranslations,
	useCategories,
	useUploads,
	useMenu,
	useMenuItems,
	useSystemApi,
};

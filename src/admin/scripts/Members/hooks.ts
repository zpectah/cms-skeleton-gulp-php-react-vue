import useSWR, { mutate } from 'swr';

import api from '../utils/api';

function useMembers() {
	const { data, error } = useSWR(`/api/get_members`, api.get);

	return {
		Members: data?.data,
		isMembersLoading: !data && !error,
		isMembersError: error,
		reloadMembers: () => mutate(`/api/get_members`),
		updateMembers: (data: any) => api.post('/api/update_members', data),
		createMembers: (data: any) => api.post('/api/create_members', data),
		deleteMembers: (data: any) => api.post('/api/delete_members', data),
		toggleMembers: (data: any) => api.post('/api/toggle_members', data),
	};
}

export { useMembers };

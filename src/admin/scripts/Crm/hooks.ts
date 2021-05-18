import useSWR, { mutate } from 'swr';
import api from '../utils/api';

function useCampaigns() {
	const { data, error } = useSWR(`/api/get_campaigns`);

	return {
		Campaigns: data?.data,
		isCampaignsLoading: !data && !error,
		isCampaignsError: error,
		reloadCampaigns: () => mutate(`/api/get_campaigns`),
		updateCampaigns: (data: any) => api.post('/api/update_campaigns', data),
		createCampaigns: (data: any) => api.post('/api/create_campaigns', data),
		deleteCampaigns: (data: any) => api.post('/api/delete_campaigns', data),
		toggleCampaigns: (data: any) => api.post('/api/toggle_campaigns', data),
	};
}

export { useCampaigns };

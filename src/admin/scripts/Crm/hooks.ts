import useSWR from 'swr';

function useCampaigns() {
	// const { data, error } = useSWR(`...`);

	return {
		Campaigns: [],
		isLoading: false,
		isError: false,
	};
}

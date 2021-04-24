import useSWR from 'swr';

function useSettings() {
	const { data, error } = useSWR(`/api/get_settings`);

	return {
		data: data,
		loading: !error && !data,
		error: error,
	};
}

export { useSettings };

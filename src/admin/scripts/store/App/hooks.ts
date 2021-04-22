import useSWR from 'swr';
import api from '../../utils/api';

const settingsFetcher = () =>
	fetch(`/api/get_settings`).then((res) => res.json());

function useSettings() {
	const { data, error } = useSWR(`/api/get_settings`, settingsFetcher);

	return {
		settings: data,
		loading: !error && !data,
		error: error,
	};
}

export { useSettings };

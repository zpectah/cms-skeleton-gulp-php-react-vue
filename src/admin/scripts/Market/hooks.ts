import useSWR from 'swr';

function useProducts() {
	// const { data, error } = useSWR(`...`);

	return {
		Products: [],
		isLoading: false,
		isError: false,
	};
}

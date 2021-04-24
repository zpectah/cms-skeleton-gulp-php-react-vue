import useSWR from 'swr';

function useMembers() {
	// const { data, error } = useSWR(`...`);

	return {
		Members: [],
		isLoading: false,
		isError: false,
	};
}

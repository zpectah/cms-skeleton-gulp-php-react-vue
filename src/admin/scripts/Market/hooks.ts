import useSWR, { mutate } from 'swr';

import api from '../utils/api';

function useProducts() {
	const { data, error } = useSWR(`/api/get_products`, api.get);

	return {
		Products: data?.data,
		isProductsLoading: !data && !error,
		isProductsError: error,
		reloadProducts: () => mutate(`/api/get_products`),
		updateProducts: (data: any) => api.post('/api/update_products', data),
		createProducts: (data: any) => api.post('/api/create_products', data),
		deleteProducts: (data: any) => api.post('/api/delete_products', data),
		toggleProducts: (data: any) => api.post('/api/toggle_products', data),
	};
}

function useProductsOptions() {
	const { data, error } = useSWR(`/api/get_productsOptions`, api.get);

	return {
		ProductsOptions: data?.data,
		isProductsOptionsLoading: !data && !error,
		isProductsOptionsError: error,
		reloadProductsOptions: () => mutate(`/api/get_productsOptions`),
		updateProductsOptions: (data: any) =>
			api.post('/api/update_productsOptions', data),
		createProductsOptions: (data: any) =>
			api.post('/api/create_productsOptions', data),
		deleteProductsOptions: (data: any) =>
			api.post('/api/delete_productsOptions', data),
		toggleProductsOptions: (data: any) =>
			api.post('/api/toggle_productsOptions', data),
	};
}

function useStores() {
	const { data, error } = useSWR(`/api/get_stores`, api.get);

	return {
		Stores: data?.data,
		isStoresLoading: !data && !error,
		isStoresError: error,
		reloadStores: () => mutate(`/api/get_stores`),
		updateStores: (data: any) => api.post('/api/update_stores', data),
		createStores: (data: any) => api.post('/api/create_stores', data),
		deleteStores: (data: any) => api.post('/api/delete_stores', data),
		toggleStores: (data: any) => api.post('/api/toggle_stores', data),
	};
}

function useProducers() {
	const { data, error } = useSWR(`/api/get_producers`, api.get);

	return {
		Producers: data?.data,
		isProducersLoading: !data && !error,
		isProducersError: error,
		reloadProducers: () => mutate(`/api/get_producers`),
		updateProducers: (data: any) => api.post('/api/update_producers', data),
		createProducers: (data: any) => api.post('/api/create_producers', data),
		deleteProducers: (data: any) => api.post('/api/delete_producers', data),
		toggleProducers: (data: any) => api.post('/api/toggle_producers', data),
	};
}

function usePayments() {
	const { data, error } = useSWR(`/api/get_payments`, api.get);

	return {
		Payments: data?.data,
		isPaymentsLoading: !data && !error,
		isPaymentsError: error,
		reloadPayments: () => mutate(`/api/get_payments`),
		updatePayments: (data: any) => api.post('/api/update_payments', data),
		createPayments: (data: any) => api.post('/api/create_payments', data),
		deletePayments: (data: any) => api.post('/api/delete_payments', data),
		togglePayments: (data: any) => api.post('/api/toggle_payments', data),
	};
}

function useDistributors() {
	const { data, error } = useSWR(`/api/get_distributors`, api.get);

	return {
		Distributors: data?.data,
		isDistributorsLoading: !data && !error,
		isDistributorsError: error,
		reloadDistributors: () => mutate(`/api/get_distributors`),
		updateDistributors: (data: any) =>
			api.post('/api/update_distributors', data),
		createDistributors: (data: any) =>
			api.post('/api/create_distributors', data),
		deleteDistributors: (data: any) =>
			api.post('/api/delete_distributors', data),
		toggleDistributors: (data: any) =>
			api.post('/api/toggle_distributors', data),
	};
}

function useDeliveries() {
	const { data, error } = useSWR(`/api/get_deliveries`, api.get);

	return {
		Deliveries: data?.data,
		isDeliveriesLoading: !data && !error,
		isDeliveriesError: error,
		reloadDeliveries: () => mutate(`/api/get_deliveries`),
		updateDeliveries: (data: any) => api.post('/api/update_deliveries', data),
		createDeliveries: (data: any) => api.post('/api/create_deliveries', data),
		deleteDeliveries: (data: any) => api.post('/api/delete_deliveries', data),
		toggleDeliveries: (data: any) => api.post('/api/toggle_deliveries', data),
	};
}

export {
	useProducts,
	useProductsOptions,
	useStores,
	useProducers,
	usePayments,
	useDistributors,
	useDeliveries,
};

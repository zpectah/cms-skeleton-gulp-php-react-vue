import { commonModelProps } from '../types';

export interface Products extends commonModelProps {
	name: string;
	type: 'default';
	category?: string[];
	tags?: string[];
	item_price: number;
	item_discount: number;
	item_amount: number;
	items_related: string[];
	media?: string[];
	img_main?: string;
	img_thumbnail?: string;
	published?: string;
	item_new: number;
	item_campaign: number;
	lang?: {
		title: string;
		description?: string;
		content: string;
	};
}

export interface Stores extends commonModelProps {
	name: string;
	type: 'default';
	title: string;
	store_address: string;
	store_city: string;
	store_country: string;
	store_zip: string;
	store_location: any; // TODO - will be object
	store_email: string[];
	store_phone: string[];
	store_options: any; // TODO - will be object
	img_main?: string;
	img_thumbnail?: string;
	lang?: {
		title: string;
		description?: string;
	};
}

export interface Producers extends commonModelProps {}

export interface Distributors extends commonModelProps {}

export interface Payments extends commonModelProps {}

export interface Deliveries extends commonModelProps {}

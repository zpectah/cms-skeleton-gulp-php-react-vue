import config from '../config';

const init: any = {
	headers: {
		'X-App-Token': config.CMS_TOKEN,
		'Content-Type': 'application/json',
	},
};

const get = async (url: string) => {
	// console.log(url);
	const response = await fetch(url, {
		method: 'GET',
		...init,
	});
	return response.json();
};

const post = async (url: string, data: any) => {
	// console.log(url, data);
	const response = await fetch(url, {
		method: 'POST',
		...init,
		body: JSON.stringify(data),
	});
	return response.json();
};

const postRaw = async (url: string, data: any) => {
	// console.log(url, data);
	return await fetch(url, {
		method: 'POST',
		...init,
		body: JSON.stringify(data),
	});
};

const fetcher = (url) => fetch(url, init).then((res) => res.json());

export default {
	get,
	post,
	postRaw,
	fetcher,
};

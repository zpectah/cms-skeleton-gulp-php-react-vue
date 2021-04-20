// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

const init: any = {
	headers: {
		'Content-Type': 'application/json',
		// 'Content-Type': 'multipart/form-data',
		// 'Content-Type': 'application/x-www-form-urlencoded',
	},
};

const get = async (url: string) => {
	const response = await fetch(url, {
		method: 'GET',
		...init,
	});
	return response.json();
};

const post = async (url: string, data: any) => {
	console.log('data', data);
	const response = await fetch(url, {
		method: 'POST',
		...init,
		body: JSON.stringify(data),
	});
	return response.json();
};

export default {
	get,
	post,
};

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

const init: any = {
	// mode: 'cors',
	// cache: 'no-cache',
	// credentials: 'same-origin',
	headers: {
		// 'Content-Type': 'multipart/form-data',
		'Content-Type': 'application/json',
		// 'Content-Type': 'application/x-www-form-urlencoded',
	},
	// redirect: 'follow',
	// referrerPolicy: 'no-referrer',
};

const _get = async (url: string) => {
	const response = await fetch(url, {
		method: 'get',
		...init,
	});
	return response.json();
};

const _post = async (url: string, data: any) => {
	console.log('data', data);
	const response = await fetch(url, {
		method: 'post',
		...init,
		// body: data,
		body: JSON.stringify(data),
	});
	return response.json();
};

export default {
	get: _get,
	post: _post,
};

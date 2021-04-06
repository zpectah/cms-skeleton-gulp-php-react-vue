// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

const init: any = {
	mode: 'cors',
	cache: 'no-cache',
	credentials: 'same-origin',
	headers: {
		'Content-Type': 'application/json',
		// 'Content-Type': 'application/x-www-form-urlencoded',
	},
	redirect: 'follow',
	referrerPolicy: 'no-referrer',
};

const _get = async (url: string) => {
	const response = await fetch(url, {
		method: 'GET',
		...init,
	});
	return response.json();
};

const _post = async (url: string, data: any) => {
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		...init,
	});
	return response.json();
};

const Api = {
	GET: _get,
	POST: _post,
};

export default Api;

export const get = async (url) => {
	return await fetch(url)
		.then((response) => {
			if (response.ok) {
				return response;
			} else {
				throw new Error();
			}
		})
		.then((data) => {
			if (data) return data;
		})
		.catch((error) => {
			throw new Error();
		});
};

export const post = async (url, body) => {
	return await fetch(url, {
		method: "POST",
		mode: "cors",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	})
		.then((response) => {
			if (response.ok) {
				return response;
			} else {
				throw new Error();
			}
		})
		.then((data) => {
			if (data) return data;
		})
		.catch((error) => {
			throw new Error();
		});
};

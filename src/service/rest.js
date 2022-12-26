const response_status = [409, 401];

const buildHeaders = () => {
	const access_token = localStorage.getItem("access_token");
	if (access_token) {
		return {
			Accept: "application/json",
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			Authorization: `Bearer ${access_token}`,
		};
	} else {
		return {
			Accept: "application/json",
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json",
		};
	}
};

export const get = async (url, queryParams, token) => {
	return await fetch(url + new URLSearchParams(queryParams), {
		headers: buildHeaders(),
	})
		.then((response) => {
			if (response.ok) {
				return response;
			} else {
				throw new Error();
			}
		})
		.then((response) => {
			if (response) return response;
		})
		.catch((error) => {
			throw new Error();
		});
};

export const post = async (url, body) => {
	return await fetch(url, {
		method: "POST",
		mode: "cors",
		headers: buildHeaders(),
		body: JSON.stringify(body),
	})
		.then((response) => {
			if (response.ok) {
				return response;
			} else if (response_status.includes(response.status)) {
				return response;
			} else {
				throw new Error();
			}
		})
		.then((data) => {
			if (data) return data;
		})
		.catch((error) => {
			throw new Error(error);
		});
};

export const put = async (url, body) => {
	return await fetch(url, {
		method: "PUT",
		mode: "cors",
		headers: buildHeaders(),
		body: JSON.stringify(body),
	})
		.then((response) => {
			if (response.ok) {
				return response;
			} else if (response_status.includes(response.status)) {
				return response;
			} else {
				throw new Error();
			}
		})
		.then((data) => {
			if (data) return data;
		})
		.catch((error) => {
			throw new Error(error);
		});
};

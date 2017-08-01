import axios from 'axios';

export function getCategory (latitude, longitude) {
	const url = '/shopping/v2/restaurant/category';

	const data = {
		latitude,
		longitude
	};

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}

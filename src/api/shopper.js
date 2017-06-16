import axios from 'axios';

export function getShopperList (offset) {
	const url = 'https://mainsite-restapi.ele.me/shopping/restaurants';

	const data = {
		latitude: 28.194844,
		longitude: 113.011618,
		offset,
		limit: 20,
		'extras[]': 'activities',
		terminal: 'h5'
	};

		return axios.get(url, {
			params: data
		}).then((res) => {
			return Promise.resolve(res.data);
		});
}

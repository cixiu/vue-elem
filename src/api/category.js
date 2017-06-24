import axios from 'axios';

export function getCategory () {
	const url = 'https://mainsite-restapi.ele.me/shopping/v2/restaurant/category';

	const data = {
		latitude: 28.194844,
		longitude: 113.011618
	};

		return axios.get(url, {
			params: data
		}).then((res) => {
			return Promise.resolve(res.data);
		});
}

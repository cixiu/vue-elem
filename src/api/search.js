import axios from 'axios';

export function search (query) {
	let url = `https://mainsite-restapi.ele.me/bgs/poi/search_poi_nearby`;

	let data = {
		keyword: query,
		offset: 0,
		limit: 20
	};

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}

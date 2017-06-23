import axios from 'axios';
import {parseLink} from 'common/js/util';

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

export function getFoodShopperList (offset, keyword, link) {
	link = parseLink(link);
	const url = `https://mainsite-restapi.ele.me/shopping/restaurants?${link}`;

	const data = {
		latitude: 28.194844,
		longitude: 113.011618,
		keyword,
		offset,
		limit: 20,
		'extras[]': 'activities'
	};

		return axios.get(url, {
			params: data
		}).then((res) => {
			return Promise.resolve(res.data);
		});
}

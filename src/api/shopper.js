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

export function getFoodShopperList (offset, keyword, link, category_id, order_by, delivery_mode, support_ids) {
	let url = `https://mainsite-restapi.ele.me/shopping/restaurants`;
	if (link) {
		link = parseLink(link);
		url = `https://mainsite-restapi.ele.me/shopping/restaurants?${link}`;
	}

	let supports = '';
	if (support_ids) {
		support_ids.forEach((item) => {
			supports += `support_ids[]=${item}&`;
		});
		url = `https://mainsite-restapi.ele.me/shopping/restaurants?${supports}`;
	}

	let data = {
		latitude: 28.194844,
		longitude: 113.011618,
		keyword,
		offset,
		limit: 20,
		'extras[]': 'activities'
	};

	if (category_id) {
		data = Object.assign({}, data, {
			'restaurant_category_ids[]': category_id
		});
	}

	if (order_by || order_by === 0) {
		data = Object.assign({}, data, {
			'order_by': order_by
		});
	}

	if (delivery_mode || delivery_mode === 0) {
		data = Object.assign({}, data, {
			'delivery_mode[]': delivery_mode
		});
	}

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}

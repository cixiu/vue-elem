import axios from 'axios';
import {parseLink} from 'common/js/util';

export function getShopperList (latitude, longitude, offset) {
	const url = '/shopping/restaurants';

	const data = {
		latitude,
		longitude,
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

export function getFoodShopperList (latitude, longitude, offset, keyword, link, category_id, order_by, delivery_mode, support_ids) {
	let url = `/shopping/restaurants`;
	if (link) {
		link = parseLink(link);
		url = `/shopping/restaurants?${link}`;
	}

	let supports = '';
	if (support_ids) {
		support_ids.forEach((item) => {
			supports += `support_ids[]=${item}&`;
		});
		url = `/shopping/restaurants?${supports}`;
	}

	let data = {
		latitude,
		longitude,
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

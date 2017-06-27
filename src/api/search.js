import axios from 'axios';

// 获取地理位置信息
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

// 获取热门搜索词
export function getHotSearchWords (latitude, longitude, geohash) {
	let url = `https://mainsite-restapi.ele.me/shopping/v3/hot_search_words`;

	let data = {
		latitude,
		longitude,
		geohash
	};

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}

// 搜索商家、商品
export function getSearchFoods (latitude, longitude, offset, keyword, category_id, order_by, delivery_mode, support_ids) {
	let url = `https://mainsite-restapi.ele.me/shopping/v1/restaurants/search`;

	let data = {
		offset,
		limit: 20,
		keyword,
		latitude,
		longitude,
		search_item_type: 2,
		'extra[]': 'activities'
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

	if (support_ids) {
		data = Object.assign({}, data, {
			'support_ids': support_ids
		});
	}

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}

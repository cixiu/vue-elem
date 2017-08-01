import axios from 'axios';

// 初始化地理位置的geohash值
export function autoGPS (latitude, longitude) {
	const url = `/bgs/poi/reverse_geo_coding`;

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

// 获取地理位置信息
export function search (query) {
	let url = `/bgs/poi/search_poi_nearby`;

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
	let url = `/shopping/v3/hot_search_words`;

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
	let url = `/shopping/v1/restaurants/search`;

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

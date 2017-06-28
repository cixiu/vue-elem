import axios from 'axios';

// 根据地理位置为discover页面请求获取不同的参数
export function getParmas (latitude, longitude) {
	const url = `https://mainsite-restapi.ele.me/hotfood/v1/guess/banner`;

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

// header的广告数据
export function getHeaderAd (latitude, longitude) {
	const url = 'https://mainsite-restapi.ele.me/member/v1/discover';

	const data = {
		latitude,
		longitude,
		platform: 1,
		block_index: 0
	};

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}

// 美食热推
export function getFoodSuggest (latitude, longitude, request_id, tag_id) {
	const url = `https://mainsite-restapi.ele.me/hotfood/v1/guess/likes`;

	const data = {
		latitude,
		longitude,
		offset: 0,
		limit: 3,
		request_id,
		tag_id,
		columns: 1
	};

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}

// 天天特价
export function getSpecialFoodList (latitude, longitude) {
	const url = `https://mainsite-restapi.ele.me/shopping/v1/sale_list_index`;

	const data = {
		type: 'special_food',
		latitude,
		longitude,
		params: {}
	};

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}

// 限时好礼
export function getGiftsSuggest () {
	const url = `https://mainsite-restapi.ele.me/member/gifts/suggest`;

	return axios.get(url).then((res) => {
		return Promise.resolve(res.data);
	});
}

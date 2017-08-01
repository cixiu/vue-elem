import axios from 'axios';
// 获取商家数据
export function getShop (latitude, longitude, id) {
	const url = `/shopping/restaurant/${id}?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification`;

	const data = {
		latitude,
		longitude
	};

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
};

// 获取商家商品数据
export function getGoods (id) {
	const url = `/shopping/v2/menu`;

	const data = {
		restaurant_id: id
	};

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
};

// 获取商家评论数据
export function getRatings (id, offset, tag_name) {
	const url = `/ugc/v2/restaurants/${id}/ratings`;

	const data = {
		has_content: true,
		tag_name,
		offset,
		limit: 10
	};

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
};

// 获取商家评分数据
export function getScores (id) {
	const url = `/ugc/v2/restaurants/${id}/ratings/scores`;

	return axios.get(url).then((res) => {
		return Promise.resolve(res.data);
	});
};

// 获取商家评价分类数据
export function getRatingsTags (id) {
	const url = `/ugc/v2/restaurants/${id}/ratings/tags`;

	return axios.get(url).then((res) => {
		return Promise.resolve(res.data);
	});
};

import axios from 'axios';

export function getDeliveryMode () {
	const url = `https://mainsite-restapi.ele.me/shopping/v1/restaurants/delivery_modes`;

	const data = {
		latitude: 28.194844,
		longitude: 113.011618,
		kw: null
	};

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}

export function getAttributes () {
	const url = `https://mainsite-restapi.ele.me/shopping/v1/restaurants/activity_attributes`;

	const data = {
		latitude: 28.194844,
		longitude: 113.011618,
		kw: null
	};

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}

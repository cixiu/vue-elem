import axios from 'axios';

export function getDeliveryMode (latitude, longitude) {
	const url = `https://mainsite-restapi.ele.me/shopping/v1/restaurants/delivery_modes`;

	const data = {
		latitude,
		longitude,
		kw: null
	};

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}

export function getAttributes (latitude, longitude) {
	const url = `https://mainsite-restapi.ele.me/shopping/v1/restaurants/activity_attributes`;

	const data = {
		latitude,
		longitude,
		kw: null
	};

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}

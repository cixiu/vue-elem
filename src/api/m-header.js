import axios from 'axios';

export function getGeography (latitude, longitude) {
	let url = `/bgs/poi/reverse_geo_coding`;

	let data = {
		latitude,
		longitude
	};

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}

export function getWeather (latitude, longitude) {
	let url = `/bgs/weather/current`;

	let data = {
		latitude,
		longitude
	};

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}

export function getHotSearch (latitude, longitude) {
	let url = `/shopping/v3/hot_search_words`;

	let data = {
		latitude,
		longitude
	};

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}

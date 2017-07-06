import axios from 'axios';
// axios.defaults.withCredentials = true;

export function getCurrentUser () {
	const url = `https://mainsite-restapi.ele.me/eus/v1/current_user`;

	const data = {
		info_raw: {}
	};

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}

export function getCaptchasCode () {
	const url = `/api/getCaptchasCode`;

	return axios.post(url, null, {
		withCredentials: true
	}).then((res) => {
		return Promise.resolve(res.data);
	}).catch((e) => {
		console.log(e);
	});
}

export function getVerifyCode (mobile, captcha_code) {
	const url = `/api/getVerifyCode`;

	const data = {
		mobile,
		captcha_code,
		scene: 'login',
		type: 'sms'
	};

	return axios.get(url, {
		params: data,
		withCredentials: true
	}).then((res) => {
		return Promise.resolve(res.data);
	}).catch((err) => {
		return Promise.reject(err.response.data);
	});
}

export function getLoginIn (code, mobile, validate_token) {
	const url = `/api/getLoginIn`;

	const data = {
		code,
		mobile,
		validate_token
	};

	return axios.get(url, {
		params: data,
		withCredentials: true
	}).then((res) => {
		console.log(res);
		return Promise.resolve(res.data);
	}).catch((err) => {
		return Promise.reject(err.response.data);
	});
}

export function getpasswordLoginIn (username, password, captcha_code) {
	const url = `/api/getpasswordLoginIn`;

	const data = {
		captcha_code,
		password,
		username
	};

	return axios.post(url, data, {
    withCredentials: true
  }).then((res) => {
		console.log(res);
		return Promise.resolve(res.data);
	}).catch((err) => {
		console.log(err.response.data);
		return Promise.reject(err.response.data);
	});
}

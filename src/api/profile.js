import axios from 'axios';
// axios.defaults.withCredentials = true;

export function getCurrentUser () {
	const url = `/eus/v1/current_user`;

	const data = {
		info_raw: {}
	};

	return axios.get(url, {
		params: data,
		withCredentials: true
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}

export function getCaptchasCode () {
	const url = `/v1/captchas`;

	return axios.post(url, null, {
		// withCredentials: true
		'set-cookie': 'xxx=xxxxxxxx'
	}).then((res) => {
		console.log(res);
		return Promise.resolve(res.data);
	}).catch((e) => {
		console.log(e);
	});
}

export function getVerifyCode (mobile, captcha_code) {
	const url = `/v4/mobile/verify_code/send`;

	const data = {
		mobile,
		captcha_code,
		scene: 'login',
		type: 'sms'
	};

	return axios.post(url, data, {
		withCredentials: true
	}).then((res) => {
		return Promise.resolve(res.data);
	}).catch((err) => {
		return Promise.reject(err.response.data);
	});
}

export function getLoginIn (code, mobile, validate_token) {
	const url = `/v1/login/app_mobile`;

	const data = {
		code,
		mobile,
		validate_token
	};

	return axios.post(url, data, {
		withCredentials: true
	}).then((res) => {
		console.log(res);
		return Promise.resolve(res.data);
	}).catch((err) => {
		return Promise.reject(err.response.data);
	});
}

export function getpasswordLoginIn (username, password, captcha_code) {
	const url = `/v2/login`;

	const data = {
		captcha_code,
		password,
		username
	};

	return axios.post(url, data, {
    // withCredentials: true
  }).then((res) => {
		console.log(res);
		return Promise.resolve(res.data);
	}).catch((err) => {
		console.log(err.response);
		return Promise.reject(err.response.data);
	});
}

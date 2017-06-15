// import jsonp from 'common/js/jsonp';
// import {options} from 'api/config';
import axios from 'axios';

export function getEntries () {
	const url = '/api/getEntries';

	const data = {
		'latitude': 28.194844,
		'longitude': 113.011618,
		'templates[]': 'main_template'
	};

		return axios.get(url, {
			params: data
		}).then((res) => {
			return Promise.resolve(res.data);
		});
}

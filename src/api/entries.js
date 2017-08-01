// import jsonp from 'common/js/jsonp';
// import {options} from 'api/config';
import axios from 'axios';

export function getEntries (latitude, longitude) {
	const url = '/shopping/v2/entries';

	const data = {
		latitude,
		longitude,
		'templates[]': 'main_template'
	};

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data);
	});
}

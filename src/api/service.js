import axios from 'axios';

export function getQuestion () {
	const url = `https://crayfish.elemecdn.com/m.ele.me@json/profile/explain`;

	return axios.get(url).then((res) => {
		return Promise.resolve(res.data);
	});
}

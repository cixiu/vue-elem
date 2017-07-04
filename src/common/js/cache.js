import storage from 'good-storage';

const GPS_KEY = '__location__';            // 地理位置的storage
const SEARCH_KEY = '__search-elem__';      //  搜索词的storage
const USERINFO = '__user_info__';
const SEARCH_MAX_LENGTH = '10';

// 设置地理位置的存储
export function saveGeoPosition (gpsData) {
	let gps = storage.session.get(GPS_KEY, {});
	gps = Object.assign({}, gpsData);
	storage.session.set(GPS_KEY, gps);
	return gps;
}
// 获取地理位置
export function localPosition () {
	return storage.session.get(GPS_KEY, {});
}

// 设置搜索词的存储
export function saveSearch (query) {
	let searches = storage.get(SEARCH_KEY, []);
	insertArray(searches, query, (item) => {
		return item === query;
	}, SEARCH_MAX_LENGTH);
	return storage.set(SEARCH_KEY, searches);
}

// 获取搜索词
export function localSearch () {
	return storage.get(SEARCH_KEY, []);
}

// 清空搜索历史
export function clearSearch () {
	storage.remove(SEARCH_KEY);
	return [];
}

// 对搜索词进行处理
export function insertArray (arr, val, compare, maxLength) {
	const index = arr.findIndex(compare);
	if (index === 0) {
		return;
	}
	if (index > 0) {
		arr.splice(index, 1);
	}
	arr.unshift(val);
	if (maxLength && arr.length > maxLength) {
		arr.pop();
	}
}

// 设置登录用户的信息
export function saveUserInfo (user_infor) {
	let userInfor = storage.get(USERINFO, null);
	userInfor = Object.assign({}, user_infor);
	storage.set(USERINFO, userInfor);
}

// 获取登录用户的信息
export function localUserInfo () {
	return storage.get(USERINFO, null);
}

// 清除登录用户的信息
export function clearUserInfo () {
	return storage.remove(USERINFO);
}

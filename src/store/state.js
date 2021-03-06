import {localPosition, localSearch, localUserInfo} from 'common/js/cache';

export default {
	selectedShopper: [],
	cartFoods: {},
	selectedEntries: {},
	latitude: localPosition().latitude,
	longitude: localPosition().longitude,
	geohash: localPosition().geohash,
	searchHistory: localSearch(),
	showFlagGPS: false,
	userInfo: localUserInfo(),
	alertText: '',
	hasTips: false
};

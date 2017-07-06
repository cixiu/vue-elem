import * as types from './mutations-types';
import {saveGeoPosition, saveSearch, clearSearch} from 'common/js/cache';

export default {
	setGeoPosition ({state, commit}, {latitude, longitude, geohash}) {
		commit(types.SET_LATITUDE, latitude);
		commit(types.SET_LONGITUDE, longitude);
		commit(types.SET_GEOHASH, geohash);
		saveGeoPosition({latitude, longitude, geohash});
	},
	savesearchHistory ({state, commit}, query) {
		commit(types.SET_SEARCH_HISTORY, saveSearch(query));
	},
	clearSearchHistory ({commit}) {
		commit(types.SET_SEARCH_HISTORY, clearSearch());
	},
	alertTips ({state, commit}, {alertText, hasTips}) {
		setTimeout(() => {
			hasTips = false;
			commit(types.SET_HASTIPS, hasTips);
		}, 2000);
		commit(types.SET_ALERTTEXT, alertText);
		commit(types.SET_HASTIPS, hasTips);
	}
};

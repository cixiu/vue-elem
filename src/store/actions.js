import * as types from './mutations-types';

export default {
	setGeoPosition ({state, commit}, {latitude, longitude, geohash}) {
		commit(types.SET_LATITUDE, latitude);
		commit(types.SET_LONGITUDE, longitude);
		commit(types.SET_GEOHASH, geohash);
	}
};

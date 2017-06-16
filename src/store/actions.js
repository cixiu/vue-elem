import * as types from './mutations-types';

export default {
	selectSeller ({commit, state}, shopper) {
		commit(types.SET_SELECTED_SHOPPER, shopper);
	}
};

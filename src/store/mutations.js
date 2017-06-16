import * as types from './mutations-types';

export default {
	[types.SET_SELECTED_SHOPPER] (state, shopper) {
		state.selectedShopper = shopper;
	}
};

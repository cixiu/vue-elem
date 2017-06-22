import * as types from './mutations-types';

export default {
	[types.SET_SELECTED_SHOPPER] (state, shopper) {
		state.selectedShopper = shopper;
	},
	// 加入购物车
	[types.SET_CART_FOODS] (state, food) {
		let cart = state.cartFoods;
		let shop = cart[food.shopid] = cart[food.shopid] || {};
		let category = shop[food.category_id] = shop[food.category_id] || {};
		let item = category[food.item_id] = category[food.item_id] || {};
		if (item[food.food_id]) {
			item[food.food_id]['count']++;
		} else {
			item[food.food_id] = {
				count: 1,
				food_id: food.food_id,
				name: food.name,
				price: food.price,
				packing_fee: food.packing_fee,
				stock: food.stock,
				spec: food.spec,
				attr: food.attr,
				specfoods: food.specfoods
			};
		}
		state.cartFoods = {...cart};
	},
	// 移出购物车
	[types.DECREASE_COUNT] (state, food) {
		let cart = state.cartFoods;
		let shop = cart[food.shopid] || {};
		let category = shop[food.category_id] || {};
		let item = category[food.item_id] || {};
		if (item && item[food.food_id]) {
			if (item[food.food_id]['count'] > 0) {
				item[food.food_id]['count']--;
				if (item[food.food_id]['count'] === 0) {
					// 商品数量为0，则清空当前商品的信息
					shop[food.category_id][food.item_id] = {};
				}
			} else {
				// 商品数量为0，则清空当前商品的信息
				item[food.food_id] = null;
			}
			state.cartFoods = {...cart};
		}
	},
	// 清空购物车
	[types.EMPTY_CART_FOODS] (state, shopid) {
		state.cartFoods[shopid] = null;
		state.cartFoods = {...state.cartFoods};
	}
};

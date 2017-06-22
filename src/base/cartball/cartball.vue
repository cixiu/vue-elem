<template>
	<div class="chose">
		<div class="cartball" v-if="!food.specifications || !food.specifications.length || !food.specfoods || food.specfoods.length === 1">
			<div class="cart-decrease icon-remove_circle_outline" v-show="foodCount" @click.stop.prevent="decreaseCart"></div>
			<div class="cart-count" v-show="foodCount">{{ foodCount }}</div>
			<div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
		</div>
		<div class="specifications" v-else>
			<div class="cart-decrease icon-remove_circle_outline" v-show="foodCount" @click.stop.prevent="decreaseCart"></div>
			<div class="cart-count" v-show="foodCount">{{ foodCount }}</div>
			<div class="cart-add" @click.stop.prevent="selectItem">选规模</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import {mapGetters, mapMutations} from 'vuex';
	import {createFood} from 'common/js/food';

	export default {
		props: {
			food: {
				type: Object,
				default () {
					return {};
				}
			},
			goods: {
				goods: {
					type: Array,
					default: []
				}
			}
		},
		computed: {
			// 当前商家的购物车信息
			shopCart () {
				return Object.assign({}, this.cartFoods[this.$route.params.id]);
			},
			// 计算选中商品的数量
			foodCount () {
				let category_id = this.food.category_id;
				let item_id = this.food.item_id;
				if (this.shopCart && this.shopCart[category_id] && this.shopCart[category_id][item_id]) {
					let num = 0;
					Object.values(this.shopCart[category_id][item_id]).forEach((item) => {
						num += item.count;
					});
					return num;
				} else {
					return 0;
				}
			},
			...mapGetters([
				'cartFoods'
			])
		},
		methods: {
			// 加入购物车
			addCart (event) {
				this.food.shopid = this.$route.params.id;
				this.setcartFoods(createFood(this.food));
				this.$emit('cart-add', this.food, event.target);
			},
			// 移出购物车
			decreaseCart () {
				if (this.foodCount) {
					this.food.shopid = this.$route.params.id;
					this.decreaseCount(createFood(this.food));
				}
			},
			selectItem () {
				this.$emit('select-spec', this.food);
			},
			...mapMutations({
				setcartFoods: 'SET_CART_FOODS',
				decreaseCount: 'DECREASE_COUNT'
			})
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.cartball
		margin-right: -6px
		margin-bottom: -6px
		font-size: 0
		.cart-decrease
			display: inline-block
			padding: 6px
			line-height: 24px
			font-size: 24px
			color: #3190e8
		.cart-count
			display: inline-block
			vertical-align: top
			width: 12px
			padding-top: 6px
			line-height: 24px
			text-align: center
			font-size: 10px
			color: #666
		.cart-add
			display: inline-block
			padding: 6px
			line-height: 24px
			font-size: 24px
			color: #3190e8
	.specifications
		font-size: 0
		.cart-decrease
			display: inline-block
			vertical-align: bottom
			padding: 0 6px
			line-height: 24px
			font-size: 24px
			color: #3190e8
		.cart-count
			display: inline-block
			vertical-align: bottom
			width: 12px
			padding-right: 6px
			line-height: 24px
			text-align: center
			font-size: 10px
			color: #666
		.cart-add
			display: inline-block
			padding: 0 6px
			line-height: 24px
			font-size: 12px
			border-radius: 12px
			background: #3199e8
			color: #fff
</style>

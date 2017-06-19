<template>
	<div class="cartball">
		<div class="cart-decrease icon-remove_circle_outline" v-show="food.count" @click.stop.prevent="decreaseCart"></div>
		<div class="cart-count" v-show="food.count">{{ food.count }}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Vue from 'vue';

	export default {
		props: {
			food: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		methods: {
			addCart (event) {
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1);
				} else {
					this.food.count++;
				}
				this.$emit('cart-add', event.target);
			},
			decreaseCart () {
				if (this.food.count) {
					this.food.count--;
				}
			}
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
</style>

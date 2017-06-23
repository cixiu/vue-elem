<template>
	<transition name="slide" mode="out-in">
		<div class="shop">
			<shop-header :shopid="shopid"></shop-header>
			<div class="tab border-1px">
				<div class="tab-item" :class="{ active: showFlag }" @click="showGoods">
					<span class="text">商品</span>
				</div>
				<div class="tab-item" :class="{ active: !showFlag }" @click="showRatins">
					<span class="text">评价</span>
				</div>
			</div>
			<div class="goods-wrapper" v-show="showFlag">
				<goods :shopid="shopid"></goods>
			</div>
			<div class="ratings-wrapper" v-if="!showFlag">
				<ratings></ratings>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import ShopHeader from 'components/shop-header/shop-header';
	import Goods from 'components/goods/goods';
	import Ratings from 'components/ratings/ratings';
	import {mapGetters} from 'vuex';

	export default {
		data () {
			return {
				shopid: this.$route.params.id,
				showFlag: true
			};
		},
		computed: {
			...mapGetters([
				'selectedShopper'
			])
		},
		methods: {
			showRatins () {
				this.showFlag = false;
			},
			showGoods () {
				this.showFlag = true;
			}
		},
		components: {
			ShopHeader,
			Goods,
			Ratings
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
	
	.shop
		position: fixed
		top: 0
		right: 0
		bottom: 0
		left: 0
		z-index: 50
		background: #fff
		&.slide-enter, &.slide-leave-active
			transform: translate3d(100%, 0, 0)
		&.slide-enter-active, &.slide-leave-active
			transition: all .5s
		.tab
			display: flex
			height: 45px
			line-height: 45px
			font-size: 14px
			border-1px(#ddd)
			.tab-item
				flex: 1
				text-align: center
				.text
					padding: 0 2px 4px 2px
					color: #666
				&.active
					.text
						color: #3190e8
						border-bottom: 2px solid #3190e8
</style>

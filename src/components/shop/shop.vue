<template>
		<div class="shop">
			<shop-header :shopid="shopid"></shop-header>
			<div class="tab border-1px">
				<div class="tab-item active">
					<span class="text">商品</span>
				</div>
				<div class="tab-item">
					<span class="text">评价</span>
				</div>
			</div>
			<div class="goods-wrapper">
				<goods :shopid="shopid"></goods>
			</div>
		</div>
</template>

<script type="text/ecmascript-6">
	import ShopHeader from 'components/shop-header/shop-header';
	import Goods from 'components/goods/goods';
	import {mapGetters} from 'vuex';
	import {getRatings, getScores, getRatingsTags} from 'api/shop';
	// import {parseLocation} from 'common/js/util';

	export default {
		data () {
			return {
				shopid: this.$route.params.id,
				offset: 0,
				ratings: [],
				scores: {},
				tags: []
			};
		},
		computed: {
			...mapGetters([
				'selectedShopper'
			])
		},
		created () {
			this._getRatings();
			this._getScores();
			this._getRatingsTags();
		},
		methods: {
			_getRatings () {
				getRatings(this.shopid, this.offset).then((response) => {
					this.ratings = response;
					// console.log(this.ratings);
				});
			},
			_getScores () {
				getScores(this.shopid).then((response) => {
					this.scores = response;
					// console.log(this.scores);
				});
			},
			_getRatingsTags () {
				getRatingsTags(this.shopid).then((response) => {
					this.tags = response;
					// console.log(this.ratings);
				});
			}
		},
		components: {
			ShopHeader,
			Goods
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
		&.slide-enter, .slide-leave-active
			transform: translate3d(100%, 0, 0)
		&.slide-enter-active, .slide-leave-active
			transition: all 0.5s
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

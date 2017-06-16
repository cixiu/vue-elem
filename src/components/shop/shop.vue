<template>
	<transition name="slide">
		<div class="shop">
			<shop-header :shopid="shopid"></shop-header>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import ShopHeader from 'components/shop-header/shop-header';
	import {mapGetters} from 'vuex';
	import {getGoods, getRatings, getScores, getRatingsTags} from 'api/shop';
	import {parseLocation} from 'common/js/util';

	export default {
		data () {
			return {
				shopid: parseLocation(window.location),
				offset: 0,
				goods: [],
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
			this._getGoods();
			this._getRatings();
			this._getScores();
			this._getRatingsTags();
		},
		methods: {
			_getGoods () {
				getGoods(this.shopid).then((response) => {
					this.goods = response;
					// console.log(this.goods);
				});
			},
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
			ShopHeader
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
</style>

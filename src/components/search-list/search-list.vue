<template>
	<div class="search-list">
		<div class="search-box">
			<i @click="back" class="icon-arrow_back"></i>
			<input class="search-input" type="text" v-model="query" autofocus="autofocus" placeholder="请输入商品名称" ref="input" @keyup.enter="addSearch">
			<i @click="clear" class="icon-close" v-show="query"></i>
		</div>
		<div class="filter-wrapper">
			<m-filter @select="selectShoppers"></m-filter>
		</div>
		<scroll 
						class="shopper-wrapper" 
						:data="shoppers" 
						:pullup="pullup" 
						@scrollToEnd="getSearchFoodsMore"
						:before-scroll="beforeScroll"
						@beforeScroll="blur"
		>
			<shopper :shoppers="shoppers" :has-more="hasMore" @select="selectFood"></shopper>
		</scroll>
	</div>
</template>

<script type="text/ecmascript-6">
	import mFilter from 'base/m-filter/m-filter';
	import Shopper from 'components/shopper/shopper';
	import Scroll from 'base/scroll/scroll';
	import {mapGetters, mapMutations} from 'vuex';
	import {getSearchFoods} from 'api/search';

	export default {
		data () {
			return {
				query: this.$route.query.keyword,
				offset: 0,
				shoppers: [],
				beforeScroll: true,
				hasMore: true,
				pullup: true,
				category_id: null,              // 分类选择的category的id
				order_by: null,                    // 排序选择的id
				deliver_mode: null,
				support_ids: null
			};
		},
		created () {
			this._getSearchFoods();
		},
		computed: {
			...mapGetters([
				'latitude',
				'longitude'
			])
		},
		methods: {
			back () {
				this.$router.back();
			},
			clear () {
				this.query = '';
			},
			blur () {
				this.$refs.input.blur();
			},
			addSearch () {
				this.query = '';
			},
			getSearchFoodsMore () {
				if (!this.hasMore || this.stopShowMore) {
					return;
				}
				this.offset += 20;
				this.stopShowMore = true;  // 阻止还没加载完后再次上拉加载更多而发送过多的请求
				getSearchFoods(this.latitude, this.longitude, this.offset, this.query, this.category_id, this.order_by, this.delivery_mode, this.support_ids).then((response) => {
					if (!response['0']) {
						this.hasMore = false;
						return;
					}
					this.newShoppers = [];
					response['0'].restaurant_with_foods.forEach((item) => {
						this.newShoppers.push(item.restaurant);
					});
					this.shoppers = this.shoppers.concat(this.newShoppers);
					this.stopShowMore = false;
				});
			},
			selectShoppers (item) {
				this.offset = 0;
				if (item.name === '全部商家') {
					this.category_id = null;
				} else {
					this.category_id = (item.id || item.id === 0) ? item.id : this.category_id;
				}
				this.order_by = (item.order_by || item.order_by === 0) ? item.order_by : this.order_by;
				this.delivery_mode = (item.delivery_mode || item.delivery_mode === 0 || item.delivery_mode === null) ? item.delivery_mode : this.delivery_mode;
				this.support_ids = item.support_ids ? item.support_ids : this.support_ids;
				getSearchFoods(this.latitude, this.longitude, this.offset, this.query, this.category_id, this.order_by, this.delivery_mode, this.support_ids).then((response) => {
					this.shoppers = [];
					response['0'].restaurant_with_foods.forEach((item) => {
						this.shoppers.push(item.restaurant);
					});
				});
			},
			selectFood (item) {
				this.$router.push({
          path: `/shop/id=${item.id}`
        });
        this.setselectedShopper(item);
			},
			_getSearchFoods () {
				getSearchFoods(this.latitude, this.longitude, this.offset, this.query).then((response) => {
					response['0'].restaurant_with_foods.forEach((item) => {
						this.shoppers.push(item.restaurant);
					});
				});
			},
			...mapMutations({
				'setselectedShopper': 'SET_SELECTED_SHOPPER'
			})
		},
		watch: {
			query (newQuery) {
				if (!newQuery) {
					// this.back();
					this.$router.push('/search');
				}
			}
		},
		components: {
			mFilter,
			Shopper,
			Scroll
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.search-list
		position: fixed
		top: 0
		right: 0
		bottom: 0
		left: 0
		overflow: hidden
		background: #fff
		.search-box
			box-sizing: border-box
			position: relative
			display: flex
			align-items: center
			padding: 11px
			.icon-arrow_back
				padding: 7px 14px 7px 0
				font-size: 21px
				color: #999
			.search-input
				box-sizing: border-box
				flex: 1
				height: 35px
				padding: 7px 15px
				border-radius: 15px
				font-size: 15px
				background: #f8f8f8
				color: #666
			.icon-close
				position: absolute
				top: 20px
				right: 7%
				color: #4566a0
		.filter-wrapper
			position: fixed
			top: 57px
			left: 0
			right: 0
			width: 100%
			height: 40px
			z-index: 999
			border-bottom: 1px solid #ddd
		.shopper-wrapper
			position: fixed
			top: 98px
			right: 0
			bottom: 0
			left: 0
			overflow: hidden
</style>

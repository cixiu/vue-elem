<template>
	<transition name="fade" mode="out-in">
		<div class="food">
			<div class="header">
				<m-title :title-name="targetName"></m-title>
			</div>
			<div class="filter-wrapper">
				<m-filter @select="selectShoppers"></m-filter>
			</div>
			<scroll 
						 	class="shopper-wrapper"
						 	:data="shoppers"
						 	:pullup="pullup"
						 	@scrollToEnd="getFoodShopperMore"
						 	ref="shopperWrapper"
			>
				<shopper :shoppers="shoppers" :has-more="hasMore" @select="selectItem"></shopper>
			</scroll>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import mTitle from 'base/m-title/m-title';
	import mFilter from 'base/m-filter/m-filter';
	import Shopper from 'components/shopper/shopper';
	import Scroll from 'base/scroll/scroll';
	import Loading from 'base/loading/loading';
	import {mapGetters, mapMutations} from 'vuex';
	import {getFoodShopperList} from 'api/shopper';

	export default {
		data () {
			return {
				target: this.$route.hash,       // 路由hash值
				offset: 0,
				keyword: null,
				shoppers: [],
				pullup: true,
				hasMore: true,
				category_id: null,              // 分类选择的category的id
				order_by: null,                    // 排序选择的id
				deliver_mode: null,
				support_ids: null
			};
		},
		created () {
			this._getFoodShopperList();
		},
		computed: {
			// 选择的目标食品类型的名称
			targetName () {
				let reg = /\w+=[\u4e00-\u9fa5]+/g;
				let matches = this.target.match(reg);
				if (matches) {
					return matches[0].substring(matches[0].indexOf('=') + 1);
				}
				return '';
			},
			...mapGetters([
				'selectedEntries',
				'latitude',
				'longitude'
			])
		},
		methods: {
			// 加载更多
			getFoodShopperMore () {
				if (!this.hasMore || this.stopShowMore) {
					return;
				}
				this.offset += 20;
				this.stopShowMore = true;
				getFoodShopperList(this.latitude, this.longitude, this.offset, this.keyword, null, this.category_id, this.order_by, this.delivery_mode, this.support_ids).then((response) => {
					this.shoppers = this.shoppers.concat(response);
					this._checkMore(response);
					this.stopShowMore = false;
				});
			},
			// 点击商家进入商家页面
			selectItem (item) {
				this.$router.push({
          path: `/shop/id=${item.id}`
        });
        this.setselectedShopper(item);
			},
			// 分类选中的食品列表数据获取
			selectShoppers (item) {
				this.$refs.shopperWrapper.scrollTo(0, 0);
				this.offset = 0;
				this.keyword = null;
				if (item.name === '全部商家') {
					this.category_id = null;
				} else {
					this.category_id = (item.id || item.id === 0) ? item.id : this.category_id;
				}
				this.order_by = (item.order_by || item.order_by === 0) ? item.order_by : this.order_by;
				this.delivery_mode = (item.delivery_mode || item.delivery_mode === 0 || item.delivery_mode === null) ? item.delivery_mode : this.delivery_mode;
				this.support_ids = item.support_ids ? item.support_ids : this.support_ids;
				getFoodShopperList(this.latitude, this.longitude, this.offset, this.keyword, null, this.category_id, this.order_by, this.delivery_mode, this.support_ids).then((response) => {
					this.shoppers = response;
					this._checkMore(response);
				});
			},
			_getFoodShopperList () {
				this.hasMore = true;
				this.offset = 0;
				getFoodShopperList(this.latitude, this.longitude, this.offset, this.keyword, this.target).then((response) => {
					this.shoppers = response;
				});
			},
			_checkMore (data) {
				if (!data.length) {
					this.hasMore = false;
				}
			},
			...mapMutations({
				setselectedShopper: 'SET_SELECTED_SHOPPER'
			})
		},
		components: {
			mTitle,
			mFilter,
			Shopper,
			Scroll,
			Loading
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	.food
		position: fixed
		top: 0
		right: 0
		bottom: 0
		left: 0
		width: 100%
		z-index: 50
		overflow: hidden
		background: #fff
		&.fade-enter, &.fade-leave-active
			opacity: 0
		&.fade-enter-active, &.fade-leave-active
			transition: all .3s
		.header
			position: fixed
			top: 0
			left: 0
			right: 0
			width: 100%
			height: 44px
			z-index: 999
		.filter-wrapper
			position: fixed
			top: 44px
			left: 0
			right: 0
			width: 100%
			height: 40px
			z-index: 999
			border-bottom: 1px solid #ddd
		.shopper-wrapper
			position: fixed
			top: 85px
			right: 0
			bottom: 0
			left: 0
			width: 100%
			z-index: 50
			overflow: hidden
</style>

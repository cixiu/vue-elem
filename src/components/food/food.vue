<template>
	<transition name="fade" mode="out-in">
		<div class="food">
			<div class="header">
				<m-title :title-name="targetName"></m-title>
			</div>
			<div class="filter-wrapper border-1px">
				<m-filter></m-filter>
			</div>
			<scroll 
						 	class="shopper-wrapper"
						 	:data="shoppers"
						 	:pullup="pullup"
						 	@scrollToEnd="getFoodShopperMore"
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
				hasMore: true
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
				'selectedEntries'
			])
		},
		methods: {
			// 加载更多
			getFoodShopperMore () {
				if (!this.hasMore) {
					return;
				}
				this.offset += 20;
				getFoodShopperList(this.offset, this.keyword, this.target).then((response) => {
					this.shoppers = this.shoppers.concat(response);
					this._checkMore(response);
				});
			},
			selectItem (item) {
				this.$router.push({
          path: `/shop/id=${item.id}`
        });
        console.log(1);
        this.setselectedShopper(item);
			},
			_getFoodShopperList () {
				this.hasMore = true;
				this.offset = 0;
				getFoodShopperList(this.offset, this.keyword, this.target).then((response) => {
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
			position: absolute
			top: 0
			left: 0
			right: 0
			width: 100%
			height: 44px
		.filter-wrapper
			position: absolute
			top: 44px
			left: 0
			right: 0
			width: 100%
			height: 40px
			z-index: 100
			border-1px(#ddd)
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

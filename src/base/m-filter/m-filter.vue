<template>
	<div class="filter" ref="filter">
		<div class="filter-title">
			<div class="filter-item" :class="{open:showFlag && currentIndex === index}" v-for="(filter,index) in filters" @click="open(index)">
				<span class="name">{{ filter }}</span>
				<i class="icon icon-bottom-arrow2"></i>
			</div>
		</div>
		<transition-group tag="div" name="fold">
			<div class="filter-extend" :key="0" v-show="showFlag && currentIndex === 0">
				<keep-alive>
					<filter-category @select="selectItem"></filter-category>
				</keep-alive>
			</div>
			<div class="filter-extend" :key="1" v-show="showFlag && currentIndex === 1">
				<keep-alive>
					<filter-sort @select="selectItem"></filter-sort>
				</keep-alive>
			</div>
			<div class="filter-extend" :key="3" v-show="showFlag && currentIndex === 2">
				<keep-alive>
					<filter-more @select="selectItem"></filter-more>
				</keep-alive>
			</div>
		</transition-group>
		<transition name="fade">
			<div class="list-mask" v-show="showFlag" @click="hide"></div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
	import FilterCategory from 'base/filter-category/filter-category';
	import FilterSort from 'base/filter-sort/filter-sort';
	import FilterMore from 'base/filter-more/filter-more';

	export default {
		data () {
			return {
				filters: ['分类', '排序', '筛选'],
				currentIndex: -1,
				showFlag: false,
				view: '',
				index: 0
			};
		},
		methods: {
			open (index) {
				if (this.currentIndex === index) {
					this.showFlag = !this.showFlag;
				} else {
					this.showFlag = true;
				}
				this.index = index;
				this.currentIndex = index;
			},
			hide () {
				this.showFlag = false;
			},
			selectItem (item) {
				this.showFlag = false;
				this.filters[this.index] = item.name;
				this.$emit('select', item);
			}
		},
		components: {
			FilterCategory,
			FilterSort,
			FilterMore
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.filter-title
		display: flex
		position: absolute
		top: 0
		bottom: 0
		width: 100%
		z-index: 60
		line-height: 40px
		background: #fff
		.filter-item
			flex: 1
			font-size: 13px
			text-align: center
			color: #666
			&.open
				color: #3190e8
				.icon
					color: #3190e8
					transition: all 0.3s
					transform: rotate(180deg)
			.icon
				display: inline-block
				position: relative
				left: -6px
				top: 3px
				font-size: 16px
				color: #999
				transition: all 0.3s
				transform: rotate(0)
	.filter-extend
		display: flex
		position: absolute
		top: 41px
		right: 0
		left: 0
		z-index: 50
		max-height: 395px
		color: #666
		background: #fff
		&:nth-child(1)
			height: 395px
		&:nth-child(2)
			height: 300px
		// &:nth-child(3)
		// 	height: 266px
		&.fold-enter, &.fold-leave-active
			height: 0
			opacity: 0
		&.fold-enter-active, &.fold-leave-active
			transition: all .2s ease-in-out
	.list-mask
		position: fixed;
		top: 0
		left: 0
		width: 100%
		height: 100%
		z-index: 40
		background: rgba(0, 0, 0, 0.2)
		backdrop-filter: blur(10px)
		&.fade-enter, &.fade-leave-active
			opacity: 0
		&.fade-enter-active, &.fade-leave-active
			transition: all .4s
</style>

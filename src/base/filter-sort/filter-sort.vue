<template>
<transition name="fold">
	<div class="sort">
		<ul>
			<li class="info border-1px" v-for="(info,index) in sortInfos" @click="selectItem(info,index)">
				<i class="icon" :class="[info.icon_class]"></i>
				<span class="name" :class="{ active: currentIndex === index }">{{ info.name }}</span>
				<i class="icon-hook" v-show="currentIndex === index"></i>
			</li>
		</ul>
	</div>
</transition>
</template>

<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				sortInfos: [
					{name: '智能排序', order_by: 0, icon_class: 'icon-sort'},
					{name: '距离最近', order_by: 5, icon_class: 'icon-distance'},
					{name: '销量最高', order_by: 6, icon_class: 'icon-sales'},
					{name: '起送价最低', order_by: 1, icon_class: 'icon-price'},
					{name: '配送速度最快', order_by: 2, icon_class: 'icon-speed'},
					{name: '评分最高', order_by: 3, icon_class: 'icon-star'}
				],
				currentIndex: -1
			};
		},
		methods: {
			selectItem (info, index) {
				this.currentIndex = index;
				this.$emit('select', info);
			}
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	.sort
		width: 100%
		padding-left: 30px
		.info
			margin-left: 15px
			line-height: 50px 
			font-size: 0
			border-1px(#ddd)
			.icon
				display: inline-block
				vertical-align: top
				margin-left: -25px
				margin-right: 10px
				margin-top: 18px
				font-size: 15px
				&.icon-sort
					color: #3b87c8
				&.icon-distance
					color: #2a9bd3
				&.icon-sales
					color: #f07373
				&.icon-price
					color: #e6b61a
				&.icon-speed
					color: #37c7b7
				&.icon-star
					color: #eba53b
			.name
				display: inline-block
				vertical-align: middle
				font-size: 12px
				&.active
					color: #0089dc
			.icon-hook
				display: inline-block
				vertical-align: middle
				float: right
				margin: 18px 10px 0 0
				font-size: 15px
				color: #0089dc
</style>

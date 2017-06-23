<template>
	<div class="filter">
		<div class="filter-item" v-for="filter in filters">
			<span class="name">{{ filter }}</span>
			<i class="icon icon-bottom-arrow2"></i>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				filters: ['分类', '排序', '筛选']
			};
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.filter
		position: absolute
		top: 0
		bottom: 0
		display: flex
		width: 100%
		line-height: 40px
		background: #fff
		.filter-item
			flex: 1
			font-size: 13px
			text-align: center
			color: #666
			.icon
				display: inline-block
				position: relative
				left: -6px
				top: 3px
				font-size: 16px
				color: #999
</style>

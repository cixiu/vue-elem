<template>
	<div class="loading">
		<img width="24" height="24" src="./loading.gif">
		<p class="desc">{{ title }}</p>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			title: {
				type: String,
				default: '正在加载...'
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">

	.loading
		width: 100%
		line-height: 40px
		text-align: center
		img
			vertical-align: middle
		.desc
			display: inline-block
			margin-left: 5px
			font-size: 14px
			color: #333
</style>

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
		text-align: center
		.desc
			display: inline-block
			margin-left: 5px
			line-height: 24px
			font-size: 12px
			color: #333
</style>

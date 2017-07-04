<template>
	<div class="tips-alert">
		<p>{{ tips }}</p>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			tips: {
				type: String,
				default: '这是提示'
			}
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.tips-alert
		max-width: 40%
		margin: 0 auto
		padding: 10px
		line-height: 20px
		font-size: 14px
		border-radius: 20px
		background-color: #666
		color: #fff
		text-align: center
</style>

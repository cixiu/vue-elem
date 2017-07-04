<template>
	<div class="title">
		<i @click="back" class="icon-arrow_back"></i>
		<h1 class="name">{{ titleName }}</h1>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			titleName: {
				type: String,
				default: ''
			}
		},
		methods: {
			back () {
				this.$router.back();
			}
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.title
		width: 100%
		height: 44px
		z-index: 999
		text-align: center
		background-image: linear-gradient(90deg, #0af, #0085ff)
		color: #fff
		.icon-arrow_back
			position: absolute
			top: 4px
			left: 0
			padding: 10px
			font-size: 16px
		.name
			width: 100%
			line-height: 44px
			font-size: 18px
			font-weight: 700
</style>

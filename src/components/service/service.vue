<template>
	<div class="service">
		<div class="header">
			<m-title :title-name="targetName"></m-title>
		</div>
		<div class="service-header border-1px">
			<a class="group" href="#">
				<i class="icon icon-dialog"></i>
				<p class="text">在线客服</p>
			</a>
			<a class="group" href="#">
				<i class="icon icon-phone-old"></i>
				<p class="text">客服热线</p>
			</a>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import MTitle from 'base/m-title/m-title';
	export default {
		data () {
			return {
				targetName: '服务中心'
			};
		},
		components: {
			MTitle
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
	
	.service-header
		display: flex
		align-items: center
		text-align: center
		background-color: #fff
		border-1px(#ddd)
		.group
			display: block
			flex: 1
			padding: 19px 0 16px
			line-height: 14px
			font-size: 12px
			color: #666
			&:first-child
				border-right: 1px solid #ddd
			.icon
				font-size: 23px
			.text
				margin-top: 10px
</style>

<template>
	<div class="footer">
		<router-link class="foot-tab" tag="div" to="/msite">
			<i class="icon-elem"></i>
			<span class="text">外卖</span>
		</router-link>
		<router-link class="foot-tab" tag="div" to="/discover">
			<i class="icon icon-discover"></i>
			<i class="icon_active icon-discover-active"></i>
			<span class="text">发现</span>
		</router-link>
		<router-link class="foot-tab" tag="div" to="/order">
			<i class="icon icon-order"></i>
			<i class="icon_active icon-order-active"></i>
			<span class="text">订单</span>
		</router-link>
		<router-link class="foot-tab" tag="div" to="/profile">
			<i class="icon icon-user"></i>
			<i class="icon_active icon-user-active"></i>
			<span class="text">我的</span>
		</router-link>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				footData: [
					{name: '外卖', showFlag: false, icon: {icon_raw: 'icon-elem'}},
					{name: '发现', showFlag: false, icon: {icon_raw: 'icon-discover', icon_active: 'icon-discover-active'}},
					{name: '订单', showFlag: false, icon: {icon_raw: 'icon-order', icon_active: 'icon-order-active'}},
					{name: '我的', showFlag: false, icon: {icon_raw: 'icon-user', icon_active: 'icon-user-active'}}
				]
			};
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.footer
		position: absolute
		right: 0
		bottom: 0
		left: 0
		z-index: 9999
		box-sizing: border-box
		display: flex
		align-items: center
		width: 100%
		height: 50px
		padding-top: 4px
		box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.1)
		background: #fff
		.foot-tab
			flex: 1
			text-align: center
			color: #666
			.icon
				display: inline-block
				width: 20px
				height: 20px
				font-size: 20px
			.icon_active
				width: 20px
				height: 20px
				font-size: 20px
				display: none
			.text
				display: block
				line-height: 12px
				font-size: 10px
			&.router-link-active
				color: #0089dc
				.icon
					display: none
				.icon_active
					display: inline-block
</style>

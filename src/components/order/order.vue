<template>
	<div class="order">
		<div class="header">
			<m-title :title-name="targetName"></m-title>
		</div>
		<m-footer></m-footer>
	</div>
</template>

<script type="text/ecmascript-6">
	import MTitle from 'base/m-title/m-title';
	import MFooter from 'components/m-footer/m-footer';
	export default {
		data () {
			return {
				targetName: '订单'
			};
		},
		components: {
			MTitle,
			MFooter
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>

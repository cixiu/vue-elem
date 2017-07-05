<template>
	<div class="vipcard">
		<div class="header">
			<m-title :title-name="targetName"></m-title>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import MTitle from 'base/m-title/m-title';

	export default {
		data () {
			return {
				targetName: '饿了么会员卡'
			};
		},
		components: {
			MTitle
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>

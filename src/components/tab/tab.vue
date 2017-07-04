<template>
	<div class="tab">
	<!-- v-if="entries.length"必须加上 因为entries是异步获取的 可能在slider组件mounted时候entries还没有获取到 那么就会出现元素没有渲染 -->
		<div class="slider-wrapper" v-if="entries.length">
			<slider>
				<div class="item-group-left">
					<div class="item" v-for='item in entriesLeft' @click="selectItem(item)">
						<a href="javascrit:">
							<img width="45" height="45" :src="item.image">
						</a>
						<span class="name">{{item.name}}</span>
					</div>
				</div>
				<div class="item-group-right">
					<div class="item" v-for="item in entriesRight" @click="selectItem(item)">
						<a href="javascrit::">
							<img width="45" height="45" :src="item.image">
						</a>
						<span class="name">{{item.name}}</span>
					</div>
				</div>
			</slider>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Slider from 'base/slider/slider';

	export default {
		props: {
			entries: {
				type: Array,
				default: []
			}
		},
		computed: {
			entriesLeft () {
				return this.entries.slice(0, 8);
			},
			entriesRight () {
				return this.entries.slice(8);
			}
		},
		methods: {
			selectItem (item) {
				this.$emit('selectFood', item);
			}
		},
		components: {
			Slider
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.tab
		width: 100%
		height: 177px
		background: #fff
		.slider-wrapper
			position: relative
			overflow: hidden
			height: 100%
			.item-group-left, .item-group-right
				display: inline-block
				width: 100%
				white-space: normal
				.item
					display: inline-block
					width: 25%
					margin-top: 10px
					text-align: center
					overflow: hidden
					a
						display: block
						width: 100%
						text-decoration: none
					.name
						display: block
						margin-top: 5px
						line-height: 14px
						font-size: 12px
						color: #666
</style>

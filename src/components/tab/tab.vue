<template>
	<div class="tab">
	<!-- v-if="entries.length"必须加上 因为entries是异步获取的 可能在slider组件mounted时候entries还没有获取到 那么就会出现元素没有渲染 -->
		<div class="slider-wrapper" v-if="entries.length">
			<slider>
				<div class="item-group-left">
					<div class="item" v-for='item in entriesLeft'>
						<a href="javascrit:">
							<img width="45" height="45" :src="item.image">
						</a>
						<span class="name">{{item.name}}</span>
					</div>
				</div>
				<div class="item-group-right">
					<div class="item" v-for="item in entriesRight">
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
	import {getEntries} from 'api/entries';
	import {createEntries} from 'common/js/entries';

	export default {
		data () {
			return {
				entries: []
			};
		},
		created () {
			this._getEntries();
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
			_getEntries () {
				getEntries().then((response) => {
					this.entries = this._normalizeEntries(response[0].entries);
				});
			},
			_normalizeEntries (list) {
				let ret = [];
				list.forEach((entriesData) => {
					ret.push(createEntries(entriesData));
				});
				return ret;
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

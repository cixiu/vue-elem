<template>
	<transition name="slide">
		<div class="geoPosition">
			<div class="header">
				<div class="title">
					<i @click="back" class="icon-arrow_back"></i>
					<h1 class="name">选择地址</h1>
				</div>
				<div class="search-box">
					<input class="search" type="text" v-model="query" placeholder="请输入地址" ref="input">
					<i @click="clear" class="icon-close" v-show="query"></i>
				</div>
			</div>
			<scroll class="suggest" :data="result" :before-scroll="beforeScroll" @beforeScroll="blur">
				<ul class="suggest-list">
					<li class="suggest-item border-1px" v-for="suggest in result" @click="selectGPS(suggest)">
						<p class="name">{{ suggest.name }}</p>
						<p class="address">{{ suggest.address }}</p>
					</li>
				</ul>
			</scroll>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import Scroll from 'base/scroll/scroll';
	import {search} from 'api/search';
	import {debounce} from 'common/js/util';
	import {mapActions} from 'vuex';

	export default {
		data () {
			return {
				query: '',
				result: [],
				beforeScroll: true
			};
		},
		created () {
			this.$watch('query', debounce((newQuery) => {
				if (!newQuery) {
					return;
				}
				this.search(newQuery);
			}, 400));
		},
		methods: {
			back () {
				this.query = '';
				this.$emit('goback');
			},
			clear () {
				this.query = '';
			},
			search () {
				search(this.query).then((response) => {
					this.result = response;
				});
			},
			blur () {
				this.$refs.input.blur();
			},
			selectGPS (suggest) {
				this.setGeoPosition(suggest);
				this.query = '';
				this.$emit('goback');
			},
			...mapActions([
				'setGeoPosition'
			])
		},
		components: {
			Scroll
		}
		// watch: {
		// 	query () {
		// 		this.search();
		// 	}
		// }
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	.geoPosition
		position: fixed
		top: 0
		right: 0
		bottom: 0
		left: 0
		z-index: 9999
		overflow: hidden
		background: #f4f4f4
		&.slide-enter, &.slide-leave-active
			transform: translate3d(100%, 0, 0)
		&.slide-enter-active, &.slide-leave-active
			transition: all 0.3s
		.header
			position: fixed
			top: 0
			right: 0
			left: 0
			z-index: 999
			width: 100%
			padding-bottom: 12px
			text-align: center
			color: #fff
			background: #0096ff
			.title
				width: 100%
				height: 44px
				text-align: center
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
			.search-box
				position: relative
				align-items: center
				.search
					box-sizing: border-box
					width: 90%
					height: 27px
					margin-top: 5px
					padding: 0 18px
					border-radius: 28px
					font-size: 13px
				.icon-close
					position: absolute
					top: 10px
					right: 7%
					color: #4566a0
		.suggest
			position: absolute
			top: 88px
			right: 0
			bottom: 0
			left: 0
			z-index: 998
			width: 100%
			overflow: hidden
			.suggest-item
				padding: 10px 15px
				background: #fff
				border-1px(#eee)
				.name
					line-height: 16px
					font-size: 14px
					font-weight: 700
				.address
					line-height: 14px
					font-size: 12px
					color: #999
</style>

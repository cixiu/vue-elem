<template>
	<div class="m-header">
		<div class="title">
			<div class="address" @click="setGeoPos">
				<span class="icon-position"></span>
				<span class="name">{{ address.name || '获取地址中...'}}</span>
				<span class="icon-bottom-arrow2"></span>
			</div>
			<div class="weather" v-show="weather.temperature">
				<div class="status">
					<h1 class="temperature">{{ weather.temperature }}°</h1>
					<span class="desc">{{ weather.description }}</span>
				</div>
				<img width="27" height="27" :src="parseImage(weather.image_hash)">
			</div>
		</div>
		<div class="search-btn" @click="enterSearch">
			<input class="text" type="text" placeholder="搜索商家、商品">
		</div>
		<scroll class="hot-search" :data="hotSearch" :scroll-y="false" v-show="hotSearch.length">
			<div>
				<a class="search-word" v-for="(search,index) in hotSearch" @click="selectItem(search, index)">
					{{ search.word }}
				</a>
			</div>
		</scroll>
		<router-view></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
	import Scroll from 'base/scroll/scroll';
	import {getGeography, getWeather, getHotSearch} from 'api/m-header';
	import {parseImage} from 'common/js/util';
	import {mapGetters} from 'vuex';

	export default {
		data () {
			return {
				address: {},
				weather: {},
				hotSearch: []
			};
		},
		created () {
			this._getGeography();
			this._getWeather();
			this._getHotSearch();
		},
		computed: {
			...mapGetters([
				'latitude',
				'longitude'
			])
		},
		methods: {
			parseImage (imageHase) {
				if (!imageHase) {
					return '';
				}
				return parseImage(imageHase);
			},
			selectItem (search, index) {
				this.$router.push({
					path: `/search/shop?keyword=${search.word}`
				});
			},
			setGeoPos () {
				this.$emit('setGPS');
			},
			enterSearch () {
				this.$router.push({
					path: '/search'
				});
			},
			_getGeography () {
				if (!this.latitude || !this.longitude) {
					return;
				}
				getGeography(this.latitude, this.longitude).then((response) => {
					this.address = response;
				});
			},
			_getWeather () {
				if (!this.latitude || !this.longitude) {
					return;
				}
				getWeather(this.latitude, this.longitude).then((response) => {
					this.weather = response;
				});
			},
			_getHotSearch () {
				if (!this.latitude || !this.longitude) {
					return;
				}
				getHotSearch(this.latitude, this.longitude).then((response) => {
					this.hotSearch = response;
				});
			}
		},
		watch: {
			latitude () {
				this._getGeography();
				this._getWeather();
				this._getHotSearch();
			}
		},
		components: {
			Scroll
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	.m-header
		box-sizing: border-box
		width: 100%
		height: 122px
		padding: 10px 14px
		background: #0096ff
		.title
			display: flex
			align-items: center
			justify-content: space-between
			height: 34px
			color: #fff
			.address
				display: flex
				align-items: center
				width: 60%
				font-size: 0
				.icon-position
					display: inline-block
					font-size: 18px
				.name
					display: inline-block
					margin: 0 5px
					max-width: 80%
					line-height: 22px
					font-size: 18px
					no-wrap()
				.icon-bottom-arrow2
					display: inline-block
					font-size: 7px
			.weather
				display: flex
				align-items: center
				.status
					margin-right: 4px
					text-align: right
					.temperature
						line-height: 16px
						font-size: 14px
					.desc
						line-height: 14px
						font-size: 12px
		.search-btn
			.text
				display: block
				width: 100%
				height: 36px
				box-sizing: border-box
				margin: 7px 0
				font-size: 13px
				text-align: center
				border-radius: 18px
		.hot-search
			display: flex
			align-items: center
			white-space: nowrap
			overflow: hidden
			.search-word
				margin-right: 15px
				line-height: 14px
				font-size: 12px
				color: #fff
				&:last-child
					margin-right: 0
</style>

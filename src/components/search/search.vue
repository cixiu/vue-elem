<template>
	<div class="search">
		<div class="search-box">
			<i @click="back" class="icon-arrow_back"></i>
			<input class="search-input" type="text" v-model="query" autofocus="autofocus" placeholder="请输入商品名称" ref="input" @keyup.enter="addSearch">
			<i @click="clear" class="icon-close" v-show="query"></i>
		</div>
		<div class="search-history" v-if="searchHistory.length">
			<h1 class="title">
				<span class="text">历史搜索</span>
				<span class="empty" @click="empty">
					<i class="icon-empty"></i>
				</span>
			</h1>
			<ul class="search-list">
				<li class="search-item" v-for="search in searchHistory" @click="addQuery(search)">{{ search }}</li>
			</ul>
		</div>
		<div class="hot-search">
			<h1 class="title">
				<span class="text">热门搜索</span>
			</h1>
			<ul class="search-list">
				<li class="search-item" v-for="search in hotSearchWords" @click="addQuery(search.word)">{{ search.word }}</li>
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
	import {mapGetters, mapActions} from 'vuex';
	import {getHotSearchWords} from 'api/search';

	export default {
		data () {
			return {
				query: '',
				hotSearchWords: []
			};
		},
		computed: {
			...mapGetters([
				'searchHistory',
				'latitude',
				'longitude',
				'geohash'
			])
		},
		created () {
			this._getHotSearchWords();
		},
		methods: {
			back () {
				this.$router.back();
			},
			clear () {
				this.query = '';
			},
			empty () {
				this.clearSearchHistory();
			},
			addSearch () {
				this.savesearchHistory(this.query);
				this.$router.push({
					path: `/search/shop?keyword=${this.query}`
				});
				this.query = '';
			},
			addQuery (query) {
				this.query = query;
				this.addSearch();
			},
			_getHotSearchWords () {
				getHotSearchWords(this.latitude, this.longitude, this.geohash).then((response) => {
					this.hotSearchWords = response;
				});
			},
			...mapActions([
				'savesearchHistory',
				'clearSearchHistory'
			])
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.search
		position: fixed
		top: 0
		right: 0
		bottom: 0
		left: 0
		background: #fff
		.search-box
			box-sizing: border-box
			position: relative
			display: flex
			align-items: center
			padding: 11px
			.icon-arrow_back
				padding: 7px 14px 7px 0
				font-size: 21px
				color: #999
			.search-input
				box-sizing: border-box
				flex: 1
				height: 35px
				padding: 7px 15px
				border-radius: 15px
				font-size: 15px
				background: #f8f8f8
				color: #666
			.icon-close
				position: absolute
				top: 20px
				right: 7%
				color: #4566a0
	.search-history, .hot-search
		.title
			display: flex
			align-items: center
			justify-content: space-between
			padding: 7px 12px
			line-height: 20px
			font-size: 16px
			font-weight: 700
			color: #666
			.icon-empty
				font-size: 14px
				color: #cecece
		.search-list
			padding: 0 12px 12px 12px
			.search-item
				display: inline-block
				margin: 12px 12px 0 0
				padding: 7px 10px
				line-height: 16px
				font-size: 14px
				border-radius: 4px
				background: #f7f7f7
				color: #666
	.hot-search
		margin-top: 15px
</style>

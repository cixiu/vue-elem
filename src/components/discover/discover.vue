<template>
	<div class="discover">
		<div class="header">
			<m-title :title-name="targetName"></m-title>
		</div>
		<scroll class="content" :data="collection" ref="scroll">
			<div>
				<div class="recommend" v-if="recommends.length">
					<div class="top">
						<a class="item" :href="item.content_url" v-for="item in recommends">
							<img class="img" :src="parseImage(item.main_pic_hash)">
							<h1 class="title" :style="{ color: item.title_color }">{{ item.title }}</h1>
							<p class="subtitle">{{ item.subtitle }}</p>
						</a>
					</div>
					<split></split>
					<div class="bottom">
						<a :href="Advertisement[0].content_url">
							<img class="img" width="100%" height="86" :src="parseImage(Advertisement[0].sub_pic_hash) | changeImageSize">
						</a>
					</div>
					<split></split>
				</div>
				<div class="category FoodSuggest" v-if="FoodSuggest.length"  @click="goRecommendFood">
					<div class="active-title">
						<span class="line left"></span>
						<i class="icon icon-good"></i>
						<span class="title">美食推荐</span>
						<span class="line right"></span>
					</div>
					<p class="active-subtitle">你的口味，我都懂得</p>
					<div class="active-content">
						<ul>
							<li class="item" v-for="food in FoodSuggest">
								<img width="100%" height="100%" :src="parseImage(food.image_hash)">
								<div class="info">
									<p class="name">{{ food.name }}</p>
									<div class="price">
										<span class="now-price">¥{{ food.price }}</span>
										<span class="original_price" v-if="food.original_price">¥{{ food.original_price }}</span>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<p class="active-more">查看更多 ></p>
					<split></split>
				</div>
				<div class="category SpecialFood" v-if="SpecialFoodList.length" @click="goSpecicalFood">
					<div class="active-title">
						<span class="line left"></span>
						<i class="icon icon-special-price"></i>
						<span class="title">天天特价</span>
						<span class="line right"></span>
					</div>
					<p class="active-subtitle">特价商品，一网打尽</p>
					<div class="active-content">
						<ul>
							<li class="item" v-for="food in SpecialFoodList">
								<img width="100%" height="100%" :src="parseImage(food.image_path)">
								<div class="info">
									<p class="name">{{ food.name }}</p>
									<div class="price">
										<span class="now-price">¥{{ food.price }}</span>
										<span class="original_price" v-if="food.original_price">¥{{ food.original_price }}</span>
									</div>
								</div>
								<span class="discount">{{ (food.discount_rate * 10).toFixed(1) }}折</span>
							</li>
						</ul>
					</div>
					<p class="active-more">查看更多 ></p>
					<split></split>
				</div>
				<div class="category giftsSuggest" v-if="giftsSuggest.length" @click="goGiftSuggest">
					<div class="active-title">
						<span class="line left"></span>
						<i class="icon icon-alarm"></i>
						<span class="title">限时好礼</span>
						<span class="line right"></span>
					</div>
					<p class="active-subtitle">小积分换豪礼</p>
					<div class="active-content">
						<ul>
							<li class="item" v-for="gift in giftsSuggest">
								<a :href="gift.url" @click="selectGift(gift.url)">
									<img width="100%" height="100%" :src="parseImage(gift.image_hash)">
									<div class="info">
										<p class="name">{{ gift.title }}</p>
										<div class="price">
											<span class="now-price">{{ gift.points_required }}积分</span>
											<span class="original_price" v-if="gift.original_price">¥{{ gift.original_price }}</span>
										</div>
									</div>
									<span class="discount">{{ gift.corner_marker }}</span>
								</a>
							</li>
						</ul>
					</div>
					<p class="active-more">查看更多 ></p>
					<split></split>
				</div>
			</div>
		</scroll>
		<div class="footer-wrapper">
			<m-footer></m-footer>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import MTitle from 'base/m-title/m-title';
	import MFooter from 'components/m-footer/m-footer';
	import Split from 'base/split/split';
	import Scroll from 'base/scroll/scroll';
	import {getParmas, getHeaderAd, getFoodSuggest, getSpecialFoodList, getGiftsSuggest} from 'api/discover';
	import {mapGetters} from 'vuex';
	import {parseImage} from 'common/js/util';

	export default {
		data () {
			return {
				targetName: '发现',
				tag_id: -1,
				request_id: '',
				recommends: [],
				Advertisement: [],
				FoodSuggest: [],
			  SpecialFoodList: [],
			  giftsSuggest: [],
			  rank_id: ''
			};
		},
		created () {
			setTimeout(() => {
				this._getParams();
				this._getHeaderAd();
				this._getSpecialFoodList();
				this._getGiftsSuggest();
			}, 20);
		},
		computed: {
			collection () {
				return this.recommends.concat(this.Advertisement, this.FoodSuggest, this.SpecialFoodList, this.giftsSuggest);
			},
			...mapGetters([
				'latitude',
				'longitude'
			])
		},
		methods: {
			parseImage (imageHash) {
				return parseImage(imageHash);
			},
			selectGift (url) {
				window.location.href = url;
			},
			goRecommendFood () {
				window.location.href = `https://h5.ele.me/ulike/#request_id=${this.request_id}`;
			},
			goSpecicalFood () {
				window.location.href = `https://h5.ele.me/ranking/#type=special_food&rank_id=${this.rank_id}`;
			},
			goGiftSuggest () {
				window.location.href = `https://h5.ele.me/exchange/`;
			},
			_getParams () {
				getParmas(this.latitude, this.longitude).then((response) => {
					this.tag_id = response.tags[0].id;
					this.request_id = response.request_id;
				});
			},
			_getHeaderAd () {
				getHeaderAd(this.latitude, this.longitude).then((response) => {
					this.recommends = response['1'];
					this.Advertisement = response['2'];
				});
			},
			_getFoodSuggest () {
				if (!this.latitude || !this.longitude) {
					return;
				}
				getFoodSuggest(this.latitude, this.longitude, this.request_id, this.tag_id).then((response) => {
					response.forEach((item) => {
						this.FoodSuggest.push(item.foods[0]);
					});
				});
			},
			_getSpecialFoodList () {
				if (!this.latitude || !this.longitude) {
					return;
				}
				getSpecialFoodList(this.latitude, this.longitude).then((response) => {
					response.query_list.splice(0, 3).forEach((item) => {
						this.SpecialFoodList.push(item.foods[0]);
					});
					this.rank_id = response.rank_id;
				});
			},
			_getGiftsSuggest () {
				getGiftsSuggest().then((response) => {
					this.giftsSuggest = response;
				});
			}
		},
		filters: {
			changeImageSize (value) {
				let re = /\w+\/!\d+(\W+|\w+)+/g;
				return value.replace(re, '');
			}
		},
		watch: {
			request_id (newValue) {
				if (newValue) {
					setTimeout(() => {
						this._getFoodSuggest();
					}, 20);
				}
			}
		},
		components: {
			MTitle,
			MFooter,
			Split,
			Scroll
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	.header
		position: fixed
		top: 0
		left: 0
		width: 100%
		z-index: 999
	.content
		position: fixed
		top: 44px
		right: 0
		bottom: 50px
		left: 0
		overflow: hidden
		background: #fff
		.recommend
			.top
				display: flex
				position: relative
				box-sizing: border-box
				flex-wrap: wrap
				width: 100%
				background: #fff
				overflow: hidden
				.item
					display: block
					box-sizing: border-box
					width: 50%
					height: 86px
					margin-left: 50%
					padding: 24px 15px
					border-bottom: 1px solid #ededed
					border-right: 1px solid #ededed
					.img
						float: right
						width: 45px
						height: 45px
						margin-top: -3%
					&:first-child
						position: absolute
						margin-left: 0
						margin-right: 0
						padding: 24px 15px 15px 15px
						height: 172px
						border-bottom: none
						.img
							position: absolute
							bottom: 24px
							margin: 21px 26px 0
							width: 75px
							height: 75px
					&:nth-child(2), &:nth-child(3)
						border-right: none
					.title
						margin-bottom: 6px
						line-height: 22px
						font-size: 18px
						no-wrap()
					.subtitle
						line-height: 14px
						font-size: 12px
						color: #999
						no-wrap()
			.bottom
				a
					display: block
					height: 86px
	.active-title
		padding-top: 20px
		line-height: 21px
		font-size: 0
		text-align: center
		.line
			display: inline-block
			vertical-align: middle
			position: relative
			width: 14px
			height: 0
			margin: 8px 3px 6px
			border: 1px solid #333
			&:after
				position: absolute
				top: -2px
				width: 5px
				height: 5px
				content: ""
				border-radius: 50%
				background: #333
			&.left:after
				right: -2px
			&.right:after
				left: -2px
		.icon
			display: inline-block
			vertical-align: middle
			font-size: 16px
		.title
			display: inline-block
			vertical-align: middle
			margin: 0 4px
			font-size: 18px
			font-weight: 700px
	.active-subtitle
		padding-bottom: 8px
		line-height: 13px
		font-size: 11px
		color: #999
		text-align: center
	.active-content
		padding: 12px 0 15px 15px
		white-space: nowrap
		.item
			display: inline-block
			box-sizing: border-box
			position: relative
			width: 30%
			margin-right: 3%
			img
				margin-bottom: 10px
			.name
				margin-bottom: 5px
				line-height: 16px
				font-size: 12px
				color: #333
				no-wrap()
			.price
				height: 24px
				line-height: 24px
				.now-price
					display: inline-block
					vertical-align: middle
					max-width: 50px
					height: 18px
					margin-right: 3px
					line-height: 18px
					font-size: 13px
					color: #ff5339
					no-wrap()
				.original_price
					display: inline-block
					vertical-align: middle
					max-width: 40px
					font-size: 11px
					color: #aaa
					text-decoration: line-through
					no-wrap()
			.discount
				position: absolute
				top: 0
				left: 0
				padding: 2px
				line-height: 13px
				font-size: 11px
				color: #fff
				background: #413d3c
	.active-more
		padding-bottom: 18px
		line-height: 15px
		font-size: 13px
		text-align: center
		color: #999
</style>

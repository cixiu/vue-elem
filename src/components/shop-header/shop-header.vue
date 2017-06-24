<template>
	<div class="header">
		<div class="back">
			<span @click="back" class="icon icon-arrow_back"></span>
		</div>
		<div @click="showShopDetail" class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="avatar">
			</div>
			<div class="content">
				<div class="title">
					{{ shopper.name }}
				</div>
				<div class="description">
					<span v-if="shopper.delivery_mode">蜂鸟专送 /</span>
					<span v-else>商家配送 /</span>
					<span>{{ shopper.order_lead_time }}分钟送达 /</span>
					<span>配送费￥{{ shopper.float_delivery_fee }}</span>
					<span class="icon-keyboard_arrow_right"></span>
				</div>
				<div class="bulletin-wrapper">
					<span class="bulletin-title">公告 :</span>
					<span class="bulletin-text">{{ shopper.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。' }}</span>
				</div>
			</div>
		</div>
		<div @click="showActivitiesDetail" v-if="shopper.activities" class="activities-wrapper">
			<div class="activities-content">
				<span class="icon" :style="{backgroundColor: bgColor(shopper.activities[0]), borderRadius: '2px'}">{{ shopper.activities[0].icon_name }}</span>
				<span class="text">{{ shopper.activities[0].description }}</span>
			</div>
			<div class="activities-count">{{ shopper.activities.length }}个活动</div>
		</div>
		<div class="background">
  		<img width="100%" height="100%" :src="avatar">
  	</div>
  	<transition name="slide">
  		<div class="shopDetail" v-if="shopDetail">
  			<div class="title">
  				<i @click="hideShopDetail" class="icon-arrow_back"></i>
  				<h1 class="name">商家详情</h1>
  			</div>
  			<scroll class="shop-content-wrapper" v-if="shopper">
  				<div class="shop-content">
  					<div class="activities" v-if="shopper.activities || shopper.supports">
  						<split></split>
  						<h1 class="name border-1px">活动与属性</h1>
  						<div class="active-support">
  							<div class="item" v-for="item in activitiesAndsupports">
  									<span class="icon" :style="{backgroundColor: bgColor(item), borderRadius: '2px', borderColor: bgColor(item)}">{{ item.icon_name }}</span>
										<span class="text">{{ item.description }}</span>
  							</div>
  						</div>
  					</div>
  					<div class="albums" v-if="shopper.albums">
  						<split></split>
  						<h1 class="name border-1px">商家实景</h1>
  						<ul class="album-list">
  							<li class="album" v-for="album in shopper.albums">
  								<img width="100%" height="80" :src="parseImage(album.cover_image_hash)">
  								<span class="text">{{ album.name }}({{ album.count }})张</span>
  							</li>
  						</ul>
  					</div>
  					<div class="shop-info-wrapper">
  						<split></split>
  						<h1 class="name">商家信息</h1>
							<div class="shop-info">
								<p class="description">{{ shopper.description }}</p>
								<p class="address">地址 : {{ shopper.address }}</p>
								<p class="opening_hours">营业时间 : {{ openingHours }}</p>
							</div>
							<split></split>
  					</div>
  				</div>
  			</scroll>
  		</div>
  	</transition>
  	<transition name="fade">
  		<div class="activities-detail" v-show="activitiesDetail">
  			<div class="activities-detail-wrapper clearfix">
  				<div class="activities-detail-main">
  					<h1 class="name">{{ shopper.name }}</h1>
  					<div class="star-wrapper">
  						<star :size="48" :score="shopper.rating"></star>
  					</div>
  					<div class="title">
  						<span class="text">优惠信息</span>
  					</div>
  					<ul class="activities-list" v-if="shopper.activities">
  						<li class="active" v-for="item in shopper.activities">
  							<span class="icon" :style="{backgroundColor: bgColor(item), borderRadius: '2px', borderColor: bgColor(item)}">{{ item.icon_name }}</span>
								<span class="text">{{ item.description }}</span>
  						</li>
  					</ul>
  					<div class="title">
  						<span class="text">商家公告</span>
  					</div>
  					<div class="bulletin">
  						<p class="content">{{ shopper.promotion_info }}</p>
  					</div>
  				</div>
  			</div>
  			<div @click="hideActivitiesDetail" class="activities-detail-close">
  				<i class="icon-close"></i>
  			</div>
  		</div>
  	</transition>
	</div>
</template>

<script type="text/ecmascript-6">
	import {getShop} from 'api/shop';
	import {parseImage} from 'common/js/util';
	import {mapGetters, mapMutations} from 'vuex';
	import Split from 'base/split/split';
	import Scroll from 'base/scroll/scroll';
	import Star from 'base/star/star';

	export default {
		data () {
			return {
				shopper: {},
				avatar: '',
				shopDetail: false,
				activitiesDetail: false
			};
		},
		props: {
			shopid: {
				type: String,
				default: ''
			}
		},
		created () {
			this._getShop();
		},
		computed: {
			activitiesAndsupports () {
				if (!this.shopper.activities && !this.shopper.supports) {
					return [];
				} else if (!this.shopper.activities && this.shopper.supports) {
					return this.shopper.supports;
				} else if (this.shopper.activities && !this.shopper.supports) {
					return this.shopper.activities;
				} else {
					return this.shopper.activities.concat(this.shopper.supports);
				}
			},
			openingHours () {
				let re = /\//g;
				if (!this.shopper.opening_hours) {
					return;
				}
				return this.shopper.opening_hours[0].replace(re, '-');
			},
			...mapGetters([
				'selectedShopper'
			])
		},
		methods: {
			back () {
				this.$router.back();
			},
			showShopDetail () {
				this.shopDetail = true;
			},
			hideShopDetail () {
				this.shopDetail = false;
			},
			showActivitiesDetail () {
				this.activitiesDetail = true;
			},
			hideActivitiesDetail () {
				this.activitiesDetail = false;
			},
			bgColor (item) {
				return `#${item.icon_color}`;
			},
			parseImage (imageHash) {
				return parseImage(imageHash);
			},
			_getShop () {
				getShop(this.shopid).then((response) => {
					this.shopper = response;
					this.avatar = parseImage(this.shopper.image_path);
					this.setselectedShopper(this.shopper);
				});
			},
			...mapMutations({
				setselectedShopper: 'SET_SELECTED_SHOPPER'
			})
		},
		components: {
			Split,
			Scroll,
			Star
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
	
	.header
		position: relative
		overflow: hidden
		height: 130px
		padding: 0 10px
		color: #fff
		background: rgba(7, 17, 27, 0.5)
		.back
			padding: 7px 0
			.icon
				padding-right: 10px
				font-size: 20px
		.content-wrapper
			display: flex
			position: relative
			.avatar
				flex: 0 0 64px
				width: 64px
				margin-right: 10px
				img
					border-radius: 4px
			.content
				flex: 1
				position: relative
				overflow: hidden
				.title
					line-height: 20px
					font-size: 18px
					font-weight: 700
					no-wrap()
				.description
					font-size: 0
					span
						display: inline-block
						margin-right: 4px
						line-height: 24px
						font-size: 10px
						&.icon-keyboard_arrow_right
							float: right
							margin-right: 0
							font-size: 25px
							color: #fff
				.bulletin-wrapper
					line-height: 20px
					font-size: 10px
					no-wrap()
					.bulletin-title
						margin-right: 2px
					.bulletin-text
						no-wrap()
		.activities-wrapper
			position: relative
			overflow: hidden
			line-height: 30px
			.activities-content
				display: inline-block
				vertical-align: top
				font-size: 10px
				no-wrap()
				.icon
					margin-right: 4px
			.activities-count
				display: inline-block
				vertical-align: top
				float: right
				font-size: 10px
		.background
			position: absolute
			top: 0
			left: 0
			z-index: -1
			width: 100%
			height: 100%
			filter: blur(10px)
		.shopDetail
			position: fixed
			top: 0
			right: 0
			bottom: 0
			left: 0
			z-index: 60
			background: #fff
			color: #333
			&.slide-enter, &.slide-leave-active
				transform: translate3d(100%, 0, 0)
			&.slide-enter-active, &.slide-leave-active
				transition: all 0.5s
			.title
				position: fixed
				top: 0
				right: 0
				left: 0
				z-index: 999
				text-align: center
				background-color: #2196f3
				color: #fff
				.icon-arrow_back
					position: absolute
					top: 0
					left: 0
					padding: 10px
					font-size: 24px
				.name
					width: 100%
					line-height: 44px
					font-size: 20px
			.shop-content-wrapper
				position: absolute
				top: 44px
				left: 0
				right: 0
				bottom: 0
				width: 100%
				overflow: hidden
				.name
					padding: 8px 15px
					line-height: 22px
					font-size: 16px
					font-weight: 400
					border-1px(#eee)
				.active-support
					padding: 0 15px 15px 15px
					.item
						display: flex
						margin: 15px 0
						font-size: 10px
						no-wrap()
						.icon
							display: inline-block
							width: 10px
							height: 10px
							text-align: center
							margin: 2px 4px 2px 0
							border: 1px solid
							color: #fff
						.text
							flex: 1
							display: inline-block
							line-height: 16px
							color: #666
							no-wrap()
						&:last-child
							margin: 0
				.album-list
					padding: 0 15px 15px 15px
					overflow: hidden
					.album
						display: inline-block
						position: relative
						width: 23%
						margin-right: 2%
						margin-top: 12px
						.text
							display: block
							position: absolute
							bottom: 2px
							left: 0
							width: 100%
							height: 18px
							line-height: 18px
							font-size: 12px
							text-align: center
							background: rgba(0, 0, 0, 0.6)
							color: #fff
				.shop-info
					padding: 0 15px 0 15px
					p
						padding: 15px 0
						border-bottom: 1px solid #eee
						line-height: 14px
						font-size: 12px
						color: #666
						&:last-child
							border-bottom: none
		.activities-detail
			position: fixed
			top: 0
			left: 0
			z-index: 100
			width: 100%
			height: 100%
			overflow: auto;
			background: #262626;
			.activities-detail-wrapper
				width: 100%
				min-height: 100%
				padding: 0 30px
				box-sizing: border-box
				.activities-detail-main
					margin-top: 44px
					padding-bottom: 70px
					.name
						text-align: center
						line-height: 22px
						font-size: 18px
						font-weight: 400
					.star-wrapper
						padding: 2px 0
						text-align: center
						span
							margin-right: 0
					.title
						margin: 30px 0 20px 0
						text-align: center
						.text
							padding: 5px 10px
							line-height: 14px
							font-size: 12px
							border: 1px solid #555
							border-radius: 50px
					.active
						display: flex
						font-size: 10px
						color: #fff
						no-wrap()
						.icon
							display: inline-block
							width: 10px
							height: 10px
							text-align: center
							margin: 2px 5px 2px 0
							border: 1px solid
						.text
							flex: 1
							display: inline-block
							line-height: 16px
							no-wrap()
					.content
						line-height: 14px
						font-size: 12px
			.activities-detail-close
				position: relative
				box-sizing: border-box
				width: 44px
				height: 44px
				margin: -70px auto 0 auto
				line-height: 44px
				border: 1px solid #888
				border-radius: 50%
				clear: both
				font-size: 22px
				text-align: center
				color: #999
			&.fade-enter, &.fade-leave-active
				opacity: 0
			&.fade-enter-active, &.fade-leave-active
				transition: all .5s
</style>

<template>
	<div class="shopper">
		<ul>
			<li class="item border-1px" v-for="item in shoppers">
				<div class="logo">
					<img width="60" height="60" :src="image(item)"/>
				</div>
				<div class="text">
					<div class="title">
						<span class="premium" v-show="item.is_premium"></span>
						<h1 class="name">{{ item.name }}</h1>
					</div>
					<div class="rating">
						<star :size="24" :score="item.rating"></star>
						<span class="score">{{ item.rating }}</span>
						<span class="sales">月售{{ item.recent_order_num }}单</span>
					</div>
					<div class="delivery">
						<div class="price">
							<span class="min-price">￥{{ item.float_minimum_order_amount }}起送 /</span>
							<span class="delivery-price">配送费￥{{ item.float_delivery_fee }} /</span>
							<span class="average-cost">{{ item.average_cost }}</span>
						</div>
						<div class="distance-time">
							<span class="distance">{{ item.distance }}m /</span>
							<span class="time">{{ item.order_lead_time }}分钟</span>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script type="text/ecmascript-6">
	import Star from 'base/star/star';
	import {getShopperList} from 'api/shopper';
	import {parseImage} from 'common/js/util';

	export default {
		data () {
			return {
				shoppers: []
			};
		},
		created () {
			this._getShopperList();
		},
		computed: {

		},
		methods: {
			image (item) {
				return parseImage(item.image_path);
			},
			_getShopperList () {
				getShopperList().then((response) => {
					this.shoppers = response;
					console.log(this.shoppers);
				});
			}
		},
		components: {
			Star
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	.shopper
		width: 100%
		.item
			position: relative
			display: flex
			background: #fff
			overflow: hidden
			border-1px(#eee)
			.logo
				box-sizing: border-box
				flex: 0 0 90px
				width: 90px
				padding: 15px
			.text
				flex: 1
				padding: 15px 0
				.title
					font-size: 0
				  .premium
						display: inline-block
						vertical-align: top
						&:before
							content: '\54C1\724C'
							padding: 0 2px
							margin-right: 5px
							line-height: 16px
							font-size: 12px
							font-weight: 700
							border-radius: 4px
							background: #ffd930
							color: #52250a
							text-align: center
					.name
						display: inline-block
						width: 155px
						line-height: 18px
						font-size: 16px
						font-weight: 700
						color: #333
						no-wrap()
				.rating
					margin-top: 8px
					// line-height: 14px
					font-size: 0
					.star
						display: inline-block
						font-size: 12px
					.score
						display: inline-block
						margin: 0 4px
						font-size: 12px
						color: #ff6000
					.sales
						display: inline-block
						font-size: 12px
						color: #666
				.delivery
					margin-top: 8px
					.price
						float: left
						font-size: 0
						.min-price, .delivery-price, .average-cost
							line-height: 14px
							font-size: 10px
							margin-right: 4px
							color: #666
					.distance-time
						float: right
						margin-right: 8px
						font-size: 0
						.distance, .time
							line-height: 14px
							font-size: 10px
							margin-right: 4px
							color: #666
						.time
							color: #2395ff
</style>

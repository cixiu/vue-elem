<template>
	<div class="shopper">
		<ul>
			<li @click="selectItem(item)" class="item border-1px" v-for="item in shoppers">
				<div class="logo">
					<img width="60" height="60" @load="imgLoad" v-lazy="image(item)"/>
					<div class="new-shopper" v-if="item.is_new">
						<span class="new-logo">新店</span>
					</div>
				</div>
				<div class="text">
					<div class="title">
						<span class="premium" v-show="item.is_premium"></span>
						<h1 class="name">{{ item.name }}</h1>
						<div class="supports">
							<span class="support" v-for="support in item.supports">{{ support.icon_name }}</span>
						</div>
					</div>
					<div class="rating">
						<star :size="24" :score="item.rating"></star>
						<span class="score">{{ item.rating }}</span>
						<span class="sales">月售{{ item.recent_order_num }}单</span>
						<div class="delivery-mode" v-if="item.delivery_mode">
							<span class="icon-name" v-show="item.supports.length > 1"><span>准时达</span></span>
							<span class="mode">{{ item.delivery_mode.text }}</span>
						</div>
					</div>
					<div class="delivery">
						<div class="price">
							<span class="min-price">￥{{ item.float_minimum_order_amount }}起送 /</span>
							<span class="delivery-price">{{ item.piecewise_agent_fee.tips }} /</span>
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
		<loading v-show="hasMore"></loading>
	</div>
</template>

<script type="text/ecmascript-6">
	import Star from 'base/star/star';
	import Loading from 'base/loading/loading';
	import {parseImage} from 'common/js/util';

	export default {
		props: {
			shoppers: {
				type: Array,
				default () {
					return [];
				}
			},
			hasMore: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			image (item) {
				return parseImage(item.image_path);
			},
			imgLoad () {
				if (!this.checkload) {
					this.$emit('refresh');
					this.checkload = true;
				}
			},
			selectItem (item) {
				this.$emit('select', item);
			}
		},
		filters: {
			normalizePrice (value) {
				return Math.round(value * 10) / 10;
			}
		},
		components: {
			Star,
			Loading
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
				img
					border-radius: 4px
				.new-shopper
					position: absolute
					top: 0
					left: 0
					width: 32px
					height: 32px
					font-size: 9px
					line-height: 13px
					background: linear-gradient(135deg, #26ce61, #26ce61 50%, transparent 0)
					.new-logo
						display: block
						position: absolute
						top: 5px
						left: 1px
						font-weight: 700
						color: #fff
						transform: rotate(-45deg)
			.text
				flex: 1
				padding: 15px 10px 15px 0
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
					.supports
						display: inline-block
						margin-top: 2px
						float: right
						font-size: 0
						.support
							display: inline-block
							box-sizing: border-box
							margin-left: 2px
							border: 1px solid #ddd
							font-size: 10px
							color: #999
				.rating
					margin-top: 8px
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
					.delivery-mode
						display: inline-block
						float: right
						font-size: 0
						text-align: center
						.icon-name, .mode
							display: inline-block
							margin-right: 4px
							padding: 0 2px
							border: 1px solid #2395FF
							border-radius: 4px
							font-size: 10px
							color: #2395FF
						.mode
							padding: 1px 2px
							margin-right: 0
							border: none
							background: #57A9FF
							color: #fff
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
						font-size: 0
						.distance, .time
							line-height: 14px
							font-size: 10px
							margin-right: 4px
							color: #666
						.time
							color: #2395ff
</style>

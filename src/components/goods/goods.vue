<template>
	<div class="goods"  v-if="goods.length">
		<scroll class="menu-wrapper">
				<ul>
					<li class="menu-item border-1px" v-for="(item,index) in goods" :class="{current: currentIndex === index}" @click="selectMenu(index,$event)">
						<img v-if="item.icon_url" width="9" height="12" :src="parseImage(item.icon_url)">
						<span class="text">{{ item.name }}</span>
					</li>
				</ul>
		</scroll>
		<scroll 
						class="foods-wrapper" 
						ref="foodsWrapper"
						:probe-type="probeType" 
						:listen-scroll="listenScroll" 
						@scroll="scroll"
		>
			<ul>
				<li class="food-list food-list-hook" v-for="(item,index) in goods">
					<h1 class="title">
						<span class="name">{{ item.name }}</span>
						<span class="desc">{{ item.description }}</span>
					</h1>
					<ul>
						<li class="food-item border-1px" v-for="food in item.foods">
							<div class="avatar">
								<img width="57" height="57" :src="parseImage(food.image_path)">
							</div>
							<div class="content">
								<div class="header">
									<h2 class="name">{{ food.name }}</h2>
									<div class="attribute" v-if="food.attributes.length">
										<span v-for="attribute in food.attributes" :style="{color: '#'+attribute.icon_color}">{{ attribute.icon_name }}</span>
									</div>
								</div>
								<p class="desc">{{ food.description }}</p>
								<div class="sales">
									<span class="month-sales">月售{{ food.month_sales }}份</span>
									<span class="satisfy-rate">好评率{{ food.satisfy_rate }}%</span>
								</div>
								<div class="price" v-if="food.specifications.length">
									<span class="min-price">
										<span class="money-icon">￥</span>{{minPrice(food)}}
									</span>
									<span class="text">起</span>
								</div>
								<div class="price" v-else>
									<span class="now"><span class="money-icon">￥</span>{{ food.specfoods[0].price }}</span>
									<span class="original"  v-if="food.specfoods[0].original_price">￥{{ food.specfoods[0].original_price }}</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</scroll>
	</div>
</template>

<script type="text/ecmascript-6">
	import Scroll from 'base/scroll/scroll';
	import {getGoods} from 'api/shop';
	import {parseImage} from 'common/js/util';

	export default {
		data () {
			return {
				goods: [],
				probeType: 3,
				listenScroll: true,
				scrollY: 0,
				listHeight: []
			};
		},
		props: {
			shopid: {
				type: String,
				default: ''
			}
		},
		created () {
			this._getGoods();
		},
		computed: {
			currentIndex () {
				let len = this.listHeight.length;
				for (let i = 0; i < len; i++) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i + 1];
					if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i;
					}
				}
				return 0;
			}
		},
		methods: {
			selectMenu (index, event) {
				let foodList = this.$refs.foodsWrapper.$el.querySelectorAll('.food-list-hook');
				let el = foodList[index];
				this.currentIndex = index;
				this.$refs.foodsWrapper.scrollToElement(el, 300);
			},
			scroll (pos) {
				this.scrollY = Math.abs(Math.round(pos.y));
			},
			parseImage (imagePath) {
				if (!imagePath) {
					return;
				}
				return parseImage(imagePath);
			},
			minPrice (food) {
				if (!this.goods) {
					return;
				}
				let ret = [];
				food.specfoods.forEach((item) => {
					ret.push(Number(item.price));
				});
				ret.sort((a, b) => {
					return a - b;
				});
				return ret[0];
			},
			_getGoods () {
				getGoods(this.shopid).then((response) => {
					this.goods = response;
					setTimeout(() => {
						this._calculateHeight();
					}, 20);
				});
			},
			_calculateHeight () {
				let foodList = this.$refs.foodsWrapper.$el.querySelectorAll('.food-list-hook');
				let len = foodList.length;
				let height = 0;
				this.listHeight.push(height);
				for (let i = 0; i < len; i++) {
					height += foodList[i].clientHeight;
					this.listHeight.push(height);
				}
			}
		},
		components: {
			Scroll
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	.goods
		display: flex
		position: absolute
		top: 175px
		bottom: 48px
		width: 100%
		overflow: hidden
		.menu-wrapper
			flex: 0 0 85px
			width: 85px
			background: #f8f8f8
			.menu-item
				position: relative
				padding: 17px 8px
				line-height: 14px
				font-size: 12px
				color: #666
				border-1px(#ededed)
				&.current
					background: #fff
					font-weight: bold
					border-none()
					:after
						content: ""
						display: block
						position: absolute
						top: 0
						left: 0
						bottom: 0
						width: 3px
						background: #3190e8
				&:last-child
					border-none()
		.foods-wrapper
			flex: 1
			.title
				position: relative
				display: flex
				vertical-align: bottom
				padding: 8px 10px
				background-color: #f1f1f1
				.name
					flex: 0 0 auto
					margin-right: 5px
					line-height: 16px
					font-size: 14px
					font-weight: 700
					color: #666
				.desc
					flex: 1
					display: block
					margin-top: 4px
					font-size: 10px
					line-height: 12px
					color: #999
			.food-item
				display: flex
				margin: 15px 0 15px 10px
				padding-right: 10px
				padding-bottom: 15px
				border-1px(#ededed)
				&:last-child
					margin-bottom: 0
					border-none()
				.avatar
					margin-right: 10px
					img
						display: block
						border-radius: 4px
				.content
					flex: 1
					.header
						display: flex
						.name
							flex: 1
							line-height: 16px
							font-size: 14px
							font-weight: 700
						.attribute
							flex: none
							margin-left: 9px
							text-align: right
							span
								display: inline-block
								vertical-align: middle
								margin-right: 3px
								padding: 0 2px
								font-size: 8px
								border: 1px solid currentColor
								border-radius: 10px
								&:last-child
									margin-right: 0
					.desc
						margin: 5px 0
						line-height: 12px
						font-size: 10px
						color: #999
					.sales
						margin: 7px 0
						color: #666
						.month-sales, .satisfy-rate
							display: inline-block
							margin-right: 4px
							font-size: 12px
					.price
						padding-top: 10px
						font-size: 0
						.min-price, .now
							font-size: 16px
							font-weight: 700
							color: #f60
							.money-icon
								font-size: 11px
								font-weight: 400
						.text
							margin-left: 4px
							font-size: 12px
							font-weight: 400
							color: #666
						.original
							margin-left: 2px
							vertical-align: top
							font-size: 12px
							font-weight: 400
							color: #999
							text-decoration: line-through
</style>
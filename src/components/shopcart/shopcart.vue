<template>
	<div class="shopcart-wrapper">
		<div class="shopcart">
			<div class="content">
				<div class="content-left" @click="toggleList">
					<div class="logo-wrapper" ref="logoWrapper">
						<div class="logo" :class="{ highlight: totalCount>0 }">
							<i class="icon-shopping_cart" :class="{ highlight: totalCount>0 }"></i>
						</div>
						<div class="num" v-show="totalCount>0">{{totalCount}}</div>
					</div>
					<div class="price">
						<p class="goods-price">¥{{ totalPrice }}</p>
						<p class="delivery-fee">{{ deliveryPrice }}</p>
					</div>
				</div>
				<div class="content-right">
					<div class="pay" :class="{ enough: selectedShopper.float_minimum_order_amount < totalPrice }">
						{{ payDesc }}
					</div>
				</div>
			</div>
			<transition-group 
												tag="div"
												class="balls-wrapper"
												@before-enter="beforeEnter"
												@enter="enter"
												@after-enter="afterEnter"
			>
				<div class="ball" v-for="(ball,index) in balls" v-show="ball.show" :key="index">
					<div class="inner inner-hook"></div>
				</div>
			</transition-group>
			<transition name="fold">
				<div class="shopcart-list" v-if="listShow">
					<div class="list-header">
						<span class="title">购物车</span>
						<span class="empty" @click="empty">清空</span>
					</div>
					<scroll :data="cartFoodsList" class="list-content">
						<div>
							<ul>
								<li class="food border-1px" v-for="food in cartFoodsList">
									<div class="detail">
										<span class="name">{{ food.name }}</span>
										<p class="desc">
											<span class="spec" v-if="food.spec">{{ food.spec }}</span>
											<span class="attr" v-if="food.attr.length>0" v-for="value in food.attr"> / {{ value }}</span>
										</p>
									</div>
									<div class="price">
										<span>¥{{ food.count * food.price }}</span>
									</div>
									<div class="cartball-wrapper">
										<cartball :food="food"></cartball>
									</div>
								</li>
							</ul>
							<div class="food" v-if="totalPackingFee > 0">
								<div class="detail">餐盒</div>
								<div class="price">{{ totalPackingFee }}</div>
								<div class="cartball-wrapper"></div>
							</div>
						</div>
					</scroll>
				</div>
			</transition>
		</div>
		<transition name="fade">
			<div class="list-mask" v-show="listShow" @click="hideList"></div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
	import Cartball from 'base/cartball/cartball';
	import Scroll from 'base/scroll/scroll';
	import {mapGetters, mapMutations} from 'vuex';

	export default {
		data () {
			return {
				balls: [
					{ show: false },
					{ show: false },
					{ show: false },
					{ show: false },
					{ show: false }
				],
				dropBalls: [],
				cartFoodsList: [],
				fold: true
			};
		},
		computed: {
			// 当前商家的购物车信息
			shopCart () {
				return Object.assign({}, this.cartFoods[this.$route.params.id]);
			},
			// 购物车商品总数量
			totalCount () {
				let num = 0;
				Object.values(this.shopCart).forEach((item) => {
					Object.values(item).forEach((food) => {
						Object.values(food).forEach((data) => {
							num += data.count;
						});
					});
				});
				return num;
			},
			// 购物车商品总价格
			totalPrice () {
				let total = 0;
				Object.values(this.shopCart).forEach((item) => {
					Object.values(item).forEach((food) => {
						if (food) {
							Object.values(food).forEach((data) => {
								total += data.count * (data.price + data.packing_fee);
							});
						}
					});
				});
				return total;
			},
			// 商家配送费
			deliveryPrice () {
				if (!this.selectedShopper.piecewise_agent_fee) {
					return;
				}
				return this.selectedShopper.piecewise_agent_fee.description;
			},
			// 商家起送额度
			payDesc () {
				let minPrice = this.selectedShopper.float_minimum_order_amount;
				if (this.totalPrice === 0 && minPrice !== 0) {
					return `¥${minPrice}起送`;
				} else if (this.totalPrice < minPrice) {
					let diff = minPrice - this.totalPrice;
					return `还差¥${diff}起送`;
				} else {
					return '去结算';
				}
			},
			// 餐盒总费用
			totalPackingFee () {
				let total = 0;
				Object.values(this.shopCart).forEach((item) => {
					Object.values(item).forEach((food) => {
						Object.values(food).forEach((data) => {
							total += data.packing_fee * data.count;
						});
					});
				});
				return total;
			},
			listShow () {
				if (!this.totalCount) {
					this.fold = true;
					return false;
				}
				let show = !this.fold;
				return show;
			},
			...mapGetters([
				'selectedShopper',
				'cartFoods'
			])
		},
		methods: {
			drop (el) {
				let len = this.balls.length;
				for (let i = 0; i < len; i++) {
					if (!this.balls[i].show) {
						this.balls[i].show = true;
						this.balls[i].el = el;
						this.dropBalls.push(this.balls[i]);
						return;
					}
				}
			},
			beforeEnter (el) {
				let count = this.balls.length;
				while (count--) {
					let ball = this.balls[count];
					if (ball.show) {
						let rect = ball.el.getBoundingClientRect();
						let x = rect.left - 29;
						let y = -(window.innerHeight - rect.top - 27);
						this.$refs.logoWrapper.style.display = '';
						this.$refs.logoWrapper.style.animation = '';
						this.$refs.logoWrapper.style.WebkitAnimation = '';
						el.style.WebkitTransform = `translate3d(0, ${y}px, 0)`;
						el.style.transform = `translate3d(0, ${y}px, 0)`;
						let inner = el.querySelectorAll('.inner-hook')[0];
						inner.style.WebkitTransform = `translate3d(${x}px, 0, 0)`;
						inner.style.transform = `translate3d(${x}px, 0, 0)`;
					}
				}
			},
			enter (el, done) {
				/* eslint-disable no-unused-vars */
				let rf = el.offsetHeight;  // 触发浏览器重绘
				this.$nextTick(() => {
					el.style.WebKitTransform = 'translate3d(0, 0, 0)';
					el.style.transform = 'translate3d(0, 0, 0)';
					el.style.transition = 'all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)';
					let inner = el.querySelectorAll('.inner-hook')[0];
					inner.style.WebkitTransform = 'translate3d(0, 0, 0)';
					inner.style.transform = 'translate3d(0, 0, 0)';
					inner.style.transition = 'all .4s linear';
					el.addEventListener('transitionend', done);
				});
			},
			afterEnter (el) {
				let ball = this.dropBalls.shift();
				if (ball) {
					ball.show = false;
					el.style.display = 'none';
					this.$refs.logoWrapper.style.animation = 'scale .4s';
					this.$refs.logoWrapper.style.WebkitAnimation = 'scale .4s';
				}
			},
			toggleList () {
				if (!this.totalCount) {
					return;
				}
				this.fold = !this.fold;
			},
			hideList () {
				this.fold = true;
			},
			empty () {
				this.emptyCartFoods(this.$route.params.id);
			},
			...mapMutations({
				'emptyCartFoods': 'EMPTY_CART_FOODS'
			})
		},
		watch: {
			// 监听购物车商品变化 更新购物车信息
			shopCart (newshopCart) {
				this.cartFoodsList = [];
				Object.values(newshopCart).forEach((item, categoryIndex) => {
					Object.values(item).forEach((food, itemIndex) => {
						Object.values(food).forEach((data) => {
							data = Object.assign({}, data);
							data.shopid = this.$route.params.id;
							data.category_id = Object.keys(newshopCart)[categoryIndex];
							data.item_id = Object.keys(item)[itemIndex];
							this.cartFoodsList.push(data);
						});
					});
				});
			}
		},
		components: {
			Cartball,
			Scroll
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	.shopcart
		position: fixed
		left: 0
		bottom: 0
		width: 100%
		height: 48px
		z-index: 50
		.content
			display: flex
			background: #3d3d3f
			color: #fff
			.content-left
				flex: 1
				.logo-wrapper
					display: inline-block
					position: relative
					top: -10px
					margin: 0 12px
					padding: 5px
					width: 50px
					height: 50px
					box-sizing: border-box
					vertical-align: top
					border-radius: 50%
					background: #4b4b4b
					.logo
						width: 100%
						height: 100%
						border-radius: 50%
						background: #404040
						text-align: center
						&.highlight
							background: #3290e8
						.icon-shopping_cart
							line-height: 40px
							font-size: 26px
							color: #636367
							&.highlight
								color: #fff
					.num
						position: absolute
						top: 0
						right: 0
						height: 16px
						padding: 0 4px
						line-height: 16px
						text-align: center
						font-size: 9px
						border-radius: 16px
						color: #fff
						background: #ff461d
				.price
					display: inline-block
					margin-top: 7px
					.goods-price
						line-height: 22px
						font-size: 18px
					.delivery-fee
						line-height: 12px
						font-size: 12px
						color: #f5f5f5
			.content-right
				flex: 0 0 105px
				width: 105px
				.pay
					height: 48px
					line-height: 48px
					font-size: 15px
					text-align: center
					font-weight: 700
					background: #535356
					&.enough
						background: #4cd964;
		.balls-wrapper
			.ball
				position: absolute
				left: 29px
				// top: 6px
				bottom: 27px
				z-index: 100
				.inner
					width: 16px
					height: 16px
					border-radius: 50%
					background: #3290e8
		.shopcart-list
			position: absolute
			top: 0
			left: 0
			width: 100%
			z-index: -1
			transform: translate3d(0, -100%, 0)
			&.fold-enter, &.fold-leave-active
				transform: translate3d(0, 0, 0)
			&.fold-enter-active, &.fold-leave-active
				transition: all .4s
			.list-header
				height: 40px
				line-height: 40px
				padding: 0 12px
				border-bottom: 1px solid #ddd
				background: #eceff1
				.title
					padding-left: 5px
					font-size: 16px
					border-left: 3px solid #3190e8
					color: #666
				.empty
					float: right
					font-size: 13px
					color: #666
			.list-content
				padding-left: 12px
				max-height: 300px
				overflow: hidden
				background: #fff
				.food
					position: relative
					display: flex
					align-items: center
					min-height: 40px
					padding: 8px 0
					border-1px(#eee)
					.detail
						flex: 6
						.name
							display: inline-block
							vertical-align: middle
							max-width: 175px
							font-size: 16px
							line-height: 20px
							no-wrap()
						.desc
							line-height: 12px
							font-size: 10px
							color: #999
							no-wrap()
					.price
						flex: 3
						font-size: 16px
						font-weight: 700
						text-align: right
						color: #f60
					.cartball-wrapper
						flex: 3
						margin-right: 12px
						margin-bottom: 6px
						text-align: right
	.list-mask
		position: fixed;
		top: 0
		left: 0
		width: 100%
		height: 100%
		z-index: 40
		background: rgba(0, 0, 0, 0.4)
		backdrop-filter: blur(10px)
		&.fade-enter, &.fade-leave-active
			opacity: 0
		&.fade-enter-active, &.fade-leave-active
			transition: all .4s
	@keyframes scale
		0%
			transform: scale(1.2)
		25%
			transform: scale(0.8)
		50%
			transform: scale(1.1)
		75%
			transform: scale(0.9)
		100%
			transform: scale(1)
</style>

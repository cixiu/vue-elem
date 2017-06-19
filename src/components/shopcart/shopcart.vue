<template>
	<div class="shopcart-wrapper">
		<div class="shopcart">
			<div class="content">
				<div class="content-left">
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
					<div class="pay" :class="{ enough: selectedShopper.float_minimum_order_amount <= totalPrice }">
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
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import {mapGetters} from 'vuex';

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
				dropBalls: []
			};
		},
		props: {
			selectFoods: {
				type: Array,
				default: []
			}
		},
		computed: {
			totalCount () {
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				});
				return count;
			},
			totalPrice () {
				let total = 0;
				this.selectFoods.forEach((food) => {
					if (food.activity && food.activity.is_price_changed) {
						food.price = food.specfoods[0].original_price;
					} else {
						food.price = food.specfoods[0].price;
					}
					total += food.count * food.price;
				});
				return total;
			},
			deliveryPrice () {
				if (!this.selectedShopper.piecewise_agent_fee) {
					return;
				}
				return this.selectedShopper.piecewise_agent_fee.description;
			},
			payDesc () {
				let minPrice = this.selectedShopper.float_minimum_order_amount;
				if (this.totalPrice === 0) {
					return `¥${minPrice}起送`;
				} else if (this.totalPrice < minPrice) {
					let diff = minPrice - this.totalPrice;
					return `还差¥${diff}起送`;
				} else {
					return '去结算';
				}
			},
			...mapGetters([
				'selectedShopper'
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
						this.$refs.logoWrapper.style.animation = '';
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
				}
			}
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
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

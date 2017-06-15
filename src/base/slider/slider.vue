<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot></slot>
		</div>
		<div class="dots">
			<span class="dot" v-for="(dot,index) in dots" :class="{ active: currentPageIndex === index }"></span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';

	export default {
		data () {
			return {
				dots: [],
				currentPageIndex: 0
			};
		},
		props: {
			loop: {
				type: Boolean,
				default: true
			}
		},
		mounted () {
			setTimeout(() => {
				this._setSliderWidth();
				this._initDots();
				this._initSlider();
			}, 20);
			window.addEventListener('resize', () => {
				if (!this.slider) {
					return;
				}
				this._setSliderWidth(true);
				this.slider.refresh();
			});
		},
		methods: {
			_setSliderWidth (isResize) {
				this.children = this.$refs.sliderGroup.children;
				let width = 0;
				let sliderWidth = this.$refs.slider.clientWidth;
				for (let i = 0; i < this.children.length; i++) {
					let child = this.children[i];
					child.style.width = sliderWidth + 'px';
					width += sliderWidth;
				};
				if (this.loop && !isResize) {
					width += 2 * sliderWidth;
				}
				this.$refs.sliderGroup.style.width = width + 'px';
			},
			_initSlider () {
				this.slider = new BScroll(this.$refs.slider, {
					scrollX: true,
					scrollY: false,
					momentum: false,
					snap: true,
					snapLoop: this.loop,
					snapThreshold: 0.3,
					snapSpeed: 400
				});
				this.slider.on('scrollEnd', () => {
					let pageIndex = this.slider.getCurrentPage().pageX;
					if (this.loop) {
						pageIndex -= 1;
					}
					this.currentPageIndex = pageIndex;
				});
			},
			_initDots () {
				this.dots = new Array(this.children.length);
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.slider
		min-height: 1px
		height: 100%
		.slider-group
			position: relative
			overflow: hidden
			white-space: nowrap
		.dots
			position: absolute
			right: 0
			left: 0
			bottom: 6px
			text-align: center
			font-size: 0
			.dot
				display: inline-block
				margin: 0 4px
				width: 4px
				height: 4px
				border-radius: 50%
				background: #000
				opacity: 0.2
				&.active
					opacity: 0.6
</style>

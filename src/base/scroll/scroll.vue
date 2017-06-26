<template>
	<div class="scroll" ref="wrapper">
		<slot></slot>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';

	export default {
		props: {
			click: {
				type: Boolean,
				default: true
			},
			probeType: {
				type: Number,
				default: 1
			},
			data: {
				type: Array,
				default: null
			},
			listenScroll: {
				type: Boolean,
				default: false
			},
			pullup: {
				type: Boolean,
				default: false
			},
			beforeScroll: {
				type: Boolean,
				default: false
			},
			bounce: {
				type: Boolean,
				default: false
			},
			scrollEnd: {
				type: Boolean,
				default: false
			},
			scrollX: {
				type: Boolean,
				default: true
			},
			scrollY: {
				type: Boolean,
				default: true
			}
		},
		mounted () {
			setTimeout(() => {
				this._initScroll();
			}, 20);
		},
		methods: {
			_initScroll () {
				if (!this.$refs.wrapper) {
					return;
				}
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: this.probeType,
					click: this.click,
					bounce: this.bounce,
					scrollX: this.scrollX,
					scrollY: this.scrollY
				});
				// 如果要监听滚动
				if (this.listenScroll) {
					let _this = this;
					this.scroll.on('scroll', (pos) => {
						_this.$emit('scroll', pos);
					});
				}
				// 下拉加载更多
				if (this.pullup) {
					this.scroll.on('scrollEnd', () => {
						if (this.scroll.y <= this.scroll.maxScrollY + 50) {
							this.$emit('scrollToEnd');
						}
					});
				};
				if (this.beforeScroll) {
					this.scroll.on('beforeScrollStart', () => {
						this.$emit('beforeScroll');
					});
				}
				if (this.scrollEnd) {
					this.scroll.on('scrollEnd', () => {
						this.$emit('scrollToEnd');
					});
				}
			},
			refresh () {
				this.scroll && this.scroll.refresh();
			},
			scrollToElement () {
				this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
			},
			scrollTo () {
				this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
			},
			disable () {
				this.scroll && this.scroll.disable();
			}
		},
		watch: {
			data () {
				setTimeout(() => {
					this.refresh();
				}, 20);
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	
</style>

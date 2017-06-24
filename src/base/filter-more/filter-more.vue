<template>
	<div class="more">
		<div class="options">
			<div class="delivery-mode">
				<h1 class="title">配送方式</h1>
				<div class="mode">
					<span class="text" v-for="mode in deliveryMode">
						<span class="icon" :style="{color: '#'+mode.color}">蜂</span>
						<span class="name">{{ mode.text }}</span>
					</span>
				</div>
			</div>
			<div class="attributes">
				<h1 class="title">商家属性(可多选)</h1>
				<ul class="mode">
					<li class="text" :class="{ 'active': activeIndex[index] }" v-for="(attr,index) in attributes" @click="selectItem(attr,index)">
						<span class="icon" :style="{color: '#'+attr.icon_color}" v-show="!activeIndex[index]">{{ attr.icon_name }}</span>
						<span class="icon-hook" v-show="activeIndex[index]"></span>
						<span class="name">{{ attr.name }}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="confirm-btn">
			<span class="empty">清空</span>
			<span class="confirm">确定</span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import {getDeliveryMode, getAttributes} from 'api/filter';

	export default {
		data () {
			return {
				deliveryMode: [],
				attributes: [],
				selected: false,
				activeIndex: []
			};
		},
		created () {
			this._getDeliveryMode();
			this._getAttributes();
			console.log(this.activeIndex);
		},
		methods: {
			selectItem (item, index) {
				this.activeIndex[index] = !this.activeIndex[index];
				console.log(this.activeIndex);
			},
			_getDeliveryMode () {
				getDeliveryMode().then((response) => {
					this.deliveryMode = response;
				});
			},
			_getAttributes () {
				getAttributes().then((response) => {
					this.attributes = response;
					this.activeIndex.length = response.length;
					this.activeIndex.fill(false);
				});
			}
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.more
		flex: 1
		overflow: auto
		.delivery-mode, .attributes
			margin: 10px 0
			padding: 0 15px
			overflow: hidden
			font-size: 0
			.title
				margin-bottom: 8px
				line-height: 15px
				font-size: 12px
				font-weight: normal
			.text
				display: inline-block
				box-sizing: border-box
				width: 32%
				margin-right: 1%
				margin-bottom: 8px
				padding: 6px 0
				line-height: 22px
				font-size: 12px
				border: 1px solid #ddd
				border-radius: 2px				
			.mode .icon
				display: inline-block
				vertical-align: middle
				box-sizing: border-box
				width: 18px
				height: 18px
				margin: 0 5px 0 8px
				line-height: 18px
				font-size: 12px
				border-width: 1px
				border-style: solid
				border-radius: 2px
				text-align: center
			.name
				vertical-align: middle	
		.confirm-btn
			box-sizing: border-box
			display: flex
			align-items: center
			height: 55px
			padding: 0 5px
			border-top: 1px solid #ddd
			background: #fafafa
			span
				display: inline-block
				flex: 1
				line-height: 40px
				font-size: 18px
				text-align: center
				border-radius: 5px
				&.empty
					margin-right: 5px
					border: 1px solid #ddd
					background: #fff
				&.confirm
					border: 1px solid #56d176
					background: #56d176
					color: #fff
</style>

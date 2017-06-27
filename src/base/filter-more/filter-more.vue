<template>
	<div class="more">
		<div class="options">
			<div class="delivery-mode">
				<h1 class="title">配送方式</h1>
				<div class="mode">
					<span class="text" :class="{active: modeIndex[index].flag}" v-for="(mode,index) in deliveryMode" @click="selectMode(mode, index)">
						<span class="icon" :style="{color: '#'+mode.color}" v-show="!modeIndex[index].flag">蜂</span>
						<span class="icon icon-hook" v-show="modeIndex[index].flag"></span>
						<span class="name">{{ mode.text }}</span>
					</span>
				</div>
			</div>
			<div class="attributes">
				<h1 class="title">商家属性(可多选)</h1>
				<ul class="mode">
					<li class="text" :class="{active: activeIndex[index].flag}" v-for="(attr,index) in attributes" @click="selectItem(attr,index)">
						<span class="icon" :style="{color: '#'+attr.icon_color}" v-show="!activeIndex[index].flag">{{ attr.icon_name }}</span>
						<span class="icon icon-hook" v-show="activeIndex[index].flag"></span>
						<span class="name">{{ attr.name }}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="confirm-btn">
			<span class="empty" @click="empty">清空</span>
			<span class="confirm" @click="select">确定<span class="count" v-if="totalCount">({{ totalCount }})</span></span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import {getDeliveryMode, getAttributes} from 'api/filter';
	import {mapGetters} from 'vuex';

	export default {
		data () {
			return {
				deliveryMode: [],
				attributes: [],
				selected: false,
				modeIndex: [{flag: 0}],
				activeIndex: [{flag: 0}, {flag: 0}, {flag: 0}, {flag: 0}, {flag: 0}, {flag: 0}, {flag: 0}, {flag: 0}, {flag: 0}, {flag: 0}],
				selectedItem: {}
			};
		},
		created () {
			this._getDeliveryMode();
			this._getAttributes();
		},
		computed: {
			totalCount () {
				let count = null;
				this.modeIndex.forEach((item) => {
					count += Number(item.flag);
				});
				this.activeIndex.forEach((item) => {
					count += Number(item.flag);
				});
				return count;
			},
			...mapGetters([
				'latitude',
				'longitude'
			])
		},
		methods: {
			selectMode (mode, index) {
				this.modeIndex[index].flag = !this.modeIndex[index].flag;
			},
			selectItem (item, index) {
				this.activeIndex[index].flag = !this.activeIndex[index].flag;
			},
			// 选择要筛选的条件
			select () {
				let support_ids = [];
				this.modeIndex.forEach((item, index) => {
					if (item.flag) {
						this.selectedItem.delivery_mode = this.deliveryMode[index].id;
					} else {
						this.selectedItem.delivery_mode = null;
					}
				});
				this.activeIndex.forEach((item, index) => {
					if (item.flag) {
						support_ids.push(this.attributes[index].id);
					}
				});
				this.selectedItem.support_ids = support_ids;
				if (support_ids.length || this.selectedItem.delivery_mode) {
					this.selectedItem.hasSelected = true;
				} else {
					this.selectedItem.hasSelected = false;
				}
				this.$emit('select', this.selectedItem);
			},
			// 清空筛选的条件
			empty () {
				this.selectedItem = {};
				this.modeIndex.forEach((item) => {
					item.flag = 0;
					this.selectedItem.delivery_mode = null;
				});
				this.activeIndex.forEach((item) => {
					item.flag = 0;
				});
				this.selectedItem = Object.assign({}, this.selectedItem);
			},
			_getDeliveryMode () {
				getDeliveryMode(this.latitude, this.longitude).then((response) => {
					this.deliveryMode = response;
				});
			},
			_getAttributes () {
				getAttributes(this.latitude, this.longitude).then((response) => {
					this.attributes = response;
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
				&.active
					border-color: #a2d2ff
					color: #3190e8
					background: #edf5ff
					.icon
						border: none				
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

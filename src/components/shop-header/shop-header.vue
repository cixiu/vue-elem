<template>
	<div class="header">
		<div class="back">
			<span class="icon-arrow_back"></span>
		</div>
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="avatar">
			</div>
			<div class="content">
				<div class="title">
					<span class="name">{{ shopper.name }}</span>
				</div>
				<div class="description">
					<span v-if="shopper.delivery_mode">蜂鸟专送</span>
					<span v-else>商家配送</span>
					<span>{{ shopper.order_lead_time }}分钟送达</span>
					<span>配送费￥{{ shopper.float_delivery_fee }}</span>
					<span class="icon-keyboard_arrow"></span>
				</div>
				<div class="bulletin-wrapper">
					<span class="bulletin-title">公告:</span>
					<span class="bulletin-text">{{ shopper.promotion_info }}</span>
				</div>
			</div>
		</div>
		<div v-if="shopper.activities" class="activities-wrapper">
			<div class="activities-content">
				<span class="icon">{{ shopper.activities[0].icon_name }}</span>
				<span class="text">{{ shopper.activities[0].description }}</span>
			</div>
			<div class="activities-count">{{ shopper.activities.length }}个活动</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import {getShop} from 'api/shop';
	import {parseImage} from 'common/js/util';

	export default {
		data () {
			return {
				shopper: {},
				avatar: ''
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
		methods: {
			_getShop () {
				getShop(this.shopid).then((response) => {
					this.shopper = response;
					this.avatar = parseImage(this.shopper.image_path);
					console.log(this.shopper);
				});
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	
</style>

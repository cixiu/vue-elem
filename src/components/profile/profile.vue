<template>
	<div class="profile">
		<div class="header">
			<m-title :title-name="targetName"></m-title>
		</div>
		<div class="login" @click="goLoginPage">
			<div class="avatar">
				<img width="60" height="60" src="../../common/images/avatar.jpeg">
				<img width="60" v-if="userInfo && userInfo.avatar" height="60" :src="userInfo.avatar">
			</div>
			<div class="text">
				<p class="title">{{ userInfo ? userInfo.username : '登录/注册' }}</p>
				<p class="desc">
					<i class="icon icon-phone"></i>
					<span class="no-login-status">{{ userInfo ? modifyMobile : '登陆后享受更多特权' }}</span>
				</p>
			</div>
			<span class="icon icon-keyboard_arrow_right"></span>
		</div>
		<div class="pack border-1px">
			<a href="#">
				<p class="benefit" v-if="userInfo">
					<span class="gift">{{ userInfo.gift_amount }}</span>
					<span class="unit">个</span>
				</p>
				<p class="benefit" v-else>
					<i class="icon icon-discount"></i>
				</p>
				<p class="text">优惠</p>
			</a>
			<a href="#">
				<p class="points" v-if="userInfo">
					<span class="point">{{ userInfo.point }}</span>
					<span class="unit">分</span>
				</p>
				<p class="points" v-else>
					<i class="icon icon-points"></i>
				</p>
				<p class="text">积分</p>
			</a>
		</div>
		<split></split>
		<div class="profile-page">
			<a class="page-item" :href="info.path" v-for="info in profilePage.slice(0, 3)">
				<i class="icon" :class="[info.icon]"></i>
				<p class="desc border-1px">
					<span class="text">{{ info.text }}</span>
					<i class="icon-keyboard_arrow_right"></i>
				</p>
			</a>
		</div>
		<split></split>
		<div class="profile-page">
			<a class="page-item" :href="info.path" v-for="info in profilePage.slice(3)">
				<i class="icon" :class="[info.icon]"></i>
				<p class="desc border-1px">
					<span class="text">{{ info.text }}</span>
					<i class="icon-keyboard_arrow_right"></i>
				</p>
			</a>
		</div>
		<split></split>
		<router-view></router-view>
		<m-footer></m-footer>
	</div>
</template>

<script type="text/ecmascript-6">
	import MTitle from 'base/m-title/m-title';
	import MFooter from 'components/m-footer/m-footer';
	import Split from 'base/split/split';
	import {mapGetters} from 'vuex';
	import {getCurrentUser} from 'api/profile';

	export default {
		data () {
			return {
				targetName: '我的',
				profilePage: [
					{text: '我的订单', path: '/order', icon: 'icon-my-order'},
					{text: '积分商城', path: 'https://home.m.duiba.com.cn/chome/index', icon: 'icon-points-mall'},
					{text: '饿了么会员卡', path: '/vipcard', icon: 'icon-vip'},
					{text: '服务中心', path: '/service', icon: 'icon-service-center'},
					{text: '下载饿了么APP', path: 'https://h.ele.me/dapp', icon: 'icon-elem'}
				]
			};
		},
		created () {
			getCurrentUser();
		},
		computed: {
			modifyMobile () {
				let re = /(\d{3})\d{4}(\d{4})/;
				return this.userInfo.mobile.replace(re, '$1****$2');
			},
			...mapGetters([
				'userInfo'
			])
		},
		methods: {
			goLoginPage () {
				if (!this.userInfo) {
					this.$router.push('/login');
				} else {
					this.$router.push('/profile/info');
				}
			}
		},
		components: {
			MTitle,
			MFooter,
			Split
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	.header
		position: relative
		width: 100%
		z-index: 99
	.login
		display: flex
		align-items: center
		padding: 25px 15px
		color: #fff
		background-image: linear-gradient(90deg, #0af, #0085ff)
		.avatar
			width: 60px
			height: 60px
			border-radius: 50%
			background-color: #fff
		.text
			flex: 1
			margin-left: 18px
			.title
				margin-bottom: 8px
				line-height: 26px
				font-size: 22px
				no-wrap()
			.desc
				font-size: 0
				no-wrap()
				.icon-phone
					display: inline-block
					vertical-align: middle
					margin-right: 2px
					font-size: 16px
				.no-login-status
					display: inline-block
					vertical-align: middle
					line-height: 16px
					font-size: 14px
		.icon-keyboard_arrow_right
			margin-right: -5px
			font-size: 20px
	.pack
		display: table
		box-sizing: border-box
		width: 100%
		height: 84px
		background-color: #fff
		border-1px(#ddd)
		a
			display: table-cell
			vertical-align: middle
			text-align: center
			font-size: 0
			&:not(:last-child)
				border-right: 1px solid #ddd
			.gift, .point
				padding: 17px 0 11px
				font-size: 26px
				font-weight: 700
			.gift
				color: #ff5f3e
			.point
				color: #6ac20b
			.unit
				font-size: 12px
			.icon
				display: inline-block
				vertical-align: middle
				width: 26px
				height: 26px
				font-size: 26px
			.text
				margin-top: 5px
				line-height: 14px
				font-size: 12px
				font-weight: 500
				color: #666
	.profile-page
		background-color: #fff
		.page-item
			display: flex
			align-items: center
			padding-left: 25px
			&:last-child .desc
				border-none()
			.icon
				display: inline-block
				vertical-align: middle
				margin-top: -3px
				margin-left: -10px
				margin-right: 10px
				font-size: 16px
				&.icon-vip
					margin-left: -12px
					transform: scale(0.8)
				&.icon-elem
					color: #3cabff
			.desc
				display: flex
				justify-content: space-between
				width: 100%
				padding: 12px 10px 12px 0
				color: #333
				border-1px(#ddd)
				.text
					font-size: 17px
				.icon-keyboard_arrow_right
					margin-right: -4px
					font-size: 16px
					color: #999
</style>

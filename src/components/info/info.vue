<template>
	<div class="info">
		<div class="header">
			<m-title :title-name="targetName"></m-title>
		</div>
		<div class="content">
			<ul class="info-item">
				<li class="item set-avatar border-1px" @click="remind">
					<span class="text">头像</span>
					<div class="avatar set">
						<input class="file" type="file">
						<img width="45" height="45" v-if="userInfo.avatar" :src="userInfo.avatar">
						<img width="45" height="45" v-else src="../../common/images/avatar.jpeg">
						<i class="icon icon-keyboard_arrow_right"></i>
					</div>
				</li>
				<li class="item border-1px">
					<span class="text">用户名</span>
					<span class="username set">{{ userInfo.username }}</span>
				</li>
			</ul>
			<h1 class="name">帐号绑定</h1>
			<ul class="info-item">
				<li class="item border-1px" @click="remind">
					<span class="text text-icon">
						<span class="icon-wrapper"><i class="icon-phone"></i></span>
						手机
					</span>
					<span class="mobile set">{{ modifyMobile }}<i class="icon icon-keyboard_arrow_right"></i></span>
				</li>
			</ul>
			<h1 class="name">安全设置</h1>
			<ul class="info-item">
				<li class="item border-1px" @click="remind">
					<span class="text">登录密码</span>
					<span class="mobile set">未设置<i class="icon icon-keyboard_arrow_right"></i></span>
				</li>
			</ul>
			<button class="quit-login" @click="quit">退出登录</button>
		</div>
		<transition name="fade">
			<div class="tips-alert-wrapper" v-show="isError">
				<tips-alert :tips="alertText"></tips-alert>
			</div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
	import MTitle from 'base/m-title/m-title';
	import TipsAlert from 'base/tips-alert/tips-alert';
	import {mapGetters, mapMutations} from 'vuex';

	export default {
		data () {
			return {
				targetName: '账户信息',
				isError: false,
				alertText: ''
			};
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
			remind () {
				this.alertText = '暂时未开发次操作，请去官网进行相关操作';
				this.isError = true;
				setTimeout(() => {
					this.isError = false;
				}, 2000);
			},
			quit () {
				this.emptyUserInfo();
				this.$router.push('/profile');
			},
			...mapMutations({
				'emptyUserInfo': 'EMPTY_USERINFO'
			})
		},
		components: {
			MTitle,
			TipsAlert
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	.info
		position: fixed
		top: 0
		right: 0
		bottom: 0
		left: 0
		z-index: 10000
		background-color: #f5f5f5
		.info-item
			width: 100%
			margin-top: 15px
			font-size: 16px
			background-color: #fff
			.item
				display: flex
				align-items: center
				justify-content: space-between
				padding: 15px 14px
				border-1px(#ddd)
				&.set-avatar
					position: relative
				.text
					line-height: 18px
					font-weight: 700
					.icon-wrapper
						display: inline-block
						vertical-align: middle
						margin-right: 5px
						border-radius: 5px
						background-color: #0096ff
						.icon-phone
							display: inline-block
							padding: 4px 2px
							color: #fff
				.set
					display: flex
					align-items: center
					font-weight: 700
					color: #999
					.file
						display: block
						position: absolute
						top: 0
						left: 0
						opacity: 0
						width: 100%
						height: 100%
					.icon-keyboard_arrow_right
						font-size: 18px
						color: #999
		.name
			margin: 14px 0 0 15px
			font-size: 18px
			line-height: 22px
			color: #666
		.quit-login
			display: block
			width: 90%
			margin: 15px auto
			padding: 11px 0
			border-radius: 3px
			line-height: 23px
			font-size: 17px
			font-weight: 800
			color: #fff
			background-color: #ff5339
			text-align: center
		.tips-alert-wrapper
			position: fixed
			left: 0
			bottom: 100px
			z-index: 50
			width: 100%
			&.fade-enter, &.fade-leave-active
				opacity: 0
			&.fade-enter-active, &.fade-leave-active
				transition: all 0.8s
</style>

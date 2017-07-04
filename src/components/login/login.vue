<template>
	<div class="login">
		<div class="header">
			<m-title :title-name="targetName"></m-title>
			<span class="LoginWay" @click="CheckLoginWay" v-show="loginWay">密码登录</span>
			<span class="LoginWay" @click="CheckLoginWay" v-show="!loginWay">短信登录</span>
		</div>
		<div class="login-wrapper" v-if="loginWay">
			<form class="login-action">
				<div class="login-input">
					<input type="tel" maxlength="11" name="mobileNumber" v-model="mobileNumber" placeholder="手机号">
					<button class="verify-btn" :disabled="!verifyMovileNumber" @click.prevent="_getVerifyCode" v-if="!Countdown">{{ verifyBtnText }}</button>
					<button class="verify-btn" :disabled="verifyMovileNumber" v-if="Countdown">已发送({{ Countdown }}s)</button>
				</div>
				<div class="login-input">
					<input type="tel" maxlength="8" name="verifyCode" v-model="code" placeholder="验证码">
				</div>
				<div class="mask-input" v-if="frequentOperation">
					<div class="login-input">
						<input type="text" v-model="captcha_code" maxlength="6" placeholder="图形验证码">
						<img width="105" height="39" :src="captcha_code_img" @click.prevent="_getCaptchasCode">
					</div>
					<div class="confirm-btn">
						<div class="confirm-btn-left" @click="cancel">取消</div>
						<div class="confirm-btn-right" @click="confirm">确定</div>
					</div>
				</div>
			</form>
			<div class="tips">
				温馨提示：未注册饿了么帐号的手机号，登录时将自动注册，且代表您已同意
				<a href="//h5.ele.me/service/agreement/" target="_blank">《用户服务协议》</a>
			</div>
			<button class="login-btn" @click="loginIn">登录</button>
		</div>
		<div class="login-wrapper" v-else>
			<form class="login-action">
				<div class="login-input">
					<input type="text" v-model="username" placeholder="手机/邮箱/用户名">
				</div>
				<div class="login-input">
					<input type="password" v-model="password" placeholder="密码">
				</div>
				<div class="login-input" v-if="passwordError">
					<input type="text" v-model="captcha_code" maxlength="6" placeholder="验证码">
					<div class="captchaCodeImage">
						<img width="105" height="39" :src="captcha_code_img">
						<div class="change" @click.prevent="_getCaptchasCode">
							<p>看不清</p>
							<span>换一张</span>
						</div>
					</div>
				</div>
			</form>
			<button class="login-btn" @click="passwordLogin">登录</button>
		</div>
		<div class="about-us">
			<span class="text">关于我们</span>
		</div>
		<transition name="fade">
			<div class="list-mask" v-show="frequentOperation"></div>
		</transition>
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
	import {getVerifyCode, getLoginIn, getpasswordLoginIn, getCaptchasCode} from 'api/profile';
	import {mapMutations} from 'vuex';

	export default {
		data () {
			return {
				targetName: '登录',
				verifyBtnText: '获取验证码',
				mobileNumber: null,
				code: null,
				captcha_code: '',
				captcha_code_hash: null,
				captcha_code_img: null,
				validate_token: '',
				Countdown: 0,
				isError: false,
				alertText: '',
				loginWay: true,
				username: '',
				password: '',
				passwordError: false,
				frequentOperation: false,
				userInfo: {}
			};
		},
		computed: {
			verifyMovileNumber () {
				let re = /^1\d{10}$/;
				return re.test(this.mobileNumber);
			}
		},
		methods: {
			CheckLoginWay () {
				this.loginWay = !this.loginWay;
				if (this.targetName === '登录') {
					this.targetName = '密码登录';
				} else {
					this.targetName = '登录';
				}
			},
			_getVerifyCode () {
				getVerifyCode(this.mobileNumber, this.captcha_code).then((response) => {
					this.frequentOperation = false;
					this.validate_token = response.validate_token;
					this.Countdown = 30;
					this.timer = setInterval(() => {
						this.Countdown--;
						if (this.Countdown === 0) {
							this.verifyBtnText = '重新获取';
							clearInterval(this.timer);
						}
					}, 1000);
				}).catch((err) => {
					this.alertText = err.message;
					this.isError = true;
					setTimeout(() => {
						this.isError = false;
					}, 3000);
					this.frequentOperation = true;
					this.captcha_code = '';
					this._getCaptchasCode();
				});
			},
			loginIn () {
				if (!this.mobileNumber) {
					this.alertText = '请填写手机号码';
				} else if (!this.validate_token) {
					this.alertText = '请先获取验证码';
				} else if (!this.code) {
					this.alertText = '请填写验证码';
				} else {
					getLoginIn(this.code, this.mobileNumber, this.validate_token).then((response) => {
						this.userInfo = response;
						this.setUserInfo(this.userInfo);
						this.$router.push('/profile');
						return;
					}).catch((err) => {
						this.alertText = err.message;
						this.alertError();
						return;
					});
				}
				if (!this.mobileNumber || !this.validate_token || !this.code) {
					this.alertError();
				}
			},
			passwordLogin () {
				if (!this.username) {
					this.alertText = '手机/邮箱/用户名不能为空';
				} else if (!this.password) {
					this.alertText = '密码不能为空';
				} else if (this.passwordError && !this.captcha_code) {
					this.alertText = '请填写验证码';
				} else {
					getpasswordLoginIn(this.username, this.password, this.captcha_code).then((response) => {
						this.userInfo = response;
						this.setUserInfo(this.userInfo);
						this.$router.push('/profile');
						return;
					}).catch((err) => {
						this.captcha_code = '';
						this.passwordError = true;
						this._getCaptchasCode();
						this.alertText = err.message;
						this.alertError();
					});
				}
				if (!this.username || !this.password || (this.passwordError && !this.captcha_code)) {
					this.alertError();
				}
			},
			alertError () {
				clearTimeout(this.timer);
				this.isError = true;
				this.timer = setTimeout(() => {
					this.isError = false;
				}, 2000);
			},
			cancel () {
			this.frequentOperation = false;
			},
			confirm () {
				if (!this.captcha_code) {
					this.alertText = '请先输入图形验证码';
					this.alertError();
					return;
				}
				this._getVerifyCode();
			},
			_getCaptchasCode () {
				getCaptchasCode().then((response) => {
					this.captcha_code_img = `https://mainsite-restapi.ele.me/v1/captchas/${response.code}`;
				});
			},
			...mapMutations({
				'setUserInfo': 'SET_USERINFO'
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

	.header
		position: relative
		.LoginWay
			position: absolute
			top: 13px
			right: 0
			padding: 0 15px
			line-height: 18px
			font-size: 15px
			color: #fff
	.login-wrapper
		position: relative
		margin-top: 15px
		.login-action
			border-top: 1px solid #ddd
			.login-input
				display: flex
				align-items: center
				justify-content: space-between
				height: 44px
				padding: 0 16px
				background: #fff
				border-1px(#ddd)
				input
					flex: 1
					height: 20px
					padding: 5px 0
					line-height: 20px
					font-size: 15px
				.verify-btn
					width: 100px
					height: 30px
					line-height: 30px
					font-size: 14px
					border-radius: 3px
					color: #fff
					background-color: #2395ff
					text-align: center
					&[disabled]
						background-color: #ccc
				.captchaCodeImage
					display: flex
					align-items: center
					.change
						margin-left: 16px
						line-height: 18px
						font-size: 12px
						color: #666
						white-space: nowrap
						span
							color: #2395ff
			.mask-input
				position: fixed
				top: 50%
				left: 50%
				z-index: 50
				transform: translate3d(-50%, -50%, 0)
				width: 80%
				background-color: #fff
				.confirm-btn
					display: flex
					align-items: center
					font-size: 14px
					.confirm-btn-left
						flex: 1
						padding: 15px 0
						text-align: center
						border-right: 1px solid #ddd
					.confirm-btn-right
						flex: 1
						padding: 15px 0
						text-align: center
		.tips
			margin: 9px 15px -10px 15px
			line-height: 16px
			font-size: 12px
			color: #999
			a
				color: #2395ff
		.login-btn
			display: block
			width: 345px
			height: 44px
			margin: 20px auto 0
			line-height: 22px
			font-size: 16px
			border-radius: 5px
			color: #fff
			background-color: #00d762
			text-align: center
	.about-us
		display: flex
		justify-content: center
		margin: 20px 0
		.text
			padding: 0 5px
			line-height: 22px
			font-size: 12px
			color: #999
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
	.list-mask
		position: fixed;
		top: 0
		left: 0
		width: 100%
		height: 100%
		z-index: 40
		background: rgba(0, 0, 0, 0.2)
		backdrop-filter: blur(10px)
		&.fade-enter, &.fade-leave-active
			opacity: 0
		&.fade-enter-active, &.fade-leave-active
			transition: all .4s
</style>

<template>
	<div class="service">
		<transition name="hotQuestiones-slide">
			<div class="hotQuestiones" v-show="!showFlag">
				<div class="header">
					<m-title :title-name="targetName" :no-router="true" @goback="goback"></m-title>
				</div>
				<div class="service-header border-1px">
					<a class="group">
						<i class="icon icon-dialog"></i>
						<p class="text">在线客服</p>
					</a>
					<a class="group">
						<i class="icon icon-phone-old"></i>
						<p class="text">客服热线</p>
					</a>
				</div>
				<dl class="service-list">
					<dt class="title border-1px">热门问题</dt>
					<dd class="question border-1px" v-for="question in hotQuestiones" @click="showDetial(question)">
						<a :href="question.tag">
							{{ question.question }}
							<i class="icon icon-keyboard_arrow_right"></i>
						</a>
					</dd>
				</dl>
			</div>
			</transition>
			<transition name="detail-slide">
			<div class="detail" v-show="showFlag">
				<div class="header">
					<m-title :title-name="questionName" :no-router="true" @goback="goback"></m-title>
				</div>
				<div class="markdown" v-html="questionDetail"></div>
			</div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
	import MTitle from 'base/m-title/m-title';
	import {getQuestion} from 'api/service';
	import Showdown from 'showdown';

	export default {
		data () {
			return {
				targetName: '服务中心',
				questionName: '',
				hotQuestiones: [],
				showFlag: false,
				questionDetail: null
			};
		},
		created () {
			this._getQuestion();
		},
		methods: {
			_getQuestion () {
				getQuestion().then((response) => {
					this.hotQuestiones = this.normalize(response);
				});
			},
			normalize (obj) {
				let ret = [];
				let list = Object.keys(obj);
				list.forEach((caption, index) => {
					if (caption.indexOf('Caption') !== -1) {
						if (obj[caption].indexOf('问题') !== -1) {
							ret.push({
								tag: `#/service/#${caption.substring(0, caption.indexOf('Caption'))}`,
								question: obj[caption],
								detail: obj[list[index + 1]]
							});
						}
					}
				});
				return ret;
			},
			showDetial (item) {
				this.showFlag = true;
				this.questionName = item.question;
				let converter = new Showdown.Converter();
				this.questionDetail = converter.makeHtml(item.detail);
			},
			goback () {
				if (this.showFlag) {
					this.showFlag = false;
					this.$router.push('/service');
				} else {
					this.$router.push('/profile');
				}
			}
		},
		components: {
			MTitle
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
	
	body, html
		background: #fff
	.hotQuestiones
		position: absolute
		width: 100%
		&.hotQuestiones-slide-enter, &.hotQuestiones-slide-leave-active
			transform: translate3d(-20%, 0, 0)
		&.hotQuestiones-slide-enter-active, &.hotQuestiones-slide-leave-active
			transition: all .3s
		.service-header
			display: flex
			align-items: center
			text-align: center
			background-color: #fff
			border-1px(#ddd)
			.group
				display: block
				flex: 1
				padding: 19px 0 16px
				line-height: 14px
				font-size: 12px
				color: #666
				&:first-child
					border-right: 1px solid #ddd
				.icon
					font-size: 23px
				.text
					margin-top: 10px
		.service-list
			background-color: #fff
			.title
				padding: 25px 0 8px 15px
				line-height: 21px
				font-size: 17px
				font-weight: 600
				border-1px(#ddd)
			.question
				list-style: none
				border-1px(#ddd)
				a
					display: block
					position: relative
					padding: 14px 15px
					line-height: 15px
					font-size: 13px
					color: #333
					.icon
						position: absolute
						right: 15px
						color: #999
	.detail
		background-color: #fff
		position: absolute
		width: 100%
		&.detail-slide-enter, &.detail-slide-leave-active
			transform: translate3d(100%, 0, 0)
		&.detail-slide-enter-active, &.detail-slide-leave-active
			transition: all .3s
		.markdown
			padding: 0 14px 15px
			font-size: 13px
			color: #666
			h3
				margin: 25px 0 8px
				line-height: 18px
				font-size: 15px
				font-weight: 600
			ul
				list-style: disc
				margin-left: 2em
				li
					display: list-item
					list-style: disc
					line-height: 16px
			p
				margin: 9px 0
				line-height: 18px
</style>

<template>
	<scroll 
					class="ratings"
					:data="data"
					:pullup="pullup"
					 @scrollToEnd="getRatingsMoreList"
					 v-if="data.length"
	>
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{ scores.overall_score | normalizeScore }}</h1>
					<p class="title">综合评价</p>
					<p class="rank">高于周边商家{{ scores.compare_rating | normalizeScore }}%</p>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="24" :score="scores.service_score | normalizeScore"></star>
						<span class="score">{{ scores.service_score | normalizeScore }}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">菜品评价</span>
						<star :size="24" :score="scores.food_score | normalizeScore"></star>
						<span class="score">{{ scores.food_score | normalizeScore }}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{ scores.deliver_time }}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<div class="ratings-detail">
				<div class="ratings-tags border-1px">
					<ul>
						<li @click="select(tag,index)" class="item" v-for="(tag,index) in tags" :class="{ unsatisfied: tag.unsatisfied, active: currentIndex === index }">
							{{ tag.name }}({{ tag.count }})
						</li>
					</ul>
				</div>
				<div class="ratings-comment">
					<ul>
						<li class="rating-item border-1px" v-for="rating in ratings">
							<div class="avatar">
								<img v-if="rating.avatar" width="30" height="30" :src="rating.avatar">
								<img v-else width="30" height="30" src="../../common/images/avatar.jpeg">
							</div>
							<div class="content">
								<h1 class="name">{{ rating.username }}</h1>
								<div class="star-wrapper">
									<star :size="24" :score="rating.rating_star"></star>
								</div>
								<p class="text" v-if="rating.rating_text">{{ rating.rating_text }}</p>
								<div class="reply" v-if="rating.reply_text">{{ rating.reply_text }}</div>
								<ul class="photos" v-if="rating.item_ratings">
									<li class="photo-item" v-if="item.image_hash" v-for="item in rating.item_ratings">
										<img width="70" height="70" :src="parseImage(item.image_hash)">
									</li>
								</ul>
								<ul class="food" v-if="rating.item_ratings">
									<li class="food-name" v-for="item in rating.item_ratings">{{ item.food_name }}</li>
								</ul>
								<span class="rated-time">{{ rating.rated_at }}</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<loading v-if="hasMore"></loading>
			<no-result v-if="!hasMore"></no-result>
		</div>
	</scroll>
</template>

<script type="text/ecmascript-6">
	import Star from 'base/star/star';
	import Split from 'base/split/split';
	import Scroll from 'base/scroll/scroll';
	import Loading from 'base/loading/loading';
	import NoResult from 'base/no-result/no-result';
	import {parseImage} from 'common/js/util';
	import {getRatings, getScores, getRatingsTags} from 'api/shop';

	export default {
		data () {
			return {
				shopid: this.$route.params.id,
				ratings: [],
				scores: {},
				tags: [],
				currentIndex: 0,
				offset: 0,           // 评论接口的参数
				hasMore: true,       // 是否还有更多数据可以加载
				pullup: true,				 // scroll组件下拉加载更多参数
				tag_name: null       // 评论接口的参数
			};
		},
		created () {
			setTimeout(() => {
				this._getRatings();
				this._getScores();
				this._getRatingsTags();
			}, 20);
		},
		computed: {
			data () {
				return this.ratings.concat(this.tags);
			}
		},
		methods: {
			// 选择标签
			select (tag, index) {
				this.currentIndex = index;
				this.tag_name = tag.name;
				this._getRatings();
			},
			// 解析图片
			parseImage (imageHash) {
				return parseImage(imageHash);
			},
			// 加载更多评论
			getRatingsMoreList () {
				if (!this.hasMore) {
					return;
				}
				this.offset += 10;
				getRatings(this.shopid, this.offset, this.tag_name).then((response) => {
					this.ratings = this.ratings.concat(response);
					this._checkMore(response);
				});
			},
			// 获取评论列表数据
			_getRatings () {
				this.hasMore = true;
				this.offset = 0;
				getRatings(this.shopid, this.offset, this.tag_name).then((response) => {
					this.ratings = response;
				});
			},
			// 获取评论分数
			_getScores () {
				getScores(this.shopid).then((response) => {
					this.scores = response;
				});
			},
			// 获取评论标签
			_getRatingsTags () {
				getRatingsTags(this.shopid).then((response) => {
					this.tags = response;
				});
			},
			// 检查是否已经没有数据可以加载了
			_checkMore (data) {
				if (!data.length) {
          this.hasMore = false;
        }
			}
		},
		filters: {
			// 处理相关分数的过滤器
			normalizeScore (value) {
				if (value > 1) {
					value = Math.round(value * 10) / 10;
				} else {
					value = Math.round(value * 1000) / 10;
				}
				return value;
			}
		},
		components: {
			Star,
			Split,
			Scroll,
			Loading,
			NoResult
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'

	.ratings
		position: fixed
		top: 175px
		right: 0
		bottom: 0
		left: 0
		width: 100%
		overflow: hidden
		.overview
			display: flex
			padding: 15px
			.overview-left
				padding-right: 15px
				border-right: 1px solid #ddd
				text-align: center
				.score
					line-height: 30px
					font-size: 30px
					font-weight: 400
					color: #f60
				.title
					line-height: 20px
					font-size: 14px
					color: #666
				.rank
					line-height: 15px
					font-size: 10px
					color: #999
			.overview-right
				flex: 1
				display: flex
				flex-direction: column
				align-items: center
				font-size: 0
				.score-wrapper
					width: 80%
					margin: 5px 0
					.title
						font-size: 14px
						padding-right: 10px
					.star
						display: inline-block
						vertical-align: top
					.score
						padding-left: 10px
						font-size: 14px
						color: #f60
					.delivery
						font-size: 10px
						color: #999
		.ratings-detail
			padding: 15px 12px
			background: #fff
			.ratings-tags
				padding-bottom: 15px
				border-1px(#ddd)
				.item
					display: inline-block
					padding: 8px
					margin: 2px 5px
					line-height: 16px
					font-size: 13px
					border-radius: 4px
					color: #6d7885
					background: #ebf5ff
					&.unsatisfied
						color: #aaa
						background: #f5f5f5
						&.active
							color: #fff
							background: #ccc
					&.active
						color: #fff
						background: #3190e8
			.rating-item
				display: flex
				padding: 15px 0
				border-1px(#ddd)
				.avatar
					flex: 0 0 30px
					width: 30px
					margin-right: 15px
				.content
					position: relative
					flex: 1
					.name
						line-height: 15px
						font-size: 13px
						margin-bottom: 5px
						color: #666
					.star-wrapper
						display: inline-block
					.text
						margin: 8px 0
						line-height: 16px
						font-size: 14px
					.reply
						position: relative
						margin: 10px 0
						padding: 10px
						line-height: 15px
						font-size: 13px
						border-radius: 4px
						background: #f3f3f3
						&:after
							position: absolute
							bottom: 100%
							left: 15px
							content: " "
							width: 0
							height: 0
							border-width: 0 8px 8px 8px
							border-style: solid
							border-color: transparent transparent #f3f3f3 transparent
					.photo-item
						display: inline-block
						margin: 5px
					.food-name
						display: inline-block
						box-sizing: border-box
						max-width: 60px
						padding: 4px 10px
						margin: 4px
						line-height: 12px
						font-size: 10px
						border: 1px solid #ddd
						border-radius: 2px
						color: #999
						no-wrap()
					.rated-time
						position: absolute
						top: 0
						right: 0
						line-height: 14px
						font-size: 12px
						color: #999
</style>

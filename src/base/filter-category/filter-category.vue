<template>
	<div class="filter-category">
			<ul class="main-category">
				<li class="category" :class="{ active: currentIndex === index }" v-for="(category,index) in categorys" @click="selectCategory(category,index)">
					<span class="name">{{ category.name }}</span>
					<span class="count">{{ category.count }}</span>
				</li>
			</ul>
			<ul class="sub-category">
				<li class="subCategory" v-for="subCategory in subCategories" @click="selectItem(subCategory)">
					<img width="25" height="25" :src="parseImage(subCategory.image_url)">
					<span class="name">{{ subCategory.name }}</span>
					<span class="count">{{ subCategory.count }}</span>
				</li>
			</ul>
	</div>
</template>

<script type="text/ecmascript-6">
	import {getCategory} from 'api/category';
	import {parseImage} from 'common/js/util';

	export default {
		data () {
			return {
				categorys: [],
				subCategories: [],
				currentIndex: -1
			};
		},
		created () {
			this._getCategory();
		},
		methods: {
			selectCategory (item, index) {
				this.currentIndex = index;
				if (!item.sub_categories) {
					this.$emit('select', item);
					return;
				}
				this.subCategories = item.sub_categories;
			},
			selectItem (item) {
				this.$emit('select', item);
			},
			parseImage (imageHash) {
				return parseImage(imageHash);
			},
			_getCategory () {
				getCategory().then((response) => {
					this.categorys = response;
				});
			}
		}
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.filter-category
		display: flex
		width: 100%
		overflow: auto
		color: #666
		background: #fff
		.main-category
			flex: 2
			overflow: auto
			background: #fafafa
			.category
				box-sizing: border-box
				display: flex
				align-items: center
				justify-content: space-between
				padding: 0 10px
				height: 45px
				line-height: 14px
				font-size: 12px
				&.active
					background: #fff
				.count
					font-size: 11px
					padding: 0 5px
					background: #fff
					border: 1px solid #ddd
					border-radius: 8px
		.sub-category
			flex: 3
			margin-left: 15px
			overflow: auto
			.subCategory
				position: relative
				height: 46px
				line-height: 46px
				img
					vertical-align: middle
					margin-right: 8px
				.name
					display: inline-block
					vertical-align: middle
					line-height: 14px
					font-size: 12px
				.count
					position: absolute
					top: 50%
					right: 10px
					margin-top: -8px
					padding: 0 5px
					line-height: 14px
					font-size: 12px
					border: 1px solid #ddd
					border-radius: 8px
					background: #fff
</style>

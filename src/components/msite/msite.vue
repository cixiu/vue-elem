<template>
	<scroll 
          class="app-content" 
          :data="shoppers" 
          ref="scroll" 
          :pullup="pullup"
          @scrollToEnd="getShopperMoreList"
    >
      <div>
        <m-header></m-header>
        <tab :entries="entries" @selectFood="selectFood"></tab>
        <split></split>
        <div class="recommend">
          <h1 class="recommend-shopper border-1px">推荐商家</h1>
          <shopper @select="selectItem" :shoppers="shoppers" :has-more="hasMore" @refresh="refresh"></shopper>
        </div>
      </div>
      <div class="footer-wrapper">
      	<m-footer></m-footer>
      </div>
    </scroll>
</template>

<script type="text/ecmascript-6">
	import MHeader from 'components/m-header/m-header';
  import Tab from 'components/tab/tab';
  import Split from 'base/split/split';
  import Shopper from 'components/shopper/shopper';
  import Scroll from 'base/scroll/scroll';
  import MFooter from 'components/m-footer/m-footer';
  import {getShopperList} from 'api/shopper';
  import {getEntries} from 'api/entries';
  import {createEntries} from 'common/js/entries';
  import {mapGetters, mapMutations} from 'vuex';

	export default {
		data () {
      return {
        shoppers: [],
        entries: [],
        hasMore: true,
        offset: 0,
        pullup: true
      };
    },
    created () {
      setTimeout(() => {
        this._getShopperList();
        this._getEntries();
      }, 20);
    },
    computed: {
      ...mapGetters([
        'latitude',
        'longitude'
      ])
    },
    methods: {
      refresh () {
        this.$refs.scroll.refresh();
      },
      getShopperMoreList () {
        if (!this.hasMore || !this.latitude || !this.longitude) {
          return;
        }
        this.offset += 20;
        getShopperList(this.latitude, this.longitude, this.offset).then((response) => {
          this.shoppers = this.shoppers.concat(response);
          this._checkMore(response);
        });
      },
      selectItem (item) {
        this.$router.push({
          path: `/shop/id=${item.id}`
        });
        this.setselectedShopper(item);
      },
      selectFood (item) {
        this.$router.push({
          path: `/food/#${item.link}`
        });
        this.setselectedEntries(item);
      },
      _getShopperList () {
        if (!this.latitude || !this.longitude) {
          return;
        }
        this.hasMore = true;
        this.offset = 0;
        this.$refs.scroll.scrollTo(0, 0);
        getShopperList(this.latitude, this.longitude, this.offset).then((response) => {
          this.shoppers = response;
        });
      },
      _getEntries () {
        if (!this.latitude || !this.longitude) {
          return;
        }
        getEntries(this.latitude, this.longitude).then((response) => {
          this.entries = this._normalizeEntries(response[0].entries);
        });
      },
      _normalizeEntries (list) {
        let ret = [];
        list.forEach((entriesData) => {
          ret.push(createEntries(entriesData));
        });
        return ret;
      },
      _checkMore (data) {
        if (!data.length) {
          this.hasMore = false;
        }
      },
      ...mapMutations({
        setselectedShopper: 'SET_SELECTED_SHOPPER',
        setselectedEntries: 'SET_SELECTED_ENTRIES'
      })
    },
    watch: {
      // '$route' () {
      //   window.location.reload();
      // },
      latitude () {
        this._getEntries();
        this._getShopperList();
      }
    },
    components: {
      MHeader,
      Tab,
      Split,
      Shopper,
      Scroll,
      MFooter
    }
	};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
	.app-content
		position: fixed
		top: 0
		right: 0
		bottom: 50px
		left: 0
		.recommend
			position: relative
			.recommend-shopper
				padding-left: 15px
				line-height: 34px
				font-size: 16px
				font-weight: 600
				background: #fff
				border-1px(#eee)
		.footer-wrapper
			position: absolute
			right: 0
			bottom: -50px
			left: 0
</style>
